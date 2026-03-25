import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Product } from "@/lib/models/Product";
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
    const products = await Product.find().populate("category").sort({ createdAt: -1 }).lean();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await connectToDatabase();
    const product = await Product.create(data);
    return NextResponse.json(JSON.parse(JSON.stringify(product)));
  } catch (error: any) {
    console.error("Product creation error:", error);
    return NextResponse.json({ 
      error: "Failed to create product",
      message: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
