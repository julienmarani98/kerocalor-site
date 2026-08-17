import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { legal, hours } from "@/lib/site-config";
import { getSettings } from "@/lib/store";

export const metadata = {
  title: "Note legali — Kerocalor",
  description:
    "Dati societari, proprietà intellettuale, marchi di terzi e condizioni d'uso del sito Kerocalor S.r.l.",
};

export default async function NoteLegali() {
  const s = await getSettings();
  return (
    <LegalPage title="Note legali" updated="agosto 2026">

      <h2>1. Dati societari</h2>
      <p>
        {legal.company}
        <br />
        Sede legale e showroom: {legal.address}, {legal.city}
        <br />
        Partita IVA e Codice Fiscale: {legal.vat}
        <br />
        Iscrizione al Registro delle Imprese di Varese, n. REA:{" "}
        {legal.rea || "[DA COMPLETARE]"}
        <br />
        Capitale sociale: {legal.capital ? `€ ${legal.capital}` : "[DA COMPLETARE]"}
        <br />
        PEC: {legal.pec || "[DA COMPLETARE]"}
        <br />
        Telefono: {s.phone} · Email: <a href={`mailto:${s.email}`}>{s.email}</a>
        <br />
        Orari: {hours.weekdays} {hours.morning} / {hours.afternoon} — {hours.closed}
      </p>
      <p>
        Informazioni rese ai sensi dell’art. 2250 c.c. e dell’art. 7 del D.Lgs.
        70/2003 (commercio elettronico).
      </p>

      <h2>2. Natura del sito e dei contenuti</h2>
      <p>
        Questo sito è un <strong>catalogo vetrina</strong>: non consente l’acquisto
        online e non prevede carrello né pagamenti. Le schede prodotto, le immagini e
        gli eventuali prezzi hanno finalità informativa e costituiscono un invito a
        contattarci, non un’offerta al pubblico ai sensi dell’art. 1336 c.c.
        Disponibilità, caratteristiche e prezzi vanno confermati in showroom o tramite
        preventivo scritto.
      </p>
      <p>
        Salvo diversa indicazione, i prezzi eventualmente esposti si intendono IVA
        inclusa ed esclusi trasporto, installazione e opere accessorie.
      </p>

      <h2>3. Proprietà intellettuale</h2>
      <p>
        I contenuti originali del sito (testi, struttura, grafica, logo Kerocalor) sono
        di titolarità di {legal.company} e tutelati dalla L. 633/1941. Ne è vietata la
        riproduzione, anche parziale, senza autorizzazione scritta.
      </p>

      <h2>4. Marchi e immagini di terzi</h2>
      <p>
        I marchi dei produttori citati (a titolo esemplificativo: La Nordica-Extraflame,
        Veneta Cucine, Bosch, Siemens, Whirlpool, Miele, Electrolux, Samsung e gli altri
        richiamati nel sito) appartengono ai rispettivi titolari. Sono utilizzati in
        funzione meramente descrittiva, per indicare la destinazione e la provenienza
        dei prodotti trattati, ai sensi dell’art. 21 del Codice della Proprietà
        Industriale. Nessuna forma di sponsorizzazione, affiliazione o partnership è
        implicita.
      </p>
      <p>
        Le immagini di prodotto possono provenire dai cataloghi ufficiali dei
        produttori e restano di proprietà degli stessi. Chi ritenga che un contenuto
        pubblicato leda un proprio diritto può segnalarlo a{" "}
        <a href={`mailto:${s.email}`}>{s.email}</a>: provvederemo tempestivamente alla
        verifica e all’eventuale rimozione.
      </p>

      <h2>5. Limitazione di responsabilità</h2>
      <p>
        Curiamo i contenuti con la massima attenzione, ma non garantiamo che siano privi
        di errori o sempre aggiornati; refusi ed errori materiali non sono vincolanti.
        Non rispondiamo dei contenuti dei siti di terzi raggiungibili tramite
        collegamenti presenti in queste pagine.
      </p>

      <h2>6. Legge applicabile e foro</h2>
      <p>
        Il rapporto è regolato dalla legge italiana. Per le controversie con i
        consumatori è competente il foro di residenza o domicilio elettivo del
        consumatore, ai sensi dell’art. 66-bis del Codice del Consumo; negli altri casi
        è competente il Foro di Varese.
      </p>

      <h2>7. Privacy e cookie</h2>
      <p>
        Vedi la <Link href="/privacy">Privacy Policy</Link> e la{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
    </LegalPage>
  );
}
