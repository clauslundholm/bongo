"use client";

import { useActionState, useState } from "react";
import { saveContent, type FormState } from "@/app/admin/actions";
import { TextField, TextArea } from "./AdminFields";
import HeroBgFields from "./HeroBgFields";

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export default function HomeHeroForm({
  locale,
  initial,
}: {
  locale: string;
  initial: Record<string, unknown>;
}) {
  const [f, setF] = useState({
    badge: str(initial.badge),
    title1: str(initial.title1),
    title2: str(initial.title2),
    sub: str(initial.sub),
    cta: str(initial.cta),
    heroVideo: str(initial.heroVideo),
    heroImage: str(initial.heroImage),
    heroHeight: str(initial.heroHeight) || "auto",
  });
  const [state, action, pending] = useActionState<FormState, FormData>(saveContent, {});
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });

  const payload = JSON.stringify(f);

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="key" value="home" />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="data" value={payload} />

      <div className="pp-card space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Hero-tekst</h3>
        <TextField label="Badge (overlinje)" value={f.badge} onChange={set("badge")} />
        <TextField label="Titel — linje 1" value={f.title1} onChange={set("title1")} />
        <TextField label="Titel — linje 2 (regnbue)" value={f.title2} onChange={set("title2")} />
        <TextArea label="Undertekst" value={f.sub} onChange={set("sub")} rows={3} />
        <TextField label="Knaptekst (CTA)" value={f.cta} onChange={set("cta")} />
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
