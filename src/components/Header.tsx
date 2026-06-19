"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { megaNav, MegaItem } from "@/lib/site-config";
import { waUrl, telHref } from "@/lib/links";
import type { Settings } from "@/lib/store";

export default function Header({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const contacts = settings;

  // blocca scroll body quando il drawer mobile è aperto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="on-dark fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b border-white/10 bg-carbon text-white">
      <div className="container-site flex h-full items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2" aria-label="Kerocalor — home">
          <span className="text-lg font-extrabold uppercase tracking-[0.02em] text-white">
            Kero<span className="text-ember">calor</span>
          </span>
          <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-white/45 sm:block">
            dal 1969
          </span>
        </Link>

        {/* Desktop nav con mega-menu */}
        <nav className="hidden h-full items-stretch gap-6 lg:flex">
          {megaNav.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={`tel:${contacts.phoneHref}`} className="text-[13px] font-medium text-white/80 transition-colors hover:text-white">
            {contacts.phone}
          </a>
          <a href={waUrl(contacts.whatsappHref, "Salve, vorrei un'informazione.")} target="_blank" rel="noopener" className="btn-wa !px-4 !py-2 !text-[11px]">
            WhatsApp
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] p-2 lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className={`h-[2px] w-6 bg-white transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[2px] w-6 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[2px] w-6 bg-white transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer con accordion */}
      <div
        className={`overflow-y-auto bg-carbon text-white lg:hidden ${
          open ? "max-h-[calc(100vh-var(--header-h))] border-t border-white/10" : "max-h-0"
        } transition-[max-height] duration-500`}
        style={{ transitionTimingFunction: "var(--ease)" }}
      >
        <nav className="container-site flex flex-col py-3">
          {megaNav.map((item) => (
            <div key={item.href} className="border-b border-white/10">
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenSub((s) => (s === item.href ? null : item.href))}
                    className="flex w-full items-center justify-between py-3.5 text-left text-sm font-medium uppercase tracking-[0.08em] text-white"
                    aria-expanded={openSub === item.href}
                  >
                    {item.label}
                    <span className={`text-lg transition-transform ${openSub === item.href ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`overflow-hidden transition-[max-height] duration-300 ${openSub === item.href ? "max-h-96" : "max-h-0"}`}>
                    <div className="flex flex-col pb-2">
                      {item.children.map((c, i) => (
                        <Link key={`${c.href}-${i}`} href={c.href} onClick={() => setOpen(false)} className="py-2 pl-3 text-[13px] text-white/65 hover:text-white">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-3.5 text-sm font-medium uppercase tracking-[0.08em] text-white">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a href={telHref(contacts.phoneHref)} className="btn-ghost-white">Chiama</a>
            <a href={waUrl(contacts.whatsappHref)} target="_blank" rel="noopener" className="btn-wa">WhatsApp</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function NavItem({ item }: { item: MegaItem }) {
  if (!item.children) {
    return (
      <Link href={item.href} className="flex items-center">
        <span className="nav-link">{item.label}</span>
      </Link>
    );
  }
  return (
    <div className="group/nav relative flex items-center">
      <Link
        href={item.href}
        className="flex items-center gap-1 text-[13px] font-normal text-white/80 transition-colors group-hover/nav:text-white"
      >
        {item.label}
        <span className="text-[9px] opacity-50 transition-transform duration-300 group-hover/nav:rotate-180">▾</span>
      </Link>

      {/* Dropdown panel (scuro) */}
      <div className="invisible absolute left-0 top-full z-50 opacity-0 transition-all duration-200 group-hover/nav:visible group-hover/nav:opacity-100">
        <div className="relative mt-0 min-w-[230px] border-x border-b border-white/10 bg-[#0e0e0e] py-3 shadow-[2px_2px_18px_rgba(0,0,0,0.5)]">
          <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-white transition-transform duration-300 group-hover/nav:scale-x-100" />
          {item.children.map((c, i) => (
            <Link key={`${c.href}-${i}`} href={c.href} className="block px-6 py-[7px] text-[13px] text-white/60 transition-colors hover:text-white">
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
