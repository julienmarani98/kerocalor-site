/** Helper per costruire link WhatsApp/email da impostazioni editabili. */
export function waUrl(whatsappHref: string, text?: string): string {
  const base = `https://wa.me/${whatsappHref}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
export function mailUrl(email: string, subject?: string): string {
  const base = `mailto:${email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
export function telHref(phoneHref: string): string {
  return `tel:${phoneHref}`;
}
