import { NextRequest, NextResponse } from "next/server";
import { consumeResetToken, setPassword, validateNewPassword } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const attempts = new Map<string, { count: number; first: number }>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip"))?.trim() || "unknown";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = clientIp(req);
  const now = Date.now();
  const e = attempts.get(ip);
  if (e && now - e.first < 10 * 60 * 1000 && e.count >= 10) {
    return NextResponse.json({ error: "Troppi tentativi. Riprova più tardi." }, { status: 429 });
  }
  const b = await req.json().catch(() => ({}));
  const pwErr = validateNewPassword(b?.password);
  if (pwErr) return NextResponse.json({ error: pwErr }, { status: 400 });
  if (!(await consumeResetToken(b?.token))) {
    if (!e || now - e.first >= 10 * 60 * 1000) attempts.set(ip, { count: 1, first: now });
    else e.count += 1;
    return NextResponse.json({ error: "Link non valido o scaduto. Richiedi un nuovo reset." }, { status: 400 });
  }
  await setPassword(b.password);
  attempts.delete(ip);
  return NextResponse.json({ ok: true });
}
