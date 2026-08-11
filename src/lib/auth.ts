/** Auth admin minimale: cookie firmato HMAC (Node runtime). */
import crypto from "crypto";
import { cookies } from "next/headers";

export const COOKIE_NAME = "kc_admin";

/** Durata massima della sessione admin (deve combaciare con il maxAge del cookie). */
export const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 giorni

/**
 * Segreti obbligatori: nessun fallback hardcoded, altrimenti una `.env` mancante
 * riattiverebbe silenziosamente credenziali note (il codice è pubblico su GitHub).
 * In dev si può usare un `.env.local`.
 */
function requireEnv(name: "SESSION_SECRET" | "ADMIN_PASSWORD"): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `${name} non impostata: configurala nel file .env (VPS: /docker/kerocalor-site/.env).`
    );
  }
  return v;
}

function sign(value: string): string {
  const h = crypto.createHmac("sha256", requireEnv("SESSION_SECRET")).update(value).digest("hex");
  return `${value}.${h}`;
}

export function makeToken(): string {
  return sign(`ok:${Date.now()}`);
}

export function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  const idx = token.lastIndexOf(".");
  if (idx < 0) return false;
  const value = token.slice(0, idx);
  const mac = token.slice(idx + 1);
  let expected: string;
  try {
    expected = crypto.createHmac("sha256", requireEnv("SESSION_SECRET")).update(value).digest("hex");
  } catch {
    return false; // segreto non configurato → nessuna sessione valida
  }
  try {
    if (!crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  if (!value.startsWith("ok:")) return false;
  // Scadenza: il timestamp firmato deve essere recente e non nel futuro.
  const issued = Number(value.slice(3));
  if (!Number.isFinite(issued)) return false;
  const age = Date.now() - issued;
  return age >= 0 && age < SESSION_MAX_AGE_MS;
}

export function checkPassword(pw: string): boolean {
  let real: string;
  try {
    real = requireEnv("ADMIN_PASSWORD");
  } catch {
    return false; // password non configurata → login sempre negato
  }
  if (typeof pw !== "string" || pw.length === 0) return false;
  const a = Buffer.from(pw);
  const b = Buffer.from(real);
  if (a.length !== b.length) return false; // timingSafeEqual richiede pari lunghezza
  return crypto.timingSafeEqual(a, b);
}

/** Da usare in Server Component / Route Handler (Node runtime). */
export function isAuthed(): boolean {
  return verifyToken(cookies().get(COOKIE_NAME)?.value);
}
