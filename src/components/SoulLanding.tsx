import Link from "next/link";
import { Soul, souls } from "@/lib/site-config";
import ContactCTA from "@/components/ContactCTA";

export default function SoulLanding({ soul }: { soul: Soul }) {
  const data = souls[soul];
  const dark = soul === "stufe";
  return (
    <>
      <section className={`border-b border-line ${dark ? "bg-carbon text-white" : "bg-ash text-ink"}`}>
        <div className="container-site py-20 lg:py-28">
          <p className={`kicker ${dark ? "text-ember" : "text-steel"}`}>
            {soul === "stufe" ? "Anima 01 — Il calore" : "Anima 02 — La casa"}
          </p>
          <h1 className="h-display reveal mt-5">{data.title}</h1>
          <p className={`reveal mt-6 max-w-xl text-lg ${dark ? "text-white/70" : "text-ink/75"}`}>
            {data.tagline}.
          </p>
        </div>
      </section>

      <section className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {data.categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${soul}/${c.slug}`}
              className="group flex flex-col justify-between bg-ash p-8 transition-colors hover:bg-white"
            >
              <div>
                <h2 className="text-lg font-extrabold uppercase tracking-wider2 text-ink">{c.name}</h2>
                <p className="mt-2 text-sm text-ink/65">{c.blurb}</p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest2 text-ink">
                Vedi
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
