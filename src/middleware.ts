import { NextRequest, NextResponse } from "next/server";

/**
 * Content-Security-Policy con nonce per richiesta.
 * Next.js propaga il nonce ai propri script inline leggendolo dall'header CSP
 * passato *nella request*: per questo lo impostiamo sia su request che response.
 * Lo script inline statico di `app/layout.tsx` è invece autorizzato per hash, così
 * non ha bisogno del nonce e non provoca mismatch di hydration.
 * Gli altri header di sicurezza (HSTS, nosniff, ecc.) arrivano da Traefik, ma
 * li impostiamo anche qui così valgono ovunque giri il container.
 */

/** Hash dello script inline in `src/app/layout.tsx` (aggiornalo se cambi quel codice). */
const INLINE_SCRIPT_HASH = "'sha256-bXCgOwEErx3jA6GZMK9ySKgwQVzQ68SJKeXYDou6N30='";

export function middleware(req: NextRequest): NextResponse {
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const dev = process.env.NODE_ENV !== "production";

  const csp = [
    "default-src 'self'",
    // 'strict-dynamic' fa ignorare host e 'unsafe-inline' ai browser moderni;
    // in dev serve 'unsafe-eval' per il Fast Refresh.
    `script-src 'self' 'nonce-${nonce}' ${INLINE_SCRIPT_HASH} 'strict-dynamic' https:${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'", // next/font e Tailwind iniettano stile inline
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src 'self'${dev ? " ws: http://localhost:3000" : ""}`,
    "frame-src https://www.google.com", // mappa, solo dopo click dell'utente
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const headers = new Headers(req.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", csp); // da qui Next ricava il nonce per i propri script

  const res = NextResponse.next({ request: { headers } });
  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=(), usb=()");
  return res;
}

export const config = {
  // Esclude gli asset statici: non serve CSP su /_next/static, immagini, favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|robots.txt).*)"],
};
