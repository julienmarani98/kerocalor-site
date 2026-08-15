import { NextRequest, NextResponse } from "next/server";
import { checkPassword, makeToken, COOKIE_NAME, SESSION_MAX_AGE_MS } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Rate limiting in memoria: 8 tentativi falliti per IP ogni 10 minuti.
 * Il container è singolo, quindi una Map basta (nessuno stato condiviso da gestire).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, { count: number; first: number }>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip"))?.trim() || "unknown";
}

function tooManyAttempts(ip: string): boolean {
  const e = attempts.get(ip);
  if (!e) return false;
  if (Date.now() - e.first > WINDOW_MS) {
    attempts.delete(ip);
    return false;
  }
  return e.count >= MAX_ATTEMPTS;
}

function recordFailure(ip: string): void {
  const e = attempts.get(ip);
  if (!e || Date.now() - e.first > WINDOW_MS) {
    attempts.set(ip, { count: 1, first: Date.now() });
    return;
  }
  e.count += 1;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = clientIp(req);
  if (tooManyAttempts(ip)) {
    return NextResponse.json(
      { error: "Troppi tentativi. Riprova tra qualche minuto." },
      { status: 429 }
    );
  }
  const body = await req.json().catch(() => ({}));
  if (!(await checkPassword(body?.password ?? ""))) {
    recordFailure(ip);
    return NextResponse.json({ error: "Password errata" }, { status: 401 });
  }
  attempts.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, await makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  });
  return res;
}
