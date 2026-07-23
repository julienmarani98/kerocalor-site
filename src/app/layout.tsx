import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
        {/* Arma i reveal a scroll PRIMA del paint: senza JS il contenuto resta visibile. */}
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
