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
      <div className="w-full max-w-md rounded-3xl border-4 border-bongo-black bg-white p-8 shadow-pop">
        <Link href="/da" className="font-display text-sm uppercase text-bongo-pink hover:underline">
          ← Bongo&apos;s Bingo
        </Link>
        <h1 className="mt-3 font-display text-4xl uppercase text-bongo-black">Admin login</h1>

        {forbidden && (
          <div className="mt-6 rounded-2xl border-2 border-bongo-black bg-bongo-pink p-4 font-body text-sm text-white">
            <p>
              {forbiddenEmail ? <strong>{forbiddenEmail}</strong> : "Din bruger"} er logget ind, men er ikke på
              admin-listen. Tilføj emailen til <code>ADMIN_EMAILS</code> i <code>.env.local</code> og genstart serveren.
            </p>
            <button onClick={signOutAndRetry} className="mt-3 rounded-lg border-2 border-bongo-black bg-white px-3 py-1 font-display text-xs uppercase text-bongo-black">
              Log ud og prøv en anden konto
            </button>
          </div>
        )}

        {!isSupabaseConfigured ? (
          <p className="mt-6 rounded-2xl border-2 border-bongo-black bg-bongo-yellow p-4 font-body text-sm">
            Supabase er ikke konfigureret endnu. Tilføj miljøvariabler i <code>.env.local</code> og genstart.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="font-display text-sm uppercase">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-2xl border-4 border-bongo-black px-4 py-3 outline-none focus:ring-4 focus:ring-bongo-pink"
              />
            </label>
            <label className="block">
              <span className="font-display text-sm uppercase">Adgangskode</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-2xl border-4 border-bongo-black px-4 py-3 outline-none focus:ring-4 focus:ring-bongo-pink"
              />
            </label>
            {error && <p className="font-body text-sm text-bongo-pink-deep">⚠️ {error}</p>}
            <button
              type="submit"
              disabled={pending}
              className="btn-pink w-full text-lg disabled:opacity-60"
            >
              {pending ? "…" : "Log ind"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
