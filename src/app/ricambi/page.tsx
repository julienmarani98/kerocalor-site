import { contacts, waLink, mailLink } from "@/lib/site-config";

export const metadata = {
  title: "Ricambi stufe e caminetti — Kerocalor Mornago (VA)",
  description:
    "Ricambi per stufe e caminetti: vetri, motoriduttori, bracieri, ventole, candelette, piastre in ghisa. Contattaci su WhatsApp o via email.",
};

const ricambi = [
  "Vetri ceramici",
  "Motoriduttori",
  "Bracieri",
  "Ventole / estrattori fumi",
  "Candelette di accensione",
  "Piastre in ghisa (tonda / rettangolare)",
  "Guarnizioni e sonde",
  "Schede elettroniche",
];

export default function Ricambi() {
  const msg = "Salve, ho bisogno di un ricambio. Modello stufa/caminetto: ... Pezzo: ...";
  return (
    <section className="bg-carbon text-white">
      <div className="container-site py-20 lg:py-28">
        <p className="kicker text-ember">Assistenza</p>
        <h1 className="h-display reveal mt-5 max-w-3xl">Ti serve un ricambio?</h1>
        <p className="reveal mt-6 max-w-2xl text-lg text-white/70">
          Non vendiamo i ricambi online: ce li chiedi e li troviamo per te. Scrivici
          il <strong className="text-white">modello</strong> della stufa o del caminetto e il
          <strong className="text-white"> pezzo</strong> che ti serve — possibilmente con una foto.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={waLink(msg)} target="_blank" rel="noopener" className="btn-wa">
            Contattaci su WhatsApp
          </a>
          <a href={mailLink("Richiesta ricambio")} className="btn-ghost-white">
            Scrivici una email
          </a>
          <a href={`tel:${contacts.phoneHref}`} className="btn-ghost-white">
            Chiama {contacts.phone}
          </a>
        </div>

        <div className="mt-16">
          <p className="kicker text-white/40">Ricambi più richiesti</p>
          <div className="mt-6 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {ricambi.map((r) => (
              <div key={r} className="bg-carbon p-6 text-sm font-semibold text-white/80">
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
