"use client";

import { useActionState, useState } from "react";
import { saveContent, type FormState } from "@/app/admin/actions";
import { TextField, TextArea } from "./AdminFields";
import HeroBgFields from "./HeroBgFields";

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export default function HeroForm({
  contentKey,
  locale,
  initial,
  showKicker = true,
}: {
  contentKey: string;
  locale: string;
  initial: Record<string, unknown>;
  showKicker?: boolean;
}) {
  const [f, setF] = useState({
    kicker: str(initial.kicker),
    title: str(initial.title),
    sub: str(initial.sub),
    heroVideo: str(initial.heroVideo),
    heroImage: str(initial.heroImage),
    heroHeight: str(initial.heroHeight) || "auto",
  });
  const [state, action, pending] = useActionState<FormState, FormData>(saveContent, {});
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });

  const payload = JSON.stringify(f);

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="key" value={contentKey} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="data" value={payload} />

      <div className="pp-card space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Top af siden</h3>
        {showKicker && <TextField label="Overlinje (kicker)" value={f.kicker} onChange={set("kicker")} />}
        <TextField label="Titel" value={f.title} onChange={set("title")} />
        <TextArea label="Undertekst" value={f.sub} onChange={set("sub")} rows={2} />
      </div>

      <HeroBgFields
        video={f.heroVideo}
        image={f.heroImage}
        height={f.heroHeight}
        onVideo={set("heroVideo")}
        onImage={set("heroImage")}
        onHeight={set("heroHeight")}
      />

      {state.error && <p className="rounded-xl border border-admin-line bg-admin-peach px-4 py-3 text-sm text-admin-peach-text">⚠️ {state.error}</p>}
      {state.ok && <p className="rounded-xl border border-admin-line bg-admin-green px-4 py-3 text-sm text-admin-green-text">✅ Gemt — ændringer er live.</p>}

      <button type="submit" disabled={pending} className="pp-btn-dark">{pending ? "Gemmer…" : "Gem indhold"}</button>
    </form>
  );
}
