export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { CustomInquiry } from "@/lib/models/CustomInquiry";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const inquiry = await CustomInquiry.create(body);
    return NextResponse.json({ message: "Request received", id: inquiry._id }, { status: 201 });
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
