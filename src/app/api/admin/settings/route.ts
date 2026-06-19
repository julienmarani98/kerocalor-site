import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getSettings, saveSettings } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ settings: await getSettings() });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const patch: Record<string, string> = {};
  for (const k of ["phone", "phoneHref", "whatsapp", "whatsappHref", "email", "address", "city"]) {
    if (typeof b[k] === "string") patch[k] = b[k].trim();
  }
  const settings = await saveSettings(patch);
  return NextResponse.json({ settings });
}
