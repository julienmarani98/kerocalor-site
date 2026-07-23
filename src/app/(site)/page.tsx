import Link from "next/link";
import { souls, contacts } from "@/lib/site-config";
import { getFeatured, getSettings } from "@/lib/store";
import ProductCard from "@/components/ProductCard";
import ContactCTA from "@/components/ContactCTA";

export default async function Home() {
  const [featured, settings] = await Promise.all([getFeatured(4), getSettings()]);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-ash">
        <div className="container-site grid items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="kicker reveal">Mornago (VA) · dal {contacts.since}</p>
            <h1 className="h-display reveal mt-5 max-w-2xl" style={{ "--reveal-delay": "90ms" } as React.CSSProperties}>
              Due anime,
              <br />
              una sola casa.
            </h1>
            <p className="reveal mt-7 max-w-xl text-base text-ink/75" style={{ "--reveal-delay": "180ms" } as React.CSSProperties}>
              Da oltre 50 anni il <strong>calore</strong> e l’<strong>arredo</strong> della tua casa.
              Scegli da dove vuoi entrare.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3" style={{ "--reveal-delay": "270ms" } as React.CSSProperties}>
              <Link href="/stufe" className="btn-dark">Riscaldamento</Link>
              <Link href="/arredamento" className="btn-light">Arredamento</Link>
            </div>
          </div>
          <div className="reveal-media relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/categorie/cucine.jpg" alt="Cucina in esposizione" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* TWO SOULS SPLIT con immagini */}
      <section className="grid border-b border-line md:grid-cols-2">
        <SoulPanel
          href="/stufe"
          title={souls.stufe.title}
          tagline={souls.stufe.tagline}
          image="/images/categorie/stufe-a-legna.jpg"
          position="72% center"
        />
        <SoulPanel
          href="/arredamento"
          title={souls.arredamento.title}
          tagline={souls.arredamento.tagline}
          image="/images/categorie/salotti.jpg"
        />
      </section>

      {/* PRODOTTI IN EVIDENZA */}
      <section className="container-site py-16 lg:py-24">
        <div className="mb-10 flex items-end justify-between" data-reveal>
          <div>
            <p className="kicker text-ember">La nostra selezione</p>
            <h2 className="h-section mt-3">In evidenza</h2>
          </div>
          <Link href="/stufe" className="hidden text-[12px] font-medium uppercase tracking-[0.1em] text-ink sm:inline-flex items-center gap-2 hover:text-ember">
            Vedi tutto <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-4">
          {featured.map((p, i) => (
            <div key={p.id} data-reveal style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}>
              <ProductCard p={p} settings={settings} />
            </div>
          ))}
        </div>
        <p className="mt-8 text-[11px] uppercase tracking-[0.12em] text-steel">
          Immagini provvisorie a scopo dimostrativo · catalogo in allestimento
        </p>
      </section>

      {/* THIRD AREA */}
      <section className="container-site grid gap-px bg-line pb-0 sm:grid-cols-2">
        <AreaPanel
          href="/elettrodomestici"
          kicker="In più"
          title="Elettrodomestici"
          text="Incasso e libera installazione, le migliori marche."
          image="/images/categorie/elettrodomestici.jpg"
        />
        <AreaPanel
          href="/ricambi"
          kicker="Assistenza"
          title="Ricambi"
          text="Trovi il pezzo che ti serve? Scrivici, ci pensiamo noi."
          image="/images/categorie/ricambi.jpg"
        />
      </section>

      {/* STORY BAND con immagine */}
      <section className="relative mt-16 overflow-hidden border-y border-line">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cucine/magazine.jpg" alt="Ambiente Kerocalor" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="bg-carbon px-8 py-16 text-white lg:px-14">
            <div data-reveal>
              <p className="kicker text-ember">La nostra storia</p>
              <h2 className="h-section mt-4 max-w-xl">
                Più di mezzo secolo accanto alle famiglie del territorio.
              </h2>
              <p className="mt-5 max-w-xl text-white/70">
                Nata nel {contacts.since} nel settore del riscaldamento, Kerocalor è
                cresciuta fino a diventare un riferimento per stufe, caminetti,
                cucine e arredamento. {contacts.showroom}.
              </p>
            </div>
            <div
              className="mt-8 flex gap-px border border-white/15 bg-white/15 text-center"
              data-reveal
              style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
            >
              <Stat n="50+" l="Anni" />
              <Stat n="3.000" l="mq showroom" />
              <Stat n="∞" l="Parcheggio" />
            </div>
            <Link href="/chi-siamo" className="btn-ghost-white mt-8">Scopri chi siamo</Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

function SoulPanel({
  href,
  title,
  tagline,
  image,
  position = "center",
}: {
  href: string;
  title: string;
  tagline: string;
  image: string;
  position?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[52vh] flex-col justify-between overflow-hidden p-8 text-white sm:p-10 md:min-h-[68vh] lg:p-16"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        style={{ objectPosition: position }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 transition-colors duration-500 group-hover:from-black/85" />
      <div className="relative flex items-center justify-end">
        <span className="h-3 w-3 bg-ember" />
      </div>
      <div className="relative" data-reveal>
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl">{title}</h2>
        <p className="mt-4 max-w-sm text-sm text-white/75">{tagline}</p>
        <span className="mt-8 inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.16em]">
          Entra
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
        </span>
      </div>
    </Link>
  );
}

function AreaPanel({
  href,
  kicker,
  title,
  text,
  image,
}: {
  href: string;
  kicker: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[240px] items-end overflow-hidden p-8 text-white sm:min-h-[280px] lg:p-10"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15 transition-colors duration-500 group-hover:from-black/85" />
      <div className="relative" data-reveal>
        <p className="kicker text-white/60">{kicker}</p>
        <h3 className="h-section mt-2">{title}</h3>
        <p className="mt-2 max-w-sm text-sm text-white/75">{text}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest2">
          Scopri
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
        </span>
      </div>
    </Link>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="flex-1 bg-carbon p-5">
      <div className="display text-2xl text-white">{n}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/50">{l}</div>
    </div>
  );
}

