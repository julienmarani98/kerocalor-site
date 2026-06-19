import { hours, contacts as brand } from "@/lib/site-config";
import { getSettings } from "@/lib/store";
import { waUrl, mailUrl, telHref } from "@/lib/links";

export const metadata = {
  title: "Contatti — Kerocalor Mornago (VA)",
  description:
    "Vieni a trovarci a Mornago (VA), Via Stazione 115. Telefono, WhatsApp ed email. Lun–Sab 8:30–12:00 / 14:30–19:00.",
};

export default async function Contatti() {
  const s = await getSettings();
  const map = `https://www.google.com/maps?q=${encodeURIComponent(brand.mapsQuery)}&output=embed`;
  return (
    <>
      <section className="border-b border-line bg-ash">
        <div className="container-site py-12 sm:py-16 lg:py-20">
          <p className="kicker text-ember">Contatti</p>
          <h1 className="h-display mt-5">Parliamone.</h1>
          <p className="mt-5 max-w-xl text-base text-ink/75 sm:text-lg">
            Da noi non c’è il carrello: ogni articolo si richiede direttamente.
            Scrivici, chiamaci o vieni in showroom.
          </p>
        </div>
      </section>

      <section className="container-site grid gap-px border border-line bg-line py-0 md:grid-cols-2">
        <div className="bg-ash p-8 sm:p-10 lg:p-14">
          <h2 className="kicker text-steel">Dove siamo</h2>
          <p className="mt-4 text-lg font-extrabold uppercase tracking-wider2 text-ink sm:text-xl">
            {s.address}
          </p>
          <p className="text-ink/80">{s.city}</p>
          <p className="mt-2 text-sm text-steel">{brand.showroom}</p>

          <h2 className="kicker mt-10 text-steel">Orari</h2>
          <table className="mt-4 text-sm text-ink/85">
            <tbody>
              <tr>
                <td className="pr-8 font-bold">{hours.weekdays}</td>
                <td>{hours.morning} · {hours.afternoon}</td>
              </tr>
              <tr>
                <td className="pr-8 font-bold">Domenica</td>
                <td className="text-steel">Chiuso</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={waUrl(s.whatsappHref, "Salve, vorrei un'informazione.")} target="_blank" rel="noopener" className="btn-wa">
              WhatsApp
            </a>
            <a href={telHref(s.phoneHref)} className="btn-light">Chiama</a>
            <a href={mailUrl(s.email, "Richiesta informazioni")} className="btn-light">Email</a>
          </div>
        </div>

        <div className="min-h-[320px] bg-ink md:min-h-[360px]">
          <iframe
            title="Mappa Kerocalor"
            src={map}
            className="h-full min-h-[320px] w-full md:min-h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <div className="h-16 sm:h-20" />
    </>
  );
}
