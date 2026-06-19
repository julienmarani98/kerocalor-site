"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { megaNav, contacts, waLink, MegaItem } from "@/lib/site-config";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
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
          <span className="text-lg font-extrabold uppercase tracking-[0.02em] text-carbon">
            Kero<span className="text-ember">calor</span>
          </span>
          <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-steel sm:block">
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
          <a href={`tel:${contacts.phoneHref}`} className="nav-link !font-medium">
            {contacts.phone}
          </a>
          <a href={waLink("Salve, vorrei un'informazione.")} target="_blank" rel="noopener" className="btn-wa !px-4 !py-2 !text-[11px]">
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

      {/* Mobile drawer con accordion */}
      <div
        className={`overflow-y-auto border-t border-line bg-ash lg:hidden ${
          open ? "max-h-[calc(100vh-var(--header-h))]" : "max-h-0"
        } transition-[max-height] duration-500`}
        style={{ transitionTimingFunction: "var(--ease)" }}
      >
        <nav className="container-site flex flex-col py-3">
          {megaNav.map((item) => (
            <div key={item.href} className="border-b border-line">
              {item.children ? (
                <>
                  <button
                    onClick={() => setOpenSub((s) => (s === item.href ? null : item.href))}
                    className="flex w-full items-center justify-between py-3 text-left text-sm font-medium uppercase tracking-[0.08em] text-ink"
                    aria-expanded={openSub === item.href}
                  >
                    {item.label}
                    <span className={`transition-transform ${openSub === item.href ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ${
                      openSub === item.href ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="flex flex-col pb-2">
                      {item.children.map((c, i) => (
                        <Link
                          key={`${c.href}-${i}`}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="py-2 pl-3 text-[13px] link-faded"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium uppercase tracking-[0.08em] text-ink"
                >
                  {item.label}
                </Link>
              )}
            </div>
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
        className="flex items-center gap-1 text-[13px] font-normal text-ink transition-colors group-hover/nav:text-ember"
      >
        {item.label}
        <span className="text-[9px] opacity-50 transition-transform duration-300 group-hover/nav:rotate-180">▾</span>
      </Link>

      {/* Dropdown panel */}
      <div className="invisible absolute left-0 top-full z-50 opacity-0 transition-all duration-200 group-hover/nav:visible group-hover/nav:opacity-100">
        <div className="relative mt-0 min-w-[230px] border-x border-b border-line bg-ash py-3 shadow-[2px_2px_10px_rgba(0,0,0,0.06)]">
          <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-carbon transition-transform duration-300 group-hover/nav:scale-x-100" />
          {item.children.map((c, i) => (
            <Link
              key={`${c.href}-${i}`}
              href={c.href}
              className="block px-6 py-[7px] text-[13px] link-faded"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
