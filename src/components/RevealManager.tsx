"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Osserva gli elementi [data-reveal] e aggiunge .in-view alla prima
 * intersezione (poi smette di osservarli). Lo stato nascosto iniziale è
 * attivo solo con html.js-anim (inline script nel root layout), quindi
 * senza JS non si nasconde nulla. Ri-esegue la scansione a ogni rotta.
 */
export default function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    const scan = () =>
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.in-view)")
        .forEach((el) => io.observe(el));
    scan();
    // Nodi aggiunti dopo l'hydration (navigazioni, contenuti dinamici)
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
