"use client";

import { useActionState, useRef } from "react";
import { uploadMedia, type FormState } from "@/app/admin/actions";

export default function MediaUploader() {
  const [state, action, pending] = useActionState<FormState, FormData>(uploadMedia, {});
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={(fd) => {
        action(fd);
        ref.current?.reset();
      }}
      className="pp-card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h3 className="text-sm font-semibold text-admin-ink">Upload medier</h3>
        <p className="text-xs text-admin-muted">Billeder (jpg, png, webp, gif, svg) og video (mp4, webm). Maks 100 MB.</p>
        {state.error && <p className="mt-1 text-xs text-admin-peach-text">⚠️ {state.error}</p>}
        {state.ok && <p className="mt-1 text-xs text-admin-green-text">✅ Uploadet.</p>}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="file"
          name="file"
          multiple
          accept="image/*,video/*"
          required
          className="text-sm file:mr-3 file:rounded-full file:border file:border-admin-line file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-admin-ink hover:file:bg-admin-panel"
        />
        <button type="submit" disabled={pending} className="pp-btn-dark shrink-0">
          {pending ? "Uploader…" : "Upload"}
        </button>
      </div>
    </form>
  );
}
