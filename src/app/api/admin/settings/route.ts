import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getSettings, saveSettings, type Settings } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ settings: await getSettings() });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  for (const k of ["phone", "phoneHref", "whatsapp", "whatsappHref", "email", "address", "city"]) {
    if (typeof b[k] === "string") patch[k] = b[k].trim();
  }
  if (b.catalogNotice && typeof b.catalogNotice === "object" && !Array.isArray(b.catalogNotice)) {
    const map: Record<string, boolean> = {};
    for (const [slug, v] of Object.entries(b.catalogNotice as Record<string, unknown>)) {
      if (typeof v === "boolean" && /^[a-z0-9-]{1,60}$/.test(slug)) map[slug] = v;
    }
    patch.catalogNotice = map;
  }
  const settings = await saveSettings(patch as Partial<Settings>);
  return NextResponse.json({ settings });
}
