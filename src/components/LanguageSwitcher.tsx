"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Language } from "@/lib/data/languages";

export default function LanguageSwitcher({
  current,
  languages,
}: {
  current: Locale;
  languages: Language[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const currentLang = languages.find((l) => l.code === current);

  function switchTo(code: string) {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/") || "/");
    setOpen(false);
  }

  if (languages.length <= 1) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border-2 border-bongo-black bg-white px-3 py-1.5 font-display text-sm uppercase text-bongo-black shadow-[3px_3px_0_0_#0A0A0A] transition hover:-translate-y-0.5"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{currentLang?.flag ?? "🌐"}</span>
        <span className="hidden sm:inline">{current.toUpperCase()}</span>
        <span className="text-xs">▾</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul
            className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border-2 border-bongo-black bg-white text-bongo-black shadow-pop"
            role="listbox"
          >
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => switchTo(l.code)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left font-body text-sm transition hover:bg-bongo-yellow ${
                    l.code === current ? "bg-bongo-pink/10 font-bold" : ""
                  }`}
                >
                  <span className="text-lg">{l.flag}</span>
                  {l.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
