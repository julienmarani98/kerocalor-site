import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getSmtpConfig, saveSmtpConfig, type SmtpConfig } from "@/lib/store";
import { verifySmtp, sendMail, RESET_EMAIL_TO } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Vista sicura per il client: mai la password, solo se è impostata. */
async function view() {
  const c = await getSmtpConfig();
  return {
    host: c?.host ?? "",
    port: c?.port ?? 465,
    secure: c?.secure ?? true,
    user: c?.user ?? "",
    from: c?.from ?? "",
    hasPass: Boolean(c?.pass),
    configured: c !== null,
    resetTo: RESET_EMAIL_TO,
  };
}

export async function GET(): Promise<NextResponse> {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ smtp: await view() });
}

/** Salva la configurazione (pass opzionale: se vuota resta quella precedente). */
export async function PUT(req: NextRequest): Promise<NextResponse> {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  const patch: Partial<SmtpConfig> = {};
  if (typeof b.host === "string") patch.host = b.host.trim();
  if (typeof b.user === "string") patch.user = b.user.trim();
  if (typeof b.from === "string") patch.from = b.from.trim();
  if (typeof b.pass === "string" && b.pass.length > 0) patch.pass = b.pass;
  const port = Number(b.port);
  if (Number.isInteger(port) && port > 0 && port < 65536) {
    patch.port = port;
    patch.secure = typeof b.secure === "boolean" ? b.secure : port === 465;
  }
  await saveSmtpConfig(patch);
  return NextResponse.json({ smtp: await view() });
}

/** Test: verifica connessione/credenziali e invia un'email di prova alla casella di reset. */
export async function POST(): Promise<NextResponse> {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    await verifySmtp();
    await sendMail({
      to: RESET_EMAIL_TO,
      subject: "Kerocalor — email di prova (area riservata)",
      text: "Configurazione SMTP corretta: le email di reset password arriveranno a questa casella.",
    });
    return NextResponse.json({ ok: true, to: RESET_EMAIL_TO });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Test fallito: ${msg}` }, { status: 502 });
  }
}
