"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, contacts, waLink } from "@/lib/site-config";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-ash/95 backdrop-blur" : "border-transparent bg-ash"
      }`}
    >
      <div className="container-site flex h-full items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2" aria-label="Kerocalor — home">
          <span className="text-xl font-black uppercase tracking-wider2 text-carbon">
            Kero<span className="text-ember">calor</span>
          </span>
          <span className="hidden text-[10px] font-bold uppercase tracking-widest2 text-steel sm:block">
            dal 1969
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] font-extrabold uppercase tracking-wider2 text-ink transition-colors hover:text-ember"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${contacts.phoneHref}`} className="text-[12px] font-extrabold uppercase tracking-wider2 text-ink hover:text-ember">
            {contacts.phone}
          </a>
          <a href={waLink("Salve, vorrei un'informazione.")} target="_blank" rel="noopener" className="btn-wa !px-4 !py-2">
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] p-2 lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className={`h-[2px] w-6 bg-carbon transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 bg-carbon transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-carbon transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-line bg-ash lg:hidden ${
          open ? "max-h-[480px]" : "max-h-0"
        } transition-[max-height] duration-500 ease-snap`}
      >
        <nav className="container-site flex flex-col py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3 text-sm font-extrabold uppercase tracking-wider2 text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex gap-3">
            <a href={`tel:${contacts.phoneHref}`} className="btn-light flex-1">Chiama</a>
            <a href={waLink()} target="_blank" rel="noopener" className="btn-wa flex-1">WhatsApp</a>
          </div>
        </nav>
      </div>
    </header>
  );
}
