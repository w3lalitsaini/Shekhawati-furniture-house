import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Gallery } from "@/lib/models/Gallery";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    await connectToDatabase();
    const item = await Gallery.create(data);
    return NextResponse.json(JSON.parse(JSON.stringify(item)));
  } catch (error: any) {
    console.error("Gallery add error:", error);
    return NextResponse.json({ 
      error: "Failed to add to gallery",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
