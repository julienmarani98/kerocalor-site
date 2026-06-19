import { contacts, waLink, mailLink } from "@/lib/site-config";

export default function ContactCTA({
  title = "Come si acquista? Si parla con noi.",
  text = "Nessun carrello: ogni articolo si richiede direttamente. Scrivici su WhatsApp o via email, oppure vieni in showroom a Mornago.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-carbon text-white">
      <div className="container-site flex flex-col items-start gap-8 py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="kicker text-ember">Contatto diretto</p>
          <h2 className="h-section mt-4">{title}</h2>
          <p className="mt-5 max-w-xl text-white/65">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a href={waLink("Salve, vorrei un'informazione.")} target="_blank" rel="noopener" className="btn-wa">
            WhatsApp {contacts.whatsapp}
          </a>
          <a href={`tel:${contacts.phoneHref}`} className="btn-ghost-white">
            Chiama {contacts.phone}
          </a>
          <a href={mailLink("Richiesta informazioni")} className="btn-ghost-white">
            {contacts.email}
          </a>
        </div>
      </div>
    </section>
  );
}
