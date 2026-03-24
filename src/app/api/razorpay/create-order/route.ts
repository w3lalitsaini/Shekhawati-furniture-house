import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Razorpay from "razorpay";
import connectToDatabase from "@/lib/db";
import { Order } from "@/lib/models/Order";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { amount, items, shippingAddress } = body;

    // Optional: Validate items against DB prices here to prevent tampering

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }

    await connectToDatabase();

    // Storing the pending order to DB
    const newOrder = await Order.create({
      user: (session.user as any).id,
      items,
      totalAmount: amount,
      status: "Pending",
      shippingAddress,
      paymentMetadata: {
        razorpayOrderId: order.id,
      },
    });

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      dbOrderId: newOrder._id,
    });
  } catch (error: any) {
    console.error("Razorpay order error", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
