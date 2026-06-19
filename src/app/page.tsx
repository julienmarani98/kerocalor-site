import Link from "next/link";
import { souls, contacts } from "@/lib/site-config";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-ash">
        <div className="container-site py-20 lg:py-28">
          <p className="kicker reveal">Mornago (VA) · dal {contacts.since}</p>
          <h1 className="h-display reveal mt-5 max-w-5xl">
            Due anime,
            <br />
            una sola casa.
          </h1>
          <p className="reveal mt-7 max-w-xl text-lg text-ink/80">
            Da oltre 50 anni il <strong>calore</strong> e l’<strong>arredo</strong> della tua casa.
            Scegli da dove vuoi entrare.
          </p>
        </div>
      </section>

      {/* TWO SOULS SPLIT */}
      <section className="grid border-b border-line md:grid-cols-2">
        <SoulPanel
          href="/stufe"
          eyebrow="Anima 01"
          title={souls.stufe.title}
          tagline={souls.stufe.tagline}
          tone="dark"
        />
        <SoulPanel
          href="/arredamento"
          eyebrow="Anima 02"
          title={souls.arredamento.title}
          tagline={souls.arredamento.tagline}
          tone="light"
        />
      </section>

      {/* THIRD AREA */}
      <section className="container-site grid gap-px bg-line py-0 sm:grid-cols-2">
        <Link
          href="/elettrodomestici"
          className="group flex items-center justify-between bg-ash p-10 transition-colors hover:bg-white"
        >
          <div>
            <p className="kicker text-steel">In più</p>
            <h3 className="h-section mt-2">Elettrodomestici</h3>
            <p className="mt-2 text-sm text-ink/70">Incasso e libera installazione, le migliori marche.</p>
          </div>
          <Arrow />
        </Link>
        <Link
          href="/ricambi"
          className="group flex items-center justify-between bg-ash p-10 transition-colors hover:bg-white"
        >
          <div>
            <p className="kicker text-steel">Assistenza</p>
            <h3 className="h-section mt-2">Ricambi</h3>
            <p className="mt-2 text-sm text-ink/70">Trovi il pezzo che ti serve? Scrivici, ci pensiamo noi.</p>
          </div>
          <Arrow />
        </Link>
      </section>

      {/* STORY STRIP */}
      <section className="border-y border-line bg-ash">
        <div className="container-site grid gap-10 py-20 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="kicker text-ember">La nostra storia</p>
            <h2 className="h-section mt-4 max-w-xl">
              Più di mezzo secolo accanto alle famiglie del territorio.
            </h2>
            <p className="mt-5 max-w-xl text-ink/75">
              Nata nel {contacts.since} nel settore del riscaldamento, Kerocalor è
              cresciuta fino a diventare un punto di riferimento per stufe, caminetti,
              cucine e arredamento. {contacts.showroom}.
            </p>
            <Link href="/chi-siamo" className="btn-light mt-8">Scopri chi siamo</Link>
          </div>
          <div className="grid grid-cols-3 gap-px border border-line bg-line text-center">
            <Stat n="50+" l="Anni di attività" />
            <Stat n="3.000" l="mq di showroom" />
            <Stat n="∞" l="Parcheggio" />
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
  tone,
}: {
  href: string;
  eyebrow: string;
  title: string;
  tagline: string;
  tone: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      className={`group relative flex min-h-[60vh] flex-col justify-between overflow-hidden p-10 transition-colors duration-500 lg:p-16 ${
        dark ? "bg-carbon text-white hover:bg-ink" : "bg-ash text-ink hover:bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`kicker ${dark ? "text-white/50" : "text-steel"}`}>{eyebrow}</span>
        <span className={`h-3 w-3 ${dark ? "bg-ember" : "bg-carbon"}`} />
      </div>
      <div>
        <h2 className="display text-5xl lg:text-7xl">{title}</h2>
        <p className={`mt-4 max-w-sm text-sm ${dark ? "text-white/65" : "text-ink/70"}`}>{tagline}</p>
        <span className="mt-8 inline-flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-widest2">
          Entra
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
        </span>
      </div>
    </Link>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="bg-ash p-6">
      <div className="display text-3xl text-ink">{n}</div>
      <div className="mt-2 text-[10px] uppercase tracking-wider2 text-steel">{l}</div>
    </div>
  );
}

function Arrow() {
  return (
    <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">→</span>
  );
}
