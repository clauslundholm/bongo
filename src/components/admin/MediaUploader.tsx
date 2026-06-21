"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadViaSignedUrl } from "@/lib/media-upload";

export default function MediaUploader() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleFiles(files: File[]) {
    if (files.length === 0) return;
    setError("");
    setPending(true);
    let ok = 0;
    for (const file of files) {
      setMsg(`Uploader ${ok + 1}/${files.length}: ${file.name}…`);
      try {
        await uploadViaSignedUrl(file);
        ok++;
      } catch (e) {
        setError(`Fejl ved ${file.name}: ${e instanceof Error ? e.message : "ukendt fejl"}`);
      }
    }
    setPending(false);
    setMsg(ok > 0 ? `Færdig — ${ok} fil(er) uploadet.` : "");
    if (inputRef.current) inputRef.current.value = "";
    router.refresh();
  }

  return (
    <div className="pp-card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-admin-ink">Upload medier</h3>
        <p className="text-xs text-admin-muted">
          Billeder (jpg, png, webp, gif, svg) og video (mp4, webm, mov). Maks 100 MB. Uploades direkte til Supabase.
        </p>
        {error && <p className="mt-1 text-xs text-admin-peach-text">⚠️ {error}</p>}
        {!error && msg && <p className="mt-1 text-xs text-admin-green-text">{msg}</p>}
      </div>
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={(e) => handleFiles(Array.from(e.target.files ?? []))}
        />
        <button
          type="button"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
          className="pp-btn-dark shrink-0"
        >
          {pending ? "Uploader…" : "Vælg filer"}
        </button>
      </div>
    </div>
  );
}
