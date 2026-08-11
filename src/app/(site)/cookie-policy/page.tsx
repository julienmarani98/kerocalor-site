import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/lib/site-config";
import { getSettings } from "@/lib/store";

export const metadata = {
  title: "Cookie Policy — Kerocalor",
  description:
    "Quali cookie utilizza il sito Kerocalor: solo cookie tecnici, nessuna profilazione. Mappa Google caricata solo su richiesta dell'utente.",
};

export default async function CookiePolicy() {
  const s = await getSettings();
  return (
    <LegalPage title="Cookie Policy" updated="agosto 2026">
      <p>
        Informativa resa ai sensi dell’art. 122 del D.Lgs. 196/2003 e delle Linee
        guida del Garante privacy del 10 giugno 2021.
      </p>

      <h2>1. In breve</h2>
      <p>
        Questo sito <strong>non utilizza cookie di profilazione</strong>, non ospita
        strumenti di analytics, pixel pubblicitari o widget social. Per questo motivo
        non viene mostrato alcun banner di consenso: non ce n’è bisogno.
      </p>

      <h2>2. Cookie utilizzati</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Finalità</th>
            <th>Durata</th>
            <th>Consenso</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>kc_admin</code></td>
            <td>Tecnico, di prima parte</td>
            <td>
              Mantiene la sessione autenticata nell’area riservata di gestione dei
              contenuti. Viene impostato solo dopo un accesso riuscito da parte del
              personale: chi visita il sito non lo riceve mai.
            </td>
            <td>7 giorni</td>
            <td>Non richiesto (art. 122 co.1)</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Risorse di terze parti</h2>
      <p>
        Le pagine non caricano automaticamente risorse esterne: i caratteri tipografici
        sono ospitati sul nostro server e tutte le immagini sono locali.
      </p>
      <h3>Mappa Google (pagina Contatti)</h3>
      <p>
        Nella pagina <Link href="/contatti">Contatti</Link> la mappa <strong>non</strong>{" "}
        viene caricata da sola: al suo posto trovi un riquadro con un pulsante. Solo
        se premi “Carica la mappa” il browser contatta Google, comunicando indirizzo
        IP, informazioni sul dispositivo e potenzialmente ricevendo cookie di Google
        LLC / Google Ireland Ltd., titolare autonomo del trattamento. Puoi sempre
        evitarlo e usare i pulsanti “Apri nel navigatore”, che si limitano ad aprire
        un’applicazione esterna dopo un tuo click. Informativa Google:{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          policies.google.com/privacy
        </a>
        .
      </p>
      <h3>WhatsApp, telefono ed email</h3>
      <p>
        I pulsanti WhatsApp, “Chiama” ed “Email” sono semplici collegamenti: nessuna
        richiesta parte prima del tuo click. Aprendo WhatsApp la conversazione è
        soggetta alle condizioni di WhatsApp Ireland Ltd.
      </p>

      <h2>4. Gestione dei cookie dal browser</h2>
      <p>
        Puoi bloccare o cancellare i cookie dalle impostazioni del tuo browser
        (Chrome, Firefox, Safari, Edge, sezione “Privacy e sicurezza”). Bloccare il
        cookie tecnico impedisce l’accesso all’area riservata, ma non pregiudica la
        consultazione del sito.
      </p>

      <h2>5. Titolare</h2>
      <p>
        {legal.company} — {legal.address}, {legal.city} — P.IVA/C.F. {legal.vat} —{" "}
        <a href={`mailto:${s.email}`}>{s.email}</a>. Maggiori informazioni nella{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
