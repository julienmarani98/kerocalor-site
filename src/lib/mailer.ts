/** Invio email di sistema (reset password) via SMTP — server-only. */
import nodemailer from "nodemailer";
import { getSmtpConfig, type SmtpConfig } from "./store";

/** Destinatario fisso delle email di reset: la casella aziendale. */
export const RESET_EMAIL_TO = process.env.RESET_EMAIL_TO || "info@kerocalor.it";

function transport(cfg: SmtpConfig) {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

export async function isMailConfigured(): Promise<boolean> {
  return (await getSmtpConfig()) !== null;
}

/** Verifica credenziali/connessione senza inviare nulla. Lancia con messaggio leggibile. */
export async function verifySmtp(cfg?: SmtpConfig): Promise<void> {
  const c = cfg ?? (await getSmtpConfig());
  if (!c) throw new Error("SMTP non configurato");
  await transport(c).verify();
}

export async function sendMail(opts: { to: string; subject: string; text: string; html?: string }, cfg?: SmtpConfig): Promise<void> {
  const c = cfg ?? (await getSmtpConfig());
  if (!c) throw new Error("SMTP non configurato");
  await transport(c).sendMail({
    from: c.from || c.user,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}

export function resetEmail(link: string, minutes: number) {
  const subject = "Kerocalor — reimposta la password dell'area riservata";
  const text = [
    "È stata richiesta la reimpostazione della password dell'area riservata del sito kerocalor.it.",
    "",
    `Apri questo link entro ${minutes} minuti per scegliere una nuova password:`,
    link,
    "",
    "Se non hai richiesto tu il reset, ignora questa email: la password attuale resta valida.",
  ].join("\n");
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
      <p style="font-size:20px;font-weight:800;letter-spacing:.02em;margin:0 0 16px">Kero<span style="color:#c8462a">calor</span> · Area riservata</p>
      <p>È stata richiesta la reimpostazione della password dell'area riservata del sito <strong>kerocalor.it</strong>.</p>
      <p>Apri questo link entro <strong>${minutes} minuti</strong> per scegliere una nuova password:</p>
      <p style="margin:24px 0"><a href="${link}" style="background:#000;color:#fff;padding:12px 20px;text-decoration:none;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:12px">Reimposta password</a></p>
      <p style="font-size:12px;color:#666;word-break:break-all">Oppure copia questo indirizzo nel browser:<br>${link}</p>
      <p style="font-size:12px;color:#666">Se non hai richiesto tu il reset, ignora questa email: la password attuale resta valida.</p>
    </div>`;
  return { subject, text, html };
}
