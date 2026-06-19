/**
 * Configurazione centrale del sito KeroCalor.
 * I campi "contatti" qui sono il default: in seguito saranno sovrascrivibili
 * dall'admin (DB) senza toccare il codice — vedi sezione admin (fase 2).
 */

export const contacts = {
  company: "Kerocalor S.r.l.",
  since: 1969,
  phone: "0331 903349",
  phoneHref: "+390331903349",
  whatsapp: "339 336 9895",
  whatsappHref: "393393369895", // formato internazionale per wa.me (senza +)
  email: "info@kerocalor.it",
  address: "Via Stazione, 115",
  city: "21020 Mornago (VA)",
  showroom: "3.000 mq di esposizione · parcheggio illimitato",
  mapsQuery: "Kerocalor, Via Stazione 115, Mornago VA",
};

export const hours = {
  weekdays: "Lun – Sab",
  morning: "8:30 – 12:00",
  afternoon: "14:30 – 19:00",
  closed: "Domenica chiuso",
};

export type Soul = "stufe" | "arredamento";

export interface Category {
  slug: string;
  name: string;
  blurb: string;
}

/** Le due anime dell'azienda + tassonomia (recuperata dal vecchio sito). */
export const souls: Record<
  Soul,
  { title: string; tagline: string; categories: Category[] }
> = {
  stufe: {
    title: "Riscaldamento",
    tagline: "Stufe, caminetti e calore dal 1969",
    categories: [
      { slug: "stufe-a-legna", name: "Stufe a Legna", blurb: "Il fuoco classico, tecnologia di oggi." },
      { slug: "stufe-a-pellet", name: "Stufe a Pellet", blurb: "Autonomia e comodità, calore costante." },
      { slug: "termostufe", name: "Termostufe", blurb: "Riscaldano la casa e l'acqua." },
      { slug: "caldaie", name: "Caldaie", blurb: "Soluzioni per l'intero impianto." },
      { slug: "caminetti", name: "Caminetti", blurb: "Inserti e focolari su misura." },
      { slug: "fumisteria", name: "Fumisteria", blurb: "Canne fumarie e accessori a norma." },
      { slug: "biomassa", name: "Prodotti a Biomassa", blurb: "Energia sostenibile." },
    ],
  },
  arredamento: {
    title: "Arredamento",
    tagline: "Cucine, living e camere per la tua casa",
    categories: [
      { slug: "cucine", name: "Cucine", blurb: "Componibili, moderne e classiche." },
      { slug: "soggiorni", name: "Soggiorni", blurb: "Mobili giorno e pareti attrezzate." },
      { slug: "salotti", name: "Salotti & Divani", blurb: "Comfort e design per il living." },
      { slug: "camere", name: "Camere", blurb: "Notte, armadi e cabine." },
      { slug: "camerette", name: "Camerette", blurb: "Spazi su misura per i ragazzi." },
      { slug: "arredo-bagno", name: "Arredo Bagno", blurb: "Composizioni complete." },
    ],
  },
};

/** Terza area: elettrodomestici (sezione separata, fase 2). */
export const elettrodomestici = {
  title: "Elettrodomestici",
  tagline: "Incasso e libera installazione, le migliori marche",
  groups: [
    { slug: "incasso", name: "Incasso" },
    { slug: "libera-installazione", name: "Libera Installazione" },
  ],
};

export const nav = [
  { href: "/stufe", label: "Riscaldamento" },
  { href: "/arredamento", label: "Arredamento" },
  { href: "/elettrodomestici", label: "Elettrodomestici" },
  { href: "/ricambi", label: "Ricambi" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/contatti", label: "Contatti" },
];

export function waLink(text?: string) {
  const base = `https://wa.me/${contacts.whatsappHref}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailLink(subject?: string) {
  const base = `mailto:${contacts.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
