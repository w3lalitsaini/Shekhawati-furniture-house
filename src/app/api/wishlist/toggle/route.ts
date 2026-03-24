export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findById((session.user as any).id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isWishlisted = user.wishlist.includes(productId);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId.toString());
    } else {
      user.wishlist.push(productId);
    }

    await user.save();

    return NextResponse.json({
      message: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
