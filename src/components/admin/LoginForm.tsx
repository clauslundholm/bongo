"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function LoginForm() {
  const search = useSearchParams();
  const forbidden = search.get("error") === "forbidden";
  const forbiddenEmail = search.get("email") ?? "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        const msg = /confirm/i.test(error.message)
          ? "Brugeren er ikke bekræftet. Slå 'Auto Confirm' til i Supabase → Authentication → Users."
          : /invalid/i.test(error.message)
          ? "Forkert email eller adgangskode."
          : error.message;
        setError(msg);
        setPending(false);
        return;
      }
      // Hard navigation guarantees the new session cookie is sent to the server.
      window.location.assign("/admin");
    } catch {
      setError("Kunne ikke logge ind.");
      setPending(false);
    }
  }

  async function signOutAndRetry() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    window.location.assign("/admin/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="pp-card w-full max-w-md p-8">
        <Link href="/da" className="text-sm font-medium text-admin-muted hover:text-admin-ink">
          ← Bongo&apos;s Bingo
        </Link>
        <div className="mt-4 flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-admin-yellow text-admin-ink">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h3l2-6 4 13 3-9 2 2h4" />
            </svg>
          </span>
          <h1 className="text-2xl font-bold text-admin-ink">Bongo Admin</h1>
        </div>

        {forbidden && (
          <div className="mt-6 rounded-xl border border-admin-line bg-admin-peach p-4 text-sm text-admin-peach-text">
            <p>
              {forbiddenEmail ? <strong>{forbiddenEmail}</strong> : "Din bruger"} er logget ind, men er ikke på
              admin-listen. Tilføj emailen til <code className="rounded bg-white/60 px-1">ADMIN_EMAILS</code> og genstart serveren.
            </p>
            <button onClick={signOutAndRetry} className="pp-btn-ghost mt-3 px-3 py-1.5 text-xs">
              Log ud og prøv en anden konto
            </button>
          </div>
        )}

        {!isSupabaseConfigured ? (
          <p className="mt-6 rounded-xl border border-admin-line bg-admin-yellow-soft p-4 text-sm text-admin-yellow-text">
            Supabase er ikke konfigureret endnu. Tilføj miljøvariabler i <code>.env.local</code> og genstart.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-admin-ink">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pp-input mt-1.5 py-3"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-admin-ink">Adgangskode</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pp-input mt-1.5 py-3"
              />
            </label>
            {error && <p className="text-sm text-admin-peach-text">⚠️ {error}</p>}
            <button type="submit" disabled={pending} className="pp-btn-dark w-full py-3 text-base">
              {pending ? "…" : "Log ind"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
