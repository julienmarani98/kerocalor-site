"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        router.replace("/admin");
        router.refresh();
      } else {
        const d = await res.json().catch(() => ({}));
        setErr(d.error || "Accesso negato");
      }
    } catch {
      setErr("Errore di rete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-carbon px-5 text-white">
      <form onSubmit={submit} className="w-full max-w-sm">
        <div className="text-2xl font-extrabold uppercase tracking-[0.02em]">
          Kero<span className="text-ember">calor</span>
        </div>
        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/40">Area riservata</p>

        <label className="mt-10 block text-[11px] uppercase tracking-[0.14em] text-white/50">Password</label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          className="mt-2 w-full rounded-none border border-white/20 bg-transparent px-4 py-3 text-sm text-white outline-none focus:border-white"
          placeholder="••••••••"
        />
        {err && <p className="mt-3 text-sm text-ember">{err}</p>}
        <button type="submit" disabled={loading} className="btn-wa mt-6 w-full disabled:opacity-50">
          {loading ? "Accesso…" : "Entra"}
        </button>
      </form>
    </div>
  );
}
