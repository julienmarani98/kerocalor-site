import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { addProduct, getProducts, SoulKey } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOULS: SoulKey[] = ["stufe", "arredamento", "elettrodomestici", "ricambi"];

export async function GET(): Promise<NextResponse> {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ products: await getProducts() });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!isAuthed()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  if (!b?.name || !b?.category) {
    return NextResponse.json({ error: "Nome e categoria sono obbligatori" }, { status: 400 });
  }
  const soul: SoulKey = SOULS.includes(b.soul) ? b.soul : "stufe";
  const product = await addProduct({
    name: String(b.name).trim(),
    brand: b.brand ? String(b.brand).trim() : undefined,
    soul,
    category: String(b.category).trim(),
    price: b.price !== undefined && b.price !== "" ? Number(b.price) : undefined,
    image: b.image ? String(b.image) : undefined,
    featured: Boolean(b.featured),
  });
  return NextResponse.json({ product });
}
