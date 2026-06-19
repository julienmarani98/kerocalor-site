import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { processUpload, FormatKey, FORMATS } from "@/lib/images";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 12 * 1024 * 1024; // 12MB

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Nessun file" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File troppo grande (max 12MB)" }, { status: 413 });
    }
    const fmt = String(form.get("format") || "square");
    const format: FormatKey = fmt in FORMATS ? (fmt as FormatKey) : "square";
    const buf = Buffer.from(await file.arrayBuffer());
    const url = await processUpload(buf, format);
    return NextResponse.json({ url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Errore upload";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
