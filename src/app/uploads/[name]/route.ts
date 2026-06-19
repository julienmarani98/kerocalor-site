import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { UPLOAD_DIR } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(_req: NextRequest, { params }: { params: { name: string } }): Promise<Response> {
  const name = path.basename(params.name); // evita path traversal
  const ext = path.extname(name).toLowerCase();
  const type = TYPES[ext];
  if (!type) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(path.join(UPLOAD_DIR, name));
    return new Response(new Uint8Array(data), {
      headers: { "Content-Type": type, "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
