"use client";

import { useActionState } from "react";
import { createAdmin, type FormState } from "@/app/admin/actions";
import CopyButton from "./CopyButton";

export default function AddAdminForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createAdmin, {});

  return (
    <form action={action} className="pp-card p-5">
      <h3 className="text-sm font-semibold text-admin-ink">Opret administrator</h3>
      <p className="text-xs text-admin-muted">
        Opretter et login i Supabase med en <strong>automatisk genereret adgangskode</strong>. Adgangskoden vises
        kun én gang her — kopiér den og send den til personen.
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
      </div>

      {state.error && <p className="mt-2 text-xs text-admin-peach-text">⚠️ {state.error}</p>}

      {state.ok && state.password && (
        <div className="mt-3 rounded-xl border border-admin-line bg-admin-green/40 p-4">
          <p className="text-sm font-semibold text-admin-ink">
            ✅ Administrator oprettet{state.email ? ` (${state.email})` : ""}
          </p>
          <p className="mt-1 text-xs text-admin-muted">Adgangskode (vises kun nu):</p>
          <div className="mt-1 flex items-center gap-2">
            <code className="select-all rounded-lg border border-admin-line bg-white px-3 py-2 font-mono text-sm text-admin-ink">
              {state.password}
            </code>
            <CopyButton text={state.password} />
          </div>
        </div>
      )}

      {state.ok && !state.password && (
        <p className="mt-2 text-xs text-admin-green-text">
          ✅ Adgang givet{state.email ? ` (${state.email})` : ""} — brugeren fandtes allerede, så adgangskoden er uændret.
        </p>
      )}

      <button type="submit" disabled={pending} className="pp-btn-dark mt-3">
        {pending ? "Opretter…" : "Opret administrator"}
      </button>
    </form>
  );
}
