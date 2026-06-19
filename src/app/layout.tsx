import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen pt-[var(--header-h)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
