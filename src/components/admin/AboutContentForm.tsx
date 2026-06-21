"use client";

import { useActionState, useState } from "react";
import { saveContent, type FormState } from "@/app/admin/actions";
import { TextField, TextArea, IconBtn } from "./AdminFields";

type Step = { t: string; d: string };

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

export default function AboutContentForm({
  contentKey,
  locale,
  initial,
}: {
  contentKey: string;
  locale: string;
  initial: Record<string, unknown>;
}) {
  const [f, setF] = useState({
    title: str(initial.title),
    intro: str(initial.intro),
    historyTitle: str(initial.historyTitle),
    history: str(initial.history),
    howTitle: str(initial.howTitle),
    prizesTitle: str(initial.prizesTitle),
    prizes: str(initial.prizes),
    faqCta: str(initial.faqCta),
  });
  const [how, setHow] = useState<Step[]>(
    Array.isArray(initial.how)
      ? (initial.how as unknown[]).map((s) => {
          const o = (s ?? {}) as Record<string, unknown>;
          return { t: str(o.t), d: str(o.d) };
        })
      : []
  );
  const [state, action, pending] = useActionState<FormState, FormData>(saveContent, {});

  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });

  function updateStep(i: number, patch: Partial<Step>) {
    setHow((s) => s.map((st, idx) => (idx === i ? { ...st, ...patch } : st)));
  }
  function addStep() { setHow((s) => [...s, { t: "", d: "" }]); }
  function removeStep(i: number) { setHow((s) => s.filter((_, idx) => idx !== i)); }
  function moveStep(i: number, dir: -1 | 1) {
    setHow((s) => {
      const j = i + dir;
      if (j < 0 || j >= s.length) return s;
      const copy = [...s];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }

  const payload = JSON.stringify({ ...f, how });

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="key" value={contentKey} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="data" value={payload} />

      <div className="pp-card space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Top af siden</h3>
        <TextField label="Titel" value={f.title} onChange={set("title")} />
        <TextArea label="Intro" value={f.intro} onChange={set("intro")} rows={2} />
      </div>

      <div className="pp-card space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Historie</h3>
        <TextField label="Overskrift" value={f.historyTitle} onChange={set("historyTitle")} />
        <TextArea label="Tekst" value={f.history} onChange={set("history")} rows={4} />
      </div>

      <div className="pp-card space-y-4 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Sådan er en aften</h3>
          <button type="button" onClick={addStep} className="pp-btn-ghost px-4 py-1.5 text-xs">+ Tilføj trin</button>
        </div>
        <TextField label="Overskrift for sektionen" value={f.howTitle} onChange={set("howTitle")} />
        {how.map((st, i) => (
          <div key={i} className="rounded-xl border border-admin-line bg-admin-panel/50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">Trin {i + 1}</span>
              <div className="flex gap-1">
                <IconBtn label="Op" onClick={() => moveStep(i, -1)}>↑</IconBtn>
                <IconBtn label="Ned" onClick={() => moveStep(i, 1)}>↓</IconBtn>
                <IconBtn label="Slet" onClick={() => removeStep(i)} danger>✕</IconBtn>
              </div>
            </div>
            <div className="space-y-3">
              <TextField label="Overskrift" value={st.t} onChange={(v) => updateStep(i, { t: v })} />
              <TextArea label="Beskrivelse" value={st.d} onChange={(v) => updateStep(i, { d: v })} rows={2} />
            </div>
          </div>
        ))}
      </div>

      <div className="pp-card space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Præmier & CTA</h3>
        <TextField label="Præmier-overskrift" value={f.prizesTitle} onChange={set("prizesTitle")} />
        <TextArea label="Præmier-tekst" value={f.prizes} onChange={set("prizes")} rows={3} />
        <TextField label="FAQ-knaptekst" value={f.faqCta} onChange={set("faqCta")} />
      </div>

      {state.error && <p className="rounded-xl border border-admin-line bg-admin-peach px-4 py-3 text-sm text-admin-peach-text">⚠️ {state.error}</p>}
      {state.ok && <p className="rounded-xl border border-admin-line bg-admin-green px-4 py-3 text-sm text-admin-green-text">✅ Gemt — ændringer er live.</p>}

      <button type="submit" disabled={pending} className="pp-btn-dark">{pending ? "Gemmer…" : "Gem indhold"}</button>
    </form>
  );
}
