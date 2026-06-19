import { Product } from "@/lib/catalog";
import { waLink, mailLink } from "@/lib/site-config";

export default function ProductCard({ p }: { p: Product }) {
  const enquiry = `Salve, vorrei informazioni su "${p.name}".`;
  return (
    <article className="group flex flex-col">
      <div className="card-media" style={{ background: p.placeholder ?? "#1c1c1c" }}>
        {/* Placeholder finché non si caricano le foto reali (ex novo) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] font-extrabold uppercase tracking-widest2 text-white/30">
            Foto in arrivo
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider2 text-ink">{p.name}</h3>
        {p.brand && <p className="mt-0.5 text-[11px] uppercase tracking-wider2 text-steel">{p.brand}</p>}
        {typeof p.price === "number" && (
          <p className="mt-2 text-sm font-bold text-ink">€ {p.price.toLocaleString("it-IT")}</p>
        )}

        <div className="mt-4 flex gap-2">
          <a href={waLink(enquiry)} target="_blank" rel="noopener" className="btn-wa flex-1 !px-3 !py-2 !text-[11px]">
            WhatsApp
          </a>
          <a href={mailLink(`Richiesta: ${p.name}`)} className="btn-light flex-1 !px-3 !py-2 !text-[11px]">
            Email
          </a>
        </div>
      </div>
    </article>
  );
}
