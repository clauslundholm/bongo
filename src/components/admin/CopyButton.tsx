"use client";

import { useState } from "react";

export default function CopyButton({ text, className }: { text: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          /* ignore */
        }
      }}
      className={className ?? "pp-btn-ghost px-3 py-1.5 text-xs"}
    >
      {done ? "Kopieret ✓" : "Kopiér URL"}
    </button>
  );
}
