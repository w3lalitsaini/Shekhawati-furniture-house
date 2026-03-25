import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { StoreSettings } from "@/lib/models/StoreSettings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const settings = await StoreSettings.findOneAndUpdate({}, data, { 
      new: true, 
      upsert: true,
      runValidators: true
    }).lean();

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Admin Store Settings Update Error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
