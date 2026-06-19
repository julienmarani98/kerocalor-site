import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { updateProduct, deleteProduct } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  if (b.name !== undefined) patch.name = String(b.name).trim();
  if (b.brand !== undefined) patch.brand = b.brand ? String(b.brand).trim() : undefined;
  if (b.soul !== undefined) patch.soul = b.soul;
  if (b.category !== undefined) patch.category = String(b.category).trim();
  if (b.price !== undefined) patch.price = b.price === "" || b.price === null ? undefined : Number(b.price);
  if (b.image !== undefined) patch.image = b.image || undefined;
  if (b.featured !== undefined) patch.featured = Boolean(b.featured);
  const product = await updateProduct(params.id, patch);
  if (!product) return NextResponse.json({ error: "Prodotto non trovato" }, { status: 404 });
  return NextResponse.json({ product });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const ok = await deleteProduct(params.id);
  return NextResponse.json({ ok });
}
