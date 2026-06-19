import type { StoredProduct, Settings } from "@/lib/store";
import { waUrl, mailUrl } from "@/lib/links";

export default function ProductCard({ p, settings }: { p: StoredProduct; settings: Settings }) {
  const enquiry = `Salve, vorrei informazioni su "${p.name}".`;
  return (
    <article className="group flex flex-col">
      <div className="card-media">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.name} loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-ink">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
              Foto in arrivo
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="text-sm font-bold text-ink">{p.name}</h3>
        {p.brand && <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-steel">{p.brand}</p>}
        {typeof p.price === "number" && (
          <p className="mt-2 text-sm font-semibold text-ink">€ {p.price.toLocaleString("it-IT")}</p>
        )}

        <div className="mt-4 flex gap-2">
          <a href={waUrl(settings.whatsappHref, enquiry)} target="_blank" rel="noopener" className="btn-wa flex-1 !px-3 !py-2 !text-[11px]">
            WhatsApp
          </a>
          <a href={mailUrl(settings.email, `Richiesta: ${p.name}`)} className="btn-light flex-1 !px-3 !py-2 !text-[11px]">
            Email
          </a>
        </div>
      </div>
    </article>
  );
}
