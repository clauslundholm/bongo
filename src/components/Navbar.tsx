"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base = `/${locale}`;
  const links = [
    { href: `${base}/how-to-bingo`, label: dict.howto.title },
    { href: `${base}/festivaller`, label: dict.fest.nav },
    { href: `${base}/erhverv`, label: dict.corp.nav },
    { href: `${base}/om`, label: dict.nav.about },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bongo-yellow shadow-[0_4px_0_0_#0A0A0A]" : "bg-bongo-yellow/95"
      } border-b-4 border-bongo-black`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href={base} className="flex items-center gap-2 shrink-0">
          <Image
            src="/characters/Bongos-Bingo-logo-Black_RGB.png"
            alt="Bongo's Bingo"
            width={150}
            height={48}
            className="h-9 w-auto sm:h-11"
            priority
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 font-display text-sm uppercase tracking-wide text-bongo-black transition hover:bg-bongo-black hover:text-bongo-yellow"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher current={locale} />
          <Link href={`${base}/events`} className="btn-pink hidden px-5 py-2 text-sm sm:inline-flex">
            {dict.hero.cta2}
          </Link>
          <button
            className="rounded-full border-2 border-bongo-black bg-white p-2 text-bongo-black lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={dict.nav.menu}
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span className={`h-0.5 w-full bg-bongo-black transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-full bg-bongo-black transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-bongo-black transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t-4 border-bongo-black bg-bongo-pink px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border-2 border-bongo-black bg-white px-4 py-3 font-display text-lg uppercase text-bongo-black"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`${base}/events`}
              onClick={() => setOpen(false)}
              className="btn-yellow mt-1 w-full"
            >
              {dict.hero.cta2}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
