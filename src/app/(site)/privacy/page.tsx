import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/lib/site-config";
import { getSettings } from "@/lib/store";

export const metadata = {
  title: "Privacy Policy — Kerocalor",
  description:
    "Informativa sul trattamento dei dati personali ai sensi degli artt. 13-14 del Regolamento UE 2016/679 (GDPR).",
  robots: { index: true, follow: true },
};

export default async function Privacy() {
  const s = await getSettings();
  return (
    <LegalPage title="Privacy Policy" updated="agosto 2026">
      <p className="todo">
        <strong>Bozza da validare.</strong> I punti contrassegnati con
        [DA COMPLETARE] richiedono dati che deve fornire {legal.company}. Far
        verificare il testo definitivo a un consulente legale prima della
        pubblicazione sul dominio definitivo.
      </p>

      <p>
        La presente informativa è resa ai sensi degli artt. 13 e 14 del Regolamento
        (UE) 2016/679 (“GDPR”) a chi consulta questo sito e a chi ci contatta.
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        {legal.company} — {legal.address}, {legal.city} — P.IVA/C.F. {legal.vat}.
        <br />
        Telefono {s.phone} · Email{" "}
        <a href={`mailto:${s.email}`}>{s.email}</a>
        {legal.pec ? <> · PEC {legal.pec}</> : <> · PEC [DA COMPLETARE]</>}.
        <br />
        Legale rappresentante / referente privacy: [DA COMPLETARE].
      </p>
      <p>
        Non è stato nominato un Responsabile della protezione dei dati (DPO), non
        ricorrendone i presupposti di cui all’art. 37 GDPR.
      </p>

      <h2>2. Dati trattati e finalità</h2>
      <table>
        <thead>
          <tr>
            <th>Dati</th>
            <th>Finalità</th>
            <th>Base giuridica</th>
            <th>Conservazione</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dati di navigazione (indirizzo IP, data/ora, pagina richiesta, user agent) registrati nei log del server web</td>
            <td>Erogazione del sito, sicurezza informatica, diagnosi malfunzionamenti</td>
            <td>Legittimo interesse (art. 6.1.f) alla sicurezza e al corretto funzionamento</td>
            <td>[DA COMPLETARE — indicativamente 7-30 giorni]</td>
          </tr>
          <tr>
            <td>Dati che ci comunichi contattandoci via email, telefono o WhatsApp (nome, recapiti, contenuto della richiesta)</td>
            <td>Rispondere alla richiesta, formulare preventivi, organizzare sopralluoghi</td>
            <td>Misure precontrattuali su richiesta dell’interessato (art. 6.1.b)</td>
            <td>[DA COMPLETARE — es. 24 mesi dall’ultimo contatto, salvo obblighi fiscali]</td>
          </tr>
          <tr>
            <td>Credenziali di accesso all’area riservata di gestione del sito</td>
            <td>Amministrazione dei contenuti da parte del personale incaricato</td>
            <td>Legittimo interesse (art. 6.1.f) alla gestione del sito</td>
            <td>Durata del rapporto</td>
          </tr>
        </tbody>
      </table>
      <p>
        Il sito <strong>non ospita form di contatto</strong>, non effettua profilazione
        né decisioni automatizzate, non utilizza strumenti di analytics o di marketing.
      </p>

      <h2>3. Natura del conferimento</h2>
      <p>
        Il conferimento dei dati di navigazione è tecnicamente necessario alla
        consultazione del sito. Il conferimento dei dati di contatto è libero: senza
        di essi, però, non è possibile dare seguito alla richiesta.
      </p>

      <h2>4. Destinatari</h2>
      <ul>
        <li>
          Fornitore di hosting e infrastruttura, nominato responsabile del trattamento
          ex art. 28 GDPR: [DA COMPLETARE — denominazione del provider e ubicazione dei server].
        </li>
        <li>
          Fornitore del servizio di posta elettronica utilizzato per rispondere alle
          richieste: [DA COMPLETARE].
        </li>
        <li>
          Se ci contatti via WhatsApp, la conversazione transita per i sistemi di
          WhatsApp Ireland Ltd. (gruppo Meta), titolare autonomo del trattamento
          secondo le proprie condizioni. Per evitarlo puoi scriverci via email o
          telefonarci.
        </li>
        <li>
          Consulenti, professionisti e autorità nei casi previsti dalla legge.
        </li>
      </ul>
      <p>I dati non sono diffusi né ceduti a terzi per finalità commerciali.</p>

      <h2>5. Trasferimenti extra-UE</h2>
      <p>
        Il sito non trasferisce di per sé dati fuori dallo Spazio Economico Europeo. Il
        trasferimento può avvenire se scegli di attivare la mappa di Google nella
        pagina Contatti (vedi{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>) o se ci contatti via
        WhatsApp: in tali casi i rispettivi titolari operano sulla base delle proprie
        garanzie (clausole contrattuali standard, EU-US Data Privacy Framework).
      </p>

      <h2>6. Cookie</h2>
      <p>
        Il sito utilizza esclusivamente un cookie tecnico per l’area riservata di
        gestione, esente da consenso. Nessun cookie di profilazione. Dettagli nella{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>7. Diritti dell’interessato</h2>
      <p>
        Puoi esercitare in qualsiasi momento i diritti di cui agli artt. 15-22 GDPR
        (accesso, rettifica, cancellazione, limitazione, portabilità, opposizione)
        scrivendo a <a href={`mailto:${s.email}`}>{s.email}</a>. Hai inoltre diritto
        di proporre reclamo al Garante per la protezione dei dati personali
        (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>).
      </p>

      <h2>8. Modifiche</h2>
      <p>
        Questa informativa può essere aggiornata: la data in testa alla pagina indica
        l’ultima revisione.
      </p>
    </LegalPage>
  );
}
