import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Gallery } from "@/lib/models/Gallery";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const images = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
