"use client";

/**
 * Mappa Google in "click-to-load": finché l'utente non preme il pulsante non
 * viene contattato alcun server di terze parti (nessun IP/referrer a Google).
 * Così il sito non necessita di cookie banner — vedi /cookie-policy.
 */
import { useState } from "react";
import { PinIcon } from "@/components/icons";

export default function MapEmbed({ query, address, city }: { query: string; address: string; city: string }) {
  const [loaded, setLoaded] = useState(false);
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const external = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  if (loaded) {
    return (
      <iframe
        title="Mappa Kerocalor"
        src={embed}
        className="h-full min-h-[320px] w-full md:min-h-[360px]"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <div className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-4 bg-ink px-6 py-10 text-center md:min-h-[360px]">
      <PinIcon className="h-8 w-8 text-ember" />
      <div className="text-white">
        <p className="text-lg font-extrabold uppercase tracking-wider2">{address}</p>
        <p className="text-white/70">{city}</p>
      </div>
      <button type="button" onClick={() => setLoaded(true)} className="btn-ghost-white">
        Carica la mappa
      </button>
      <p className="max-w-xs text-[11px] leading-relaxed text-white/45">
        Caricando la mappa accetti che il tuo indirizzo IP venga comunicato a Google
        Maps.{" "}
        <a href={external} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
          Apri in Google Maps ↗
        </a>
      </p>
    </div>
  );
}
