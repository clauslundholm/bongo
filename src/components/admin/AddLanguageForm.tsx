"use client";

import { useActionState } from "react";
import { createLanguage, type FormState } from "@/app/admin/actions";

export default function AddLanguageForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(createLanguage, {});

  return (
    <form action={action} className="pp-card p-5">
      <h3 className="text-sm font-semibold text-admin-ink">Tilføj sprog</h3>
      <p className="text-xs text-admin-muted">
        Indbygget oversættelse findes for da/no/sv/fi/fo. Nye sprog viser standard-sproget indtil du udfylder
        sidetekster under Indhold.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_2fr_1fr_auto] sm:items-end">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">Kode</span>
          <input name="code" required placeholder="en" maxLength={3} className="pp-input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">Navn</span>
          <input name="name" required placeholder="English" className="pp-input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">Flag (emoji)</span>
          <input name="flag" placeholder="🇬🇧" className="pp-input mt-1.5" />
        </label>
        <button type="submit" disabled={pending} className="pp-btn-dark">
          {pending ? "…" : "Tilføj"}
        </button>
      </div>
      {state.error && <p className="mt-2 text-xs text-admin-peach-text">⚠️ {state.error}</p>}
      {state.ok && <p className="mt-2 text-xs text-admin-green-text">✅ Tilføjet.</p>}
    </form>
  );
}
