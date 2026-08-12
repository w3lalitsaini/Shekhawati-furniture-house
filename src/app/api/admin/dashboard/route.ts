import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Product } from "@/lib/models/Product";
import { Category } from "@/lib/models/Category";
import { Order } from "@/lib/models/Order";
import { User } from "@/lib/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const [productCount, categoryCount, orderCount, userCount, recentOrders, allOrders] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: "user" }),
      Order.find().populate("user", "name").sort({ createdAt: -1 }).limit(5).lean(),
      Order.find({ status: { $ne: "Cancelled" } }).select("totalAmount").lean()
    ]);

    const totalRevenue = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    return NextResponse.json({
      stats: {
        totalProducts: productCount,
        totalCategories: categoryCount,
        totalOrders: orderCount,
        totalUsers: userCount,
        totalRevenue
      },
      recentOrders
    });
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
  }
}
