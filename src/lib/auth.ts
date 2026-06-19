/** Auth admin minimale: cookie firmato HMAC (Node runtime). */
import crypto from "crypto";
import { cookies } from "next/headers";

export const COOKIE_NAME = "kc_admin";
const SECRET = process.env.SESSION_SECRET || "dev-secret-change-me";

function sign(value: string): string {
  const h = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
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
  const expected = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  try {
    const ok = crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
    return ok && value.startsWith("ok:");
  } catch {
    return false;
  }
}

export function checkPassword(pw: string): boolean {
  const real = process.env.ADMIN_PASSWORD || "kerocalor1969";
  return typeof pw === "string" && pw.length > 0 && pw === real;
}

/** Da usare in Server Component / Route Handler (Node runtime). */
export function isAuthed(): boolean {
  return verifyToken(cookies().get(COOKIE_NAME)?.value);
}
