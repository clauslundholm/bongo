"use client";

import { useActionState } from "react";
import { saveContent, type FormState } from "@/app/admin/actions";

export default function ContentEditor({
  contentKey,
  locale,
  initialJson,
  isOverridden,
}: {
  contentKey: string;
  locale: string;
  initialJson: string;
  isOverridden: boolean;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveContent, {});

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="key" value={contentKey} />
      <input type="hidden" name="locale" value={locale} />

      <div className="flex items-center gap-3">
        <span className="tag-pill bg-bongo-pink text-white">{contentKey}</span>
        <span className="tag-pill bg-bongo-cyan">{locale.toUpperCase()}</span>
        <span className="font-body text-xs text-bongo-black/60">
          {isOverridden ? "Tilpasset i databasen" : "Standardtekst (fra ordbog)"}
        </span>
      </div>

      <textarea
        key={`${contentKey}-${locale}`}
        name="data"
        defaultValue={initialJson}
        rows={22}
        spellCheck={false}
        className="w-full rounded-2xl border-4 border-bongo-black bg-white p-4 font-mono text-sm outline-none focus:ring-4 focus:ring-bongo-pink"
      />

      {state.error && (
        <p className="rounded-2xl border-2 border-bongo-black bg-bongo-pink px-4 py-3 font-body text-sm text-white">⚠️ {state.error}</p>
      )}
      {state.ok && (
        <p className="rounded-2xl border-2 border-bongo-black bg-bongo-cyan px-4 py-3 font-body text-sm">✅ Gemt — ændringer er live.</p>
      )}

      <button type="submit" disabled={pending} className="btn-pink disabled:opacity-60">
        {pending ? "Gemmer…" : "Gem indhold"}
      </button>
    </form>
  );
}
