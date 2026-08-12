import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Blog } from "@/lib/models/Blog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch only published blogs
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();
      
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
