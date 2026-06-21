"use client";

import { useEffect, useState } from "react";

type MediaItem = { name: string; url: string; size: number; mimetype: string; createdAt: string };

export default function MediaField({
  label,
  value,
  onChange,
  accept = "all",
  name,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  accept?: "image" | "video" | "all";
  name?: string;
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(value);

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">{label}</span>
      <div className="mt-1.5 flex gap-2">
        <input value={value} onChange={(e) => onChange(e.target.value)} className="pp-input" placeholder="URL eller vælg fra bibliotek" />
        {name && <input type="hidden" name={name} value={value} />}
        <button type="button" onClick={() => setOpen(true)} className="pp-btn-ghost shrink-0 px-3 py-2 text-xs">Bibliotek</button>
      </div>
      {hint && <p className="mt-1 text-xs text-admin-muted">{hint}</p>}

      {value && (
        <div className="mt-2 overflow-hidden rounded-xl border border-admin-line">
          {isVideo ? (
            <video src={value} muted loop autoPlay playsInline className="aspect-video w-full max-w-xs object-cover" />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="" className="aspect-video w-full max-w-xs object-cover" />
          )}
        </div>
      )}

      {open && (
        <MediaModal
          accept={accept}
          onClose={() => setOpen(false)}
          onSelect={(url) => {
            onChange(url);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

function MediaModal({
  accept,
  onClose,
  onSelect,
}: {
  accept: "image" | "video" | "all";
  onClose: () => void;
  onSelect: (url: string) => void;
}) {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const res = await fetch("/api/admin/media", { cache: "no-store" });
      const json = await res.json();
      setItems(json.items ?? []);
    } catch {
      setError("Kunne ikke hente medier.");
      setItems([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Upload fejlede.");
      } else {
        onSelect(json.url);
        return;
      }
    } catch {
      setError("Upload fejlede.");
    } finally {
      setUploading(false);
    }
  }

  const filtered = (items ?? []).filter((m) =>
    accept === "all" ? true : accept === "video" ? m.mimetype.startsWith("video") : m.mimetype.startsWith("image")
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-admin-line px-5 py-4">
          <h3 className="text-lg font-bold text-admin-ink">Mediebibliotek</h3>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full border border-admin-line text-admin-ink hover:bg-admin-panel">✕</button>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-admin-line px-5 py-3">
          <label className="text-sm font-medium text-admin-ink">
            <span className="pp-btn-ghost cursor-pointer px-4 py-2 text-xs">{uploading ? "Uploader…" : "+ Upload ny"}</span>
            <input
              type="file"
              accept={accept === "video" ? "video/*" : accept === "image" ? "image/*" : "image/*,video/*"}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f);
              }}
            />
          </label>
          {error && <span className="text-xs text-admin-peach-text">⚠️ {error}</span>}
        </div>

        <div className="overflow-y-auto p-5">
          {items === null ? (
            <p className="py-10 text-center text-admin-muted">Henter…</p>
          ) : filtered.length === 0 ? (
            <p className="py-10 text-center text-admin-muted">Ingen medier. Upload en fil ovenfor.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {filtered.map((m) => {
                const v = m.mimetype.startsWith("video");
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => onSelect(m.url)}
                    className="group overflow-hidden rounded-xl border border-admin-line text-left transition hover:border-admin-ink"
                  >
                    <div className="aspect-video bg-admin-panel">
                      {v ? (
                        <video src={m.url} muted className="h-full w-full object-cover" />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="truncate px-2 py-1.5 text-[11px] text-admin-ink" title={m.name}>{m.name}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
