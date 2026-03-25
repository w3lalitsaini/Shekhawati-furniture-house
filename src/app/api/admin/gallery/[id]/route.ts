import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { Gallery } from "@/lib/models/Gallery";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    await Gallery.findByIdAndDelete(id);
    return NextResponse.json({ message: "Item removed from gallery" });
  } catch (error: any) {
    console.error("Gallery delete error:", error);
    return NextResponse.json({ 
      error: "Failed to delete item",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
