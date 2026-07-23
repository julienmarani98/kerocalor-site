"use client";

import { useEffect, useState } from "react";
import { PinIcon, NavArrowIcon, WazeIcon } from "./icons";

/**
 * Click sull'indirizzo → scelta del navigatore (Google Maps / Apple Maps / Waze).
 * Stesso pattern usato su LDK, adattato al linguaggio squadrato KeroCalor.
 */
export default function DirectionsChooser({
  address,
  city,
  className = "",
  children,
}: {
  address: string;
  city: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const dest = `${address}, ${city}`;
  const enc = encodeURIComponent(dest);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const apps = [
    {
      name: "Google Maps",
      href: `https://www.google.com/maps/dir/?api=1&destination=${enc}`,
      icon: <PinIcon />,
    },
    {
      name: "Apple Maps",
      href: `https://maps.apple.com/?daddr=${enc}&dirflg=d`,
      icon: <NavArrowIcon />,
    },
    {
      name: "Waze",
      href: `https://waze.com/ul?q=${enc}&navigate=yes`,
      icon: <WazeIcon />,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group/dir text-left ${className}`}
        aria-haspopup="dialog"
        title="Apri con il tuo navigatore"
      >
        {children}
      </button>

      {open && (
        <div
          className="dir-overlay fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Scegli il navigatore"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="dir-card w-full max-w-sm border border-line bg-white p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="kicker text-steel">{dest}</p>
                <h3 className="display mt-2 text-xl text-ink">Come vuoi arrivare?</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Chiudi"
                className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center text-2xl leading-none text-steel transition-colors hover:text-ink"
              >
                ×
              </button>
            </div>
            <p className="mt-1 text-sm text-ink/65">Scegli il navigatore che preferisci.</p>
            <div className="mt-5 flex flex-col gap-2">
              {apps.map((a, i) => (
                <a
                  key={a.name}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="dir-app group/app flex items-center gap-3 border border-line px-4 py-3.5 text-[13px] font-medium uppercase tracking-[0.08em] text-ink transition-all duration-200 hover:border-carbon hover:bg-ash"
                  style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}
                >
                  <span className="text-ember">{a.icon}</span>
                  {a.name}
                  <span className="ml-auto text-steel transition-transform duration-200 group-hover/app:translate-x-1 group-hover/app:text-ink">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
