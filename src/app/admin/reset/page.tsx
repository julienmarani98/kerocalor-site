"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPage() {
  return (
    <Suspense fallback={null}>
      <ResetForm />
    </Suspense>
  );
}

function ResetForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (pw !== pw2) {
      setErr("Le due password non coincidono");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: pw }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || "Errore");
      setDone(true);
      setTimeout(() => router.replace("/admin/login"), 2500);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Errore");
    } finally {
      setLoading(false);
    }
  }

  const input =
    "mt-2 w-full rounded-none border border-white/20 bg-transparent px-4 py-3 text-sm text-white outline-none focus:border-white";
  const label = "mt-6 block text-[11px] uppercase tracking-[0.14em] text-white/50";

  return (
    <div className="flex min-h-screen items-center justify-center bg-carbon px-5 text-white">
      <form onSubmit={submit} className="w-full max-w-sm">
        <div className="text-2xl font-extrabold uppercase tracking-[0.02em]">
          Kero<span className="text-ember">calor</span>
        </div>
        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">Nuova password</p>

        {!token ? (
          <p className="mt-10 text-sm text-white/70">
            Link non valido. Torna al{" "}
            <a href="/admin/login" className="underline">login</a> e richiedi un nuovo reset.
          </p>
        ) : done ? (
          <p className="mt-10 text-sm text-white/80">Password aggiornata. Ti porto al login…</p>
        ) : (
          <>
            <label className={label}>Nuova password (min. 10 caratteri)</label>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus className={input} />
            <label className={label}>Ripeti password</label>
            <input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} className={input} />
            {err && <p className="mt-3 text-sm text-ember">{err}</p>}
            <button type="submit" disabled={loading} className="btn-wa mt-6 w-full disabled:opacity-50">
              {loading ? "Salvataggio…" : "Imposta password"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
