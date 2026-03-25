import { NextResponse } from "next/server";
import { getStoreSettings } from "@/lib/getStoreSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getStoreSettings();
    return NextResponse.json(JSON.parse(JSON.stringify(settings)));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}
