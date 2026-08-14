import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Inter self-hosted (variable 100–900): niente download da Google in build,
// hash della classe next/font stabile a ogni build su qualunque ambiente.
const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/InterVariable-Italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kerocalor · Riscaldamento e Arredamento dal 1969 — Mornago (VA)",
  description:
    "Kerocalor: stufe, caminetti, cucine, arredamento ed elettrodomestici. 3.000 mq di esposizione a Mornago, provincia di Varese. Dal 1969.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Arma i reveal a scroll PRIMA del paint: senza JS il contenuto resta visibile.
            Autorizzato in CSP per hash: se cambi questa stringa aggiorna
            INLINE_SCRIPT_HASH in src/middleware.ts. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('IntersectionObserver' in window)document.documentElement.classList.add('js-anim');",
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
