"use client";

import { useActionState, useState } from "react";
import { saveContent, type FormState } from "@/app/admin/actions";
import { TextField, TextArea, IconBtn } from "./AdminFields";

type Block = { title: string; paragraphsText: string; listText: string };
type RawBlock = { title?: string; paragraphs?: string[]; list?: string[] };

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function normalize(initial: Record<string, unknown>): { meta: { kicker: string; title: string; intro: string; cta: string; heroVideo: string; heroImage: string }; blocks: Block[] } {
  const rawBlocks = (Array.isArray(initial.blocks) ? initial.blocks : []) as RawBlock[];
  return {
    meta: {
      kicker: str(initial.kicker),
      title: str(initial.title),
      intro: str(initial.intro),
      cta: str(initial.cta),
      heroVideo: str(initial.heroVideo),
      heroImage: str(initial.heroImage),
    },
    blocks: rawBlocks.map((b) => ({
      title: str(b.title),
      paragraphsText: (b.paragraphs ?? []).join("\n"),
      listText: (b.list ?? []).join("\n"),
    })),
  };
}

export default function BookingContentForm({
  contentKey,
  locale,
  initial,
}: {
  contentKey: string;
  locale: string;
  initial: Record<string, unknown>;
}) {
  const norm = normalize(initial);
  const [meta, setMeta] = useState(norm.meta);
  const [blocks, setBlocks] = useState<Block[]>(norm.blocks);
  const [state, action, pending] = useActionState<FormState, FormData>(saveContent, {});

  const payload = JSON.stringify({
    kicker: meta.kicker,
    title: meta.title,
    intro: meta.intro,
    cta: meta.cta,
    heroVideo: meta.heroVideo,
    heroImage: meta.heroImage,
    blocks: blocks.map((b) => ({
      title: b.title,
      paragraphs: b.paragraphsText.split("\n").map((s) => s.trim()).filter(Boolean),
      list: b.listText.split("\n").map((s) => s.trim()).filter(Boolean),
    })),
  });

  function updateBlock(i: number, patch: Partial<Block>) {
    setBlocks((bs) => bs.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
  }
  function addBlock() {
    setBlocks((bs) => [...bs, { title: "", paragraphsText: "", listText: "" }]);
  }
  function removeBlock(i: number) {
    setBlocks((bs) => bs.filter((_, idx) => idx !== i));
  }
  function moveBlock(i: number, dir: -1 | 1) {
    setBlocks((bs) => {
      const j = i + dir;
      if (j < 0 || j >= bs.length) return bs;
      const copy = [...bs];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="key" value={contentKey} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="data" value={payload} />

      <div className="pp-card space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Top af siden</h3>
        <TextField label="Overlinje (kicker)" value={meta.kicker} onChange={(v) => setMeta({ ...meta, kicker: v })} />
        <TextField label="Titel" value={meta.title} onChange={(v) => setMeta({ ...meta, title: v })} />
        <TextArea label="Intro" value={meta.intro} onChange={(v) => setMeta({ ...meta, intro: v })} rows={2} />
        <TextField label="Knaptekst (CTA)" value={meta.cta} onChange={(v) => setMeta({ ...meta, cta: v })} />
      </div>

      <div className="pp-card space-y-4 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Baggrund (hero)</h3>
        <TextField label="Baggrundsvideo URL (.mp4 / .webm)" value={meta.heroVideo} onChange={(v) => setMeta({ ...meta, heroVideo: v })} />
        <TextField label="Baggrundsbillede URL (vises hvis ingen video)" value={meta.heroImage} onChange={(v) => setMeta({ ...meta, heroImage: v })} />
        <p className="text-xs text-admin-muted">Tom video = brug billede. Videoen afspilles automatisk, lydløst og i loop som baggrund.</p>
        {meta.heroVideo ? (
          <video src={meta.heroVideo} muted loop autoPlay playsInline className="aspect-video w-full max-w-md rounded-xl border border-admin-line object-cover" />
        ) : meta.heroImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={meta.heroImage} alt="" className="aspect-video w-full max-w-md rounded-xl border border-admin-line object-cover" />
        ) : null}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Sektioner</h3>
          <button type="button" onClick={addBlock} className="pp-btn-ghost px-4 py-1.5 text-xs">+ Tilføj sektion</button>
        </div>

        {blocks.length === 0 && (
          <p className="pp-card p-5 text-sm text-admin-muted">Ingen sektioner. Tilføj én for at komme i gang.</p>
        )}

        {blocks.map((b, i) => (
          <div key={i} className="pp-card space-y-3 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">Sektion {i + 1}</span>
              <div className="flex items-center gap-1">
                <IconBtn label="Op" onClick={() => moveBlock(i, -1)}>↑</IconBtn>
                <IconBtn label="Ned" onClick={() => moveBlock(i, 1)}>↓</IconBtn>
                <IconBtn label="Slet" onClick={() => removeBlock(i)} danger>✕</IconBtn>
              </div>
            </div>
            <TextField label="Overskrift (valgfri)" value={b.title} onChange={(v) => updateBlock(i, { title: v })} />
            <TextArea label="Afsnit (ét pr. linje)" value={b.paragraphsText} onChange={(v) => updateBlock(i, { paragraphsText: v })} rows={4} />
            <TextArea label="Punktliste (ét pr. linje)" value={b.listText} onChange={(v) => updateBlock(i, { listText: v })} rows={4} />
          </div>
        ))}
      </div>

      {state.error && <p className="rounded-xl border border-admin-line bg-admin-peach px-4 py-3 text-sm text-admin-peach-text">⚠️ {state.error}</p>}
      {state.ok && <p className="rounded-xl border border-admin-line bg-admin-green px-4 py-3 text-sm text-admin-green-text">✅ Gemt — ændringer er live.</p>}

      <button type="submit" disabled={pending} className="pp-btn-dark">{pending ? "Gemmer…" : "Gem indhold"}</button>
    </form>
  );
}
