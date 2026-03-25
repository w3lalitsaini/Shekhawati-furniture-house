import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Blog } from "@/lib/models/Blog";
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
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
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
    const blog = await Blog.create(data);
    return NextResponse.json(JSON.parse(JSON.stringify(blog)));
  } catch (error: any) {
    console.error("Blog creation error:", error);
    return NextResponse.json({ 
      error: "Failed to create blog",
      message: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
