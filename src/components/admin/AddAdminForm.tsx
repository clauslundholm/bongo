"use client";

import { useActionState } from "react";
import { createAdmin, type FormState } from "@/app/admin/actions";

export default function AddAdminForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createAdmin, {});

  return (
    <form action={action} className="pp-card p-5">
      <h3 className="text-sm font-semibold text-admin-ink">Opret administrator</h3>
      <p className="text-xs text-admin-muted">
        Opretter et login (email + adgangskode) i Supabase og giver adgang til admin. Personen kan logge ind med det samme.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">Navn</span>
          <input name="name" placeholder="Anders" className="pp-input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">Email</span>
          <input name="email" type="email" required placeholder="anders@mundelin.dk" className="pp-input mt-1.5" />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">Adgangskode (min. 8 tegn)</span>
          <input name="password" type="text" required minLength={8} placeholder="vælg en adgangskode" className="pp-input mt-1.5" />
        </label>
      </div>
      {state.error && <p className="mt-2 text-xs text-admin-peach-text">⚠️ {state.error}</p>}
      {state.ok && <p className="mt-2 text-xs text-admin-green-text">✅ Administrator oprettet.</p>}
      <button type="submit" disabled={pending} className="pp-btn-dark mt-3">
        {pending ? "Opretter…" : "Opret administrator"}
      </button>
    </form>
  );
}
