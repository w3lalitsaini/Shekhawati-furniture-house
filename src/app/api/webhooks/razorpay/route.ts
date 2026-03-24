export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import { Order } from "@/lib/models/Order";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ message: "Invalid Signature", isOk: false }, { status: 400 });
    }

    // Payment is verified
    await connectToDatabase();

    const order = await Order.findOne({ "paymentMetadata.razorpayOrderId": razorpay_order_id });
    if (order) {
      order.status = "Processing"; // Update status since payment is valid
      order.paymentMetadata = {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      };
      await order.save();
    }

    return NextResponse.json({ message: "Payment verified successfully", isOk: true }, { status: 200 });
  } catch (error: any) {
    console.error("Payment verification failed", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
