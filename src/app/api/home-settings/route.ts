import { NextResponse } from "next/server";
import { getHomeSettings } from "@/lib/getHomeSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getHomeSettings();
    // Ensure we send a plain object
    return NextResponse.json(JSON.parse(JSON.stringify(settings)));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}
