/** Auth admin minimale: cookie firmato HMAC (Node runtime). */
import crypto from "crypto";
import { cookies } from "next/headers";
import { getAuthState, saveAuthState } from "./store";

export const COOKIE_NAME = "kc_admin";

/** Durata massima della sessione admin (deve combaciare con il maxAge del cookie). */
export const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 giorni

/** Validità del link di reset password. */
export const RESET_TTL_MS = 1000 * 60 * 30; // 30 minuti

/** Requisiti minimi per la password admin. */
export const PASSWORD_MIN_LEN = 10;

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

/* ---------- Sessione ---------- */

/** Token: "ok:<issuedMs>:<passwordVersion>.<hmac>" — cambia password ⇒ vecchie sessioni invalide. */
export async function makeToken(): Promise<string> {
  const { passwordVersion } = await getAuthState();
  return sign(`ok:${Date.now()}:${passwordVersion}`);
}

export async function verifyToken(token?: string | null): Promise<boolean> {
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
  const [, issuedRaw, versionRaw = "0"] = value.split(":");
  // Scadenza: il timestamp firmato deve essere recente e non nel futuro.
  const issued = Number(issuedRaw);
  if (!Number.isFinite(issued)) return false;
  const age = Date.now() - issued;
  if (age < 0 || age >= SESSION_MAX_AGE_MS) return false;
  // Versione password: un reset/cambio password invalida tutte le sessioni precedenti.
  const { passwordVersion } = await getAuthState();
  return Number(versionRaw) === passwordVersion;
}

/** Da usare in Server Component / Route Handler (Node runtime). */
export async function isAuthed(): Promise<boolean> {
  return verifyToken(cookies().get(COOKIE_NAME)?.value);
}

/* ---------- Password ---------- */

const SCRYPT_KEYLEN = 64;

export function hashPassword(pw: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(pw, salt, SCRYPT_KEYLEN).toString("hex");
  return `${salt}:${hash}`;
}

function verifyHash(pw: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const a = crypto.scryptSync(pw, salt, SCRYPT_KEYLEN);
  const b = Buffer.from(hash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb); // timingSafeEqual richiede pari lunghezza
}

/**
 * Password valida se combacia con quella impostata dall'admin (hash nello store);
 * in assenza di hash vale ADMIN_PASSWORD dell'env (fail-closed se manca).
 */
export async function checkPassword(pw: string): Promise<boolean> {
  if (typeof pw !== "string" || pw.length === 0) return false;
  const { passwordHash } = await getAuthState();
  if (passwordHash) return verifyHash(pw, passwordHash);
  let real: string;
  try {
    real = requireEnv("ADMIN_PASSWORD");
  } catch {
    return false; // password non configurata → login sempre negato
  }
  return safeEqual(pw, real);
}

export function validateNewPassword(pw: unknown): string | null {
  if (typeof pw !== "string") return "Password non valida";
  if (pw.length < PASSWORD_MIN_LEN) return `La password deve avere almeno ${PASSWORD_MIN_LEN} caratteri`;
  if (pw.length > 200) return "Password troppo lunga";
  return null;
}

/** Imposta la nuova password e invalida ogni sessione e token di reset in circolazione. */
export async function setPassword(pw: string): Promise<void> {
  const { passwordVersion } = await getAuthState();
  await saveAuthState({
    passwordHash: hashPassword(pw),
    passwordVersion: passwordVersion + 1,
    resetTokenHash: undefined,
    resetExpires: undefined,
  });
}

/* ---------- Reset password via email ---------- */

const sha256 = (s: string) => crypto.createHash("sha256").update(s).digest("hex");

/** Genera un token di reset monouso (nello store finisce solo l'hash). */
export async function createResetToken(): Promise<string> {
  const token = crypto.randomBytes(32).toString("base64url");
  await saveAuthState({ resetTokenHash: sha256(token), resetExpires: Date.now() + RESET_TTL_MS });
  return token;
}

export async function consumeResetToken(token: unknown): Promise<boolean> {
  if (typeof token !== "string" || token.length < 20 || token.length > 200) return false;
  const { resetTokenHash, resetExpires } = await getAuthState();
  if (!resetTokenHash || !resetExpires) return false;
  if (Date.now() > resetExpires) return false;
  return safeEqual(sha256(token), resetTokenHash);
}
