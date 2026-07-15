import Link from "next/link";
import { hours, nav } from "@/lib/site-config";
import { waUrl, mailUrl, telHref } from "@/lib/links";
import type { Settings } from "@/lib/store";
import Logo from "@/components/Logo";

export default function Footer({ settings }: { settings: Settings }) {
  const contacts = settings;
  return (
    <footer className="bg-carbon text-white">
      <div className="container-site grid gap-x-8 gap-y-12 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo className="h-14 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            Riscaldamento e arredamento dal 1969. 3.000 mq di esposizione a
            Mornago, in provincia di Varese.
          </p>
        </div>

        <div>
          <h3 className="kicker text-white/50">Sezioni</h3>
          <ul className="mt-4 space-y-2">
            {nav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="text-sm font-semibold text-white/80 transition-colors hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="kicker text-white/50">Contatti</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{contacts.address}</li>
            <li>{contacts.city}</li>
            <li>
              <a href={telHref(contacts.phoneHref)} className="hover:text-white">Tel. {contacts.phone}</a>
            </li>
            <li>
              <a href={waUrl(contacts.whatsappHref)} target="_blank" rel="noopener" className="hover:text-white">WhatsApp {contacts.whatsapp}</a>
            </li>
            <li>
              <a href={mailUrl(contacts.email)} className="hover:text-white">{contacts.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="kicker text-white/50">Orari</h3>
          <ul className="mt-4 space-y-1 text-sm text-white/80">
            <li className="font-bold text-white">{hours.weekdays}</li>
            <li>{hours.morning}</li>
            <li>{hours.afternoon}</li>
            <li className="pt-2 text-white/55">{hours.closed}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-[11px] uppercase tracking-wider2 text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Kerocalor S.r.l. · P.IVA —</span>
          <span>Mornago (VA) · Italia</span>
        </div>
      </div>
    </footer>
  );
}
