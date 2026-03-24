import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import { Order } from "@/lib/models/Order";

// GET orders (admin gets all, user gets own)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    let orders;
    if ((session.user as any).role === "admin") {
      orders = await Order.find().populate("user", "name email").populate("items.product", "name price images").sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ user: (session.user as any).id }).populate("items.product", "name price images").sort({ createdAt: -1 });
    }

    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
