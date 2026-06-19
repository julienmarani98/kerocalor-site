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
            <h1 className="h-display reveal mt-5 max-w-2xl">
              Due anime,
              <br />
              una sola casa.
            </h1>
            <p className="reveal mt-7 max-w-xl text-base text-ink/75">
              Da oltre 50 anni il <strong>calore</strong> e l’<strong>arredo</strong> della tua casa.
              Scegli da dove vuoi entrare.
            </p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Link href="/stufe" className="btn-dark">Riscaldamento</Link>
              <Link href="/arredamento" className="btn-light">Arredamento</Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cucine/caranto.jpg" alt="Cucina in esposizione" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* TWO SOULS SPLIT con immagini */}
      <section className="grid border-b border-line md:grid-cols-2">
        <SoulPanel
          href="/stufe"
          eyebrow="Anima 01"
          title={souls.stufe.title}
          tagline={souls.stufe.tagline}
          image="/images/hero/stufa-ambiente.webp"
        />
        <SoulPanel
          href="/arredamento"
          eyebrow="Anima 02"
          title={souls.arredamento.title}
          tagline={souls.arredamento.tagline}
          image="/images/cucine/cucina-1.jpg"
        />
      </section>

      {/* PRODOTTI IN EVIDENZA */}
      <section className="container-site py-16 lg:py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="kicker text-ember">In evidenza</p>
            <h2 className="h-section mt-3">Una selezione</h2>
          </div>
          <Link href="/stufe" className="hidden text-[12px] font-medium uppercase tracking-[0.1em] text-ink sm:inline-flex items-center gap-2 hover:text-ember">
            Vedi tutto <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} settings={settings} />
          ))}
        </div>
        <p className="mt-8 text-[11px] uppercase tracking-[0.12em] text-steel">
          Immagini provvisorie a scopo dimostrativo · catalogo in allestimento
        </p>
      </section>

      {/* THIRD AREA */}
      <section className="container-site grid gap-px bg-line pb-0 sm:grid-cols-2">
        <Link href="/elettrodomestici" className="group flex items-center justify-between bg-ash p-10 transition-colors hover:bg-white">
          <div>
            <p className="kicker text-steel">In più</p>
            <h3 className="h-section mt-2">Elettrodomestici</h3>
            <p className="mt-2 text-sm text-ink/70">Incasso e libera installazione, le migliori marche.</p>
          </div>
          <Arrow />
        </Link>
        <Link href="/ricambi" className="group flex items-center justify-between bg-ash p-10 transition-colors hover:bg-white">
          <div>
            <p className="kicker text-steel">Assistenza</p>
            <h3 className="h-section mt-2">Ricambi</h3>
            <p className="mt-2 text-sm text-ink/70">Trovi il pezzo che ti serve? Scrivici, ci pensiamo noi.</p>
          </div>
          <Arrow />
        </Link>
      </section>

      {/* STORY BAND con immagine */}
      <section className="relative mt-16 overflow-hidden border-y border-line">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/cucine/magazine.jpg" alt="Ambiente Kerocalor" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="bg-carbon px-8 py-16 text-white lg:px-14">
            <p className="kicker text-ember">La nostra storia</p>
            <h2 className="h-section mt-4 max-w-xl">
              Più di mezzo secolo accanto alle famiglie del territorio.
            </h2>
            <p className="mt-5 max-w-xl text-white/70">
              Nata nel {contacts.since} nel settore del riscaldamento, Kerocalor è
              cresciuta fino a diventare un riferimento per stufe, caminetti,
              cucine e arredamento. {contacts.showroom}.
            </p>
            <div className="mt-8 flex gap-px border border-white/15 bg-white/15 text-center">
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
  eyebrow,
  title,
  tagline,
  image,
}: {
  href: string;
  eyebrow: string;
  title: string;
  tagline: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[68vh] flex-col justify-between overflow-hidden p-10 text-white lg:p-16"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 transition-colors duration-500 group-hover:from-black/85" />
      <div className="relative flex items-center justify-between">
        <span className="kicker text-white/60">{eyebrow}</span>
        <span className="h-3 w-3 bg-ember" />
      </div>
      <div className="relative">
        <h2 className="display text-5xl lg:text-7xl">{title}</h2>
        <p className="mt-4 max-w-sm text-sm text-white/75">{tagline}</p>
        <span className="mt-8 inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.16em]">
          Entra
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

function Arrow() {
  return <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>;
}
