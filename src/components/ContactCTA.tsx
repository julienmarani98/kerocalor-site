import { getSettings } from "@/lib/store";
import { waUrl, mailUrl, telHref } from "@/lib/links";
import { PhoneIcon, WhatsAppIcon, MailIcon } from "@/components/icons";

export default async function ContactCTA({
  title = "Come si acquista? Si parla con noi.",
  text = "Nessun carrello: ogni articolo si richiede direttamente. Scrivici su WhatsApp o via email, oppure vieni in showroom a Mornago.",
}: {
  title?: string;
  text?: string;
}) {
  const s = await getSettings();
  return (
    <section className="bg-carbon text-white">
      <div className="container-site flex flex-col items-start gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl" data-reveal>
          <p className="kicker text-ember">Contatto diretto</p>
          <h2 className="h-section mt-4">{title}</h2>
          <p className="mt-5 max-w-xl text-white/65">{text}</p>
        </div>
        <div
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <a href={waUrl(s.whatsappHref, "Salve, vorrei un'informazione.")} target="_blank" rel="noopener" className="btn-wa">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp {s.whatsapp}
          </a>
          <a href={telHref(s.phoneHref)} className="btn-ghost-white">
            <PhoneIcon className="h-4 w-4" /> Chiama {s.phone}
          </a>
          <a href={mailUrl(s.email, "Richiesta informazioni")} className="btn-ghost-white">
            <MailIcon className="h-4 w-4" /> {s.email}
          </a>
        </div>
      </div>
    </section>
  );
}
