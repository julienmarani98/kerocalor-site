import { elettrodomestici } from "@/lib/site-config";
import { getProductsByCategory, getSettings, isCatalogNoticeActive } from "@/lib/store";
import ProductGrid from "@/components/ProductGrid";
import CatalogNotice from "@/components/CatalogNotice";
import ContactCTA from "@/components/ContactCTA";

export const metadata = {
  title: "Elettrodomestici — Incasso e Libera Installazione | Kerocalor",
  description:
    "Elettrodomestici da incasso e a libera installazione delle migliori marche. Forno, piano cottura, frigorifero, lavastoviglie e altro. Kerocalor, Mornago (VA).",
};

const marche = [
  "Whirlpool", "Miele", "Bosch", "Siemens", "Electrolux", "Rex",
  "Ariston", "Hotpoint", "Indesit", "Ignis", "San Giorgio",
  "Franke", "Blanco", "Elica", "Faber", "Falmec", "Samsung",
];

const groupCopy: Record<string, string> = {
  incasso:
    "Forni, piani cottura, cappe, frigoriferi e lavastoviglie integrati nei tuoi mobili.",
  "libera-installazione":
    "Frigoriferi, lavatrici, lavastoviglie e altro, pronti all’uso.",
};

export default async function Elettrodomestici() {
  const [incasso, libera, settings] = await Promise.all([
    getProductsByCategory("incasso"),
    getProductsByCategory("libera-installazione"),
    getSettings(),
  ]);
  const sections = [
    { ...elettrodomestici.groups[0], products: incasso },
    { ...elettrodomestici.groups[1], products: libera },
  ];

  return (
    <>
      <section className="border-b border-line bg-ash">
        <div className="container-site grid items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="kicker reveal text-ember">Sezione dedicata</p>
            <h1 className="h-display reveal mt-5" style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
              {elettrodomestici.title}
            </h1>
            <p className="reveal mt-6 max-w-xl text-lg text-ink/75" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
              {elettrodomestici.tagline}.
            </p>
          </div>
          <div className="reveal-media relative aspect-[4/3] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/categorie/elettrodomestici.jpg"
              alt="Colonna forni da incasso"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {sections.map((g, gi) => (
        <section
          key={g.slug}
          id={g.slug}
          className={`scroll-mt-[var(--header-h)] border-b border-line ${gi % 2 ? "bg-ash" : ""}`}
        >
          <div className="container-site py-14 lg:py-20">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4" data-reveal>
              <div>
                <p className="kicker text-ember">
                  {gi === 0 ? "Integrati in cucina" : "Pronti all’uso"}
                </p>
                <h2 className="h-section mt-3">{g.name}</h2>
                <p className="mt-3 max-w-xl text-sm text-ink/70">{groupCopy[g.slug]}</p>
              </div>
            </div>
            {isCatalogNoticeActive(settings, g.slug) ? (
              <CatalogNotice settings={settings} />
            ) : (
              <ProductGrid products={g.products} settings={settings} />
            )}
          </div>
        </section>
      ))}

      <section className="border-b border-line bg-ash">
        <div className="container-site py-16">
          <p className="kicker text-steel" data-reveal>Le marche che trattiamo</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {marche.map((m, i) => (
              <span
                key={m}
                data-reveal="scale"
                style={{ "--reveal-delay": `${(i % 8) * 40}ms` } as React.CSSProperties}
                className="border border-line bg-white px-4 py-2 text-[12px] font-extrabold uppercase tracking-wider2 text-ink transition-colors hover:border-carbon"
              >
                {m}
              </span>
            ))}
          </div>
          <p className="mt-8 text-[11px] uppercase tracking-[0.12em] text-steel">
            Immagini provvisorie a scopo dimostrativo · catalogo in allestimento
          </p>
        </div>
      </section>

      <ContactCTA title="Cerchi un elettrodomestico?" text="Dicci marca e modello: verifichiamo disponibilità e prezzo. Anche ritiro e smaltimento del vecchio." />
    </>
  );
}
