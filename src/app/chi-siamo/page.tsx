import { contacts } from "@/lib/site-config";
import ContactCTA from "@/components/ContactCTA";

export const metadata = {
  title: "Chi siamo — Kerocalor dal 1969 | Mornago (VA)",
  description:
    "La storia di Kerocalor: dal 1969 nel riscaldamento, oggi punto di riferimento per stufe e arredamento in provincia di Varese. 3.000 mq di esposizione.",
};

export default function ChiSiamo() {
  return (
    <>
      <section className="border-b border-line bg-carbon text-white">
        <div className="container-site py-20 lg:py-28">
          <p className="kicker text-ember">Chi siamo</p>
          <h1 className="h-display reveal mt-5 max-w-4xl">
            Dal {contacts.since},
            <br />
            il calore di casa.
          </h1>
        </div>
      </section>

      <section className="container-site grid gap-14 py-20 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-ink/85">
          <p>
            <strong>{contacts.company}</strong> nasce nel {contacts.since}, da subito
            impostata nel settore del riscaldamento. Negli anni l’azienda è cresciuta
            fino a diventare un riferimento nel riscaldamento a legna, gas e nei
            prodotti di ultima generazione a pellet.
          </p>
          <p>
            Lo sviluppo è proseguito nel mondo dell’<strong>arredamento</strong>, con
            una grande esposizione di cucine, salotti, mobili giorno, camere e
            camerette. Forniamo inoltre prodotti di varie marche per l’incasso e la
            libera installazione.
          </p>
          <p>
            Installiamo stufe di ogni genere — a legna, a pellet, termostufe, caldaie —
            appoggiandoci a <strong>tecnici qualificati</strong>. Organizziamo
            traslochi, eseguiamo modifiche e offriamo il servizio di sostituzione dei
            vecchi elettrodomestici.
          </p>
        </div>

        <aside className="space-y-px self-start border border-line bg-line">
          <Fact k="Anno di fondazione" v={String(contacts.since)} />
          <Fact k="Esposizione" v="3.000 mq" />
          <Fact k="Dove" v="Mornago, prov. di Varese" />
          <Fact k="Parcheggio" v="Illimitato" />
        </aside>
      </section>

      <section className="border-y border-line bg-ash">
        <div className="container-site py-16">
          <p className="kicker text-ember">Cosa facciamo</p>
          <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Vendita", "Stufe, caminetti, cucine, arredo ed elettrodomestici."],
              ["Installazione", "Stufe e impianti con tecnici qualificati."],
              ["Sopralluogo", "Valutazione gratuita degli spazi."],
              ["Traslochi", "Organizziamo e gestiamo il trasporto."],
              ["Modifiche", "Adattamenti su misura."],
              ["Ritiro usato", "Sostituzione dei vecchi elettrodomestici."],
            ].map(([t, d]) => (
              <div key={t} className="bg-ash p-8">
                <h3 className="text-base font-extrabold uppercase tracking-wider2 text-ink">{t}</h3>
                <p className="mt-2 text-sm text-ink/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-ash p-6">
      <div className="text-[10px] uppercase tracking-wider2 text-steel">{k}</div>
      <div className="mt-1 text-lg font-extrabold uppercase tracking-wider2 text-ink">{v}</div>
    </div>
  );
}
