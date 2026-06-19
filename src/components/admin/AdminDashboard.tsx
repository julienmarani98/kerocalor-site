"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { StoredProduct, Settings, SoulKey } from "@/lib/store";

export interface CategoryOption {
  soul: SoulKey;
  slug: string;
  name: string;
}

interface Props {
  initialProducts: StoredProduct[];
  initialSettings: Settings;
  categories: CategoryOption[];
}

const EMPTY = {
  id: "",
  name: "",
  brand: "",
  category: "",
  price: "",
  image: "",
  featured: false,
};

export default function AdminDashboard({ initialProducts, initialSettings, categories }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [settings, setSettings] = useState(initialSettings);
  const [form, setForm] = useState({ ...EMPTY });
  const [format, setFormat] = useState<"square" | "wide" | "portrait">("square");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const editing = Boolean(form.id);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("format", format);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Upload fallito");
      setForm((f) => ({ ...f, image: d.url }));
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Errore upload");
    } finally {
      setUploading(false);
    }
  }

  async function submitProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.category) {
      setMsg("Nome e categoria obbligatori");
      return;
    }
    setSaving(true);
    setMsg("");
    const soul = categories.find((c) => c.slug === form.category)?.soul ?? "stufe";
    const payload = {
      name: form.name,
      brand: form.brand || undefined,
      category: form.category,
      soul,
      price: form.price === "" ? undefined : Number(form.price),
      image: form.image || undefined,
      featured: form.featured,
    };
    try {
      const url = editing ? `/api/admin/products/${form.id}` : "/api/admin/products";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Errore salvataggio");
      setProducts((prev) =>
        editing ? prev.map((p) => (p.id === d.product.id ? d.product : p)) : [d.product, ...prev]
      );
      setForm({ ...EMPTY });
      if (fileRef.current) fileRef.current.value = "";
      setMsg(editing ? "Prodotto aggiornato" : "Prodotto aggiunto");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Errore");
    } finally {
      setSaving(false);
    }
  }

  function editProduct(p: StoredProduct) {
    setForm({
      id: p.id,
      name: p.name,
      brand: p.brand || "",
      category: p.category,
      price: p.price?.toString() || "",
      image: p.image || "",
      featured: Boolean(p.featured),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeProduct(id: string) {
    if (!confirm("Eliminare questo prodotto?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Errore");
      setSettings(d.settings);
      setMsg("Contatti salvati");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Errore");
    } finally {
      setSaving(false);
    }
  }

  const input = "w-full rounded-none border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-carbon";
  const label = "block text-[11px] font-medium uppercase tracking-[0.12em] text-steel";

  return (
    <div className="min-h-screen bg-ash text-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-carbon px-5 py-3 text-white sm:px-8">
        <div className="flex items-baseline gap-3">
          <span className="text-lg font-extrabold uppercase tracking-[0.02em]">
            Kero<span className="text-ember">calor</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-[12px] text-white/70 hover:text-white">Vedi sito ↗</a>
          <button onClick={logout} className="btn-ghost-white !px-4 !py-2 !text-[11px]">Esci</button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        {msg && (
          <div className="mb-6 border border-line bg-white px-4 py-3 text-sm text-ink">{msg}</div>
        )}

        {/* ADD / EDIT PRODUCT */}
        <section className="border border-line bg-white p-5 sm:p-7">
          <h2 className="text-lg font-extrabold uppercase tracking-[0.04em]">
            {editing ? "Modifica prodotto" : "Aggiungi prodotto"}
          </h2>
          <form onSubmit={submitProduct} className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Nome *</label>
              <input className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Es. Stufa Larissa" />
            </div>
            <div>
              <label className={label}>Marca</label>
              <input className={input} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Es. La Nordica" />
            </div>
            <div>
              <label className={label}>Categoria *</label>
              <select className={input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">— scegli —</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Prezzo € (opzionale)</label>
              <input className={input} type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="1490" />
            </div>

            {/* Upload foto */}
            <div className="sm:col-span-2">
              <label className={label}>Fotografia (formato fisso automatico)</label>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <select className={`${input} max-w-[200px]`} value={format} onChange={(e) => setFormat(e.target.value as "square" | "wide" | "portrait")}>
                  <option value="square">Prodotto 1:1 (1200×1200)</option>
                  <option value="portrait">Verticale 3:4 (900×1200)</option>
                  <option value="wide">Banner 16:9 (1600×900)</option>
                </select>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                  className="text-sm"
                />
                {uploading && <span className="text-sm text-steel">Elaborazione…</span>}
              </div>
              {form.image && (
                <div className="mt-3 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image} alt="anteprima" className="h-20 w-20 border border-line object-cover" />
                  <button type="button" onClick={() => setForm({ ...form, image: "" })} className="text-[12px] text-steel underline">Rimuovi foto</button>
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm sm:col-span-2">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Mostra in <strong>evidenza</strong> in home
            </label>

            <div className="flex gap-3 sm:col-span-2">
              <button type="submit" disabled={saving || uploading} className="btn-dark disabled:opacity-50">
                {editing ? "Salva modifiche" : "Aggiungi prodotto"}
              </button>
              {editing && (
                <button type="button" onClick={() => { setForm({ ...EMPTY }); if (fileRef.current) fileRef.current.value = ""; }} className="btn-light">
                  Annulla
                </button>
              )}
            </div>
          </form>
        </section>

        {/* PRODUCTS LIST */}
        <section className="mt-10">
          <h2 className="text-lg font-extrabold uppercase tracking-[0.04em]">
            Prodotti <span className="text-steel">({products.length})</span>
          </h2>
          <div className="mt-4 divide-y divide-line border border-line bg-white">
            {products.length === 0 && <p className="p-6 text-sm text-steel">Nessun prodotto.</p>}
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-4 p-3 sm:p-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden border border-line bg-ink">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[9px] uppercase text-white/40">no foto</div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{p.name}{p.featured && <span className="ml-2 bg-ember px-1.5 py-0.5 text-[9px] uppercase text-white">Evidenza</span>}</p>
                  <p className="truncate text-[12px] text-steel">{p.brand ? `${p.brand} · ` : ""}{p.category}{typeof p.price === "number" ? ` · € ${p.price.toLocaleString("it-IT")}` : ""}</p>
                </div>
                <button onClick={() => editProduct(p)} className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink hover:text-ember">Modifica</button>
                <button onClick={() => removeProduct(p.id)} className="text-[12px] font-medium uppercase tracking-[0.08em] text-ember hover:underline">Elimina</button>
              </div>
            ))}
          </div>
        </section>

        {/* SETTINGS / CONTATTI */}
        <section className="mt-12 border border-line bg-white p-5 sm:p-7">
          <h2 className="text-lg font-extrabold uppercase tracking-[0.04em]">Contatti del sito</h2>
          <p className="mt-1 text-sm text-steel">Modificabili senza toccare il codice. WhatsApp/telefono in formato internazionale senza “+”.</p>
          <form onSubmit={saveSettings} className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Telefono (visualizzato)" v={settings.phone} on={(v) => setSettings({ ...settings, phone: v })} cls={input} lcls={label} />
            <Field label="Telefono link (es. +390331903349)" v={settings.phoneHref} on={(v) => setSettings({ ...settings, phoneHref: v })} cls={input} lcls={label} />
            <Field label="WhatsApp (visualizzato)" v={settings.whatsapp} on={(v) => setSettings({ ...settings, whatsapp: v })} cls={input} lcls={label} />
            <Field label="WhatsApp link (es. 393393369895)" v={settings.whatsappHref} on={(v) => setSettings({ ...settings, whatsappHref: v })} cls={input} lcls={label} />
            <Field label="Email" v={settings.email} on={(v) => setSettings({ ...settings, email: v })} cls={input} lcls={label} />
            <Field label="Indirizzo" v={settings.address} on={(v) => setSettings({ ...settings, address: v })} cls={input} lcls={label} />
            <Field label="Città / CAP" v={settings.city} on={(v) => setSettings({ ...settings, city: v })} cls={input} lcls={label} />
            <div className="sm:col-span-2">
              <button type="submit" disabled={saving} className="btn-dark disabled:opacity-50">Salva contatti</button>
            </div>
          </form>
        </section>

        <p className="mt-10 text-[11px] uppercase tracking-[0.12em] text-steel">
          Le modifiche sono subito online sul sito pubblico.
        </p>
      </div>
    </div>
  );
}

function Field({ label, v, on, cls, lcls }: { label: string; v: string; on: (v: string) => void; cls: string; lcls: string }) {
  return (
    <div>
      <label className={lcls}>{label}</label>
      <input className={cls} value={v} onChange={(e) => on(e.target.value)} />
    </div>
  );
}
