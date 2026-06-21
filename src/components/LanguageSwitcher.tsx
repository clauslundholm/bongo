"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/") || "/");
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border-2 border-bongo-black bg-white px-3 py-1.5 font-display text-sm uppercase text-bongo-black shadow-[3px_3px_0_0_#0A0A0A] transition hover:-translate-y-0.5"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{localeFlags[current]}</span>
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
            {locales.map((l) => (
              <li key={l}>
                <button
                  onClick={() => switchTo(l)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left font-body text-sm transition hover:bg-bongo-yellow ${
                    l === current ? "bg-bongo-pink/10 font-bold" : ""
                  }`}
                >
                  <span className="text-lg">{localeFlags[l]}</span>
                  {localeNames[l]}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
