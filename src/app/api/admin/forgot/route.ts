import { NextRequest, NextResponse } from "next/server";
import { createResetToken, RESET_TTL_MS } from "@/lib/auth";
import { isMailConfigured, resetEmail, sendMail, RESET_EMAIL_TO } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Rate limit: 3 richieste di reset per IP ogni 15 minuti + 1 al minuto globale (anti-spam casella). */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_IP = 3;
const perIp = new Map<string, { count: number; first: number }>();
let lastGlobal = 0;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : req.headers.get("x-real-ip"))?.trim() || "unknown";
}

/** Base URL pubblica: SITE_URL, altrimenti host della richiesta (dietro proxy Hostinger). */
function baseUrl(req: NextRequest): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "kerocalor.it";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = clientIp(req);
  const now = Date.now();
  const e = perIp.get(ip);
  if (e && now - e.first < WINDOW_MS && e.count >= MAX_PER_IP) {
    return NextResponse.json({ error: "Troppe richieste. Riprova tra qualche minuto." }, { status: 429 });
  }
  if (!e || now - e.first >= WINDOW_MS) perIp.set(ip, { count: 1, first: now });
  else e.count += 1;
  if (now - lastGlobal < 60 * 1000) {
    return NextResponse.json({ error: "Una richiesta è già stata inviata: controlla la casella." }, { status: 429 });
  }

  if (!(await isMailConfigured())) {
    return NextResponse.json(
      { error: "Invio email non configurato: impostare l'SMTP nell'area admin (o le variabili SMTP_*)." },
      { status: 503 }
    );
  }

  const token = await createResetToken();
  const link = `${baseUrl(req)}/admin/reset?token=${encodeURIComponent(token)}`;
  const mail = resetEmail(link, Math.round(RESET_TTL_MS / 60000));
  try {
    await sendMail({ to: RESET_EMAIL_TO, ...mail });
    lastGlobal = now;
  } catch (err) {
    console.error("[forgot] invio email fallito:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Invio email fallito: verificare la configurazione SMTP." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, to: RESET_EMAIL_TO });
}
