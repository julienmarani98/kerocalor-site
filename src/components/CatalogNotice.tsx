import type { Settings } from "@/lib/store";
import { waUrl, telHref } from "@/lib/links";

/**
 * Sostituisce la griglia prodotti quando l'admin attiva l'avviso per la categoria.
 * Il catalogo resta raggiungibile: la pagina risponde 200 con invito al contatto.
 */
export default function CatalogNotice({ settings }: { settings: Settings }) {
  const msg = "Salve, vorrei informazioni sui modelli disponibili in showroom.";
  return (
    <div className="border border-line bg-ash px-6 py-16 text-center sm:py-20" data-reveal>
      <p className="kicker text-ember">Stiamo lavorando per voi</p>
      <p className="mt-4 text-2xl font-extrabold uppercase tracking-[0.08em] text-ink sm:text-3xl">
        Catalogo in aggiornamento
      </p>
      <p className="mx-auto mt-5 max-w-xl text-sm text-ink/70 sm:text-base">
        Stiamo rinnovando la selezione di questa categoria. Modelli, prezzi e
        offerte sono disponibili in showroom: contattaci o vieni a trovarci.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={waUrl(settings.whatsappHref, msg)} target="_blank" rel="noopener noreferrer" className="btn-wa">
          Contattaci su WhatsApp
        </a>
        <a href={telHref(settings.phoneHref)} className="btn-dark">
          Chiama {settings.phone}
        </a>
      </div>
    </div>
  );
}
