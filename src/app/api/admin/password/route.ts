import { NextRequest, NextResponse } from "next/server";
import { isAuthed, checkPassword, setPassword, validateNewPassword, makeToken, COOKIE_NAME, SESSION_MAX_AGE_MS } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Cambio password da admin autenticato: richiede la password attuale. */
export async function PUT(req: NextRequest): Promise<NextResponse> {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  if (!(await checkPassword(b?.current ?? ""))) {
    return NextResponse.json({ error: "Password attuale errata" }, { status: 400 });
  }
  const pwErr = validateNewPassword(b?.password);
  if (pwErr) return NextResponse.json({ error: pwErr }, { status: 400 });
  await setPassword(b.password);
  // Le altre sessioni decadono (versione password cambiata): rinnovo solo quella corrente.
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
