import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getProducts, getSettings, getSmtpConfig } from "@/lib/store";
import { RESET_EMAIL_TO } from "@/lib/mailer";
import { souls, elettrodomestici } from "@/lib/site-config";
import AdminDashboard, { CategoryOption, SmtpView } from "@/components/admin/AdminDashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = { title: "Admin — Kerocalor" };

function categoryOptions(): CategoryOption[] {
  const opts: CategoryOption[] = [];
  for (const c of souls.stufe.categories) opts.push({ soul: "stufe", slug: c.slug, name: `Riscaldamento › ${c.name}` });
  for (const c of souls.arredamento.categories) opts.push({ soul: "arredamento", slug: c.slug, name: `Arredamento › ${c.name}` });
  for (const c of souls.complementi.categories) opts.push({ soul: "complementi", slug: c.slug, name: `Complementi d’Arredo › ${c.name}` });
  for (const g of elettrodomestici.groups) opts.push({ soul: "elettrodomestici", slug: g.slug, name: `Elettrodomestici › ${g.name}` });
  return opts;
}

/** Vista SMTP per il client: mai la password. */
async function smtpView(): Promise<SmtpView> {
  const c = await getSmtpConfig();
  return {
    host: c?.host ?? "",
    port: c?.port ?? 465,
    secure: c?.secure ?? true,
    user: c?.user ?? "",
    from: c?.from ?? "",
    hasPass: Boolean(c?.pass),
    configured: c !== null,
    resetTo: RESET_EMAIL_TO,
  };
}

export default async function AdminPage() {
  if (!(await isAuthed())) redirect("/admin/login");
  const [products, settings, smtp] = await Promise.all([getProducts(), getSettings(), smtpView()]);
  return <AdminDashboard initialProducts={products} initialSettings={settings} categories={categoryOptions()} initialSmtp={smtp} />;
}
