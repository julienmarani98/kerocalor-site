import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getProducts, getSettings } from "@/lib/store";
import { souls, elettrodomestici } from "@/lib/site-config";
import AdminDashboard, { CategoryOption } from "@/components/admin/AdminDashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = { title: "Admin — Kerocalor" };

function categoryOptions(): CategoryOption[] {
  const opts: CategoryOption[] = [];
  for (const c of souls.stufe.categories) opts.push({ soul: "stufe", slug: c.slug, name: `Riscaldamento › ${c.name}` });
  for (const c of souls.arredamento.categories) opts.push({ soul: "arredamento", slug: c.slug, name: `Arredamento › ${c.name}` });
  for (const g of elettrodomestici.groups) opts.push({ soul: "elettrodomestici", slug: g.slug, name: `Elettrodomestici › ${g.name}` });
  return opts;
}

export default async function AdminPage() {
  if (!isAuthed()) redirect("/admin/login");
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);
  return <AdminDashboard initialProducts={products} initialSettings={settings} categories={categoryOptions()} />;
}
