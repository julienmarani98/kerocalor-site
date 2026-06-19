import { elettrodomestici } from "@/lib/site-config";
import ContactCTA from "@/components/ContactCTA";

export const metadata = {
  title: "Elettrodomestici — Incasso e Libera Installazione | Kerocalor",
  description:
    "Elettrodomestici da incasso e a libera installazione delle migliori marche. Forno, piano cottura, frigorifero, lavastoviglie e altro. Kerocalor, Mornago (VA).",
};

const marche = [
  "Whirlpool", "Miele", "Bosch", "Siemens", "Electrolux", "Rex",
  "Ariston", "Hotpoint", "Indesit", "Ignis", "San Giorgio",
  "Franke", "Blanco", "Elica", "Faber", "Falmec",
];

export default function Elettrodomestici() {
  return (
    <>
      <section className="border-b border-line bg-ash">
        <div className="container-site py-20 lg:py-28">
          <p className="kicker text-ember">Sezione dedicata</p>
          <h1 className="h-display reveal mt-5">{elettrodomestici.title}</h1>
          <p className="reveal mt-6 max-w-xl text-lg text-ink/75">
            {elettrodomestici.tagline}.
          </p>
        </div>
      </section>

      <section className="container-site grid gap-px border border-line bg-line py-0 sm:grid-cols-2">
        {elettrodomestici.groups.map((g) => (
          <div key={g.slug} className="bg-ash p-10 lg:p-14">
            <h2 className="h-section">{g.name}</h2>
            <p className="mt-3 text-sm text-ink/70">
              {g.slug === "incasso"
                ? "Forni, piani cottura, cappe, frigoriferi e lavastoviglie integrati nei tuoi mobili."
                : "Frigoriferi, lavatrici, lavastoviglie e altro, pronti all’uso."}
            </p>
          </div>
        ))}
      </section>

      <section className="border-y border-line bg-ash">
        <div className="container-site py-16">
          <p className="kicker text-steel">Le marche che trattiamo</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {marche.map((m) => (
              <span
                key={m}
                className="border border-line bg-white px-4 py-2 text-[12px] font-extrabold uppercase tracking-wider2 text-ink"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA title="Cerchi un elettrodomestico?" text="Dicci marca e modello: verifichiamo disponibilità e prezzo. Anche ritiro e smaltimento del vecchio." />
    </>
  );
}
