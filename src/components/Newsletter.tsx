"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { fireConfetti } from "@/lib/confetti";
import { subscribeNewsletter } from "@/app/actions";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Newsletter({ dict, locale }: { dict: Dictionary; locale?: Locale }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setError(false);
    startTransition(async () => {
      const res = await subscribeNewsletter(email, locale);
      if (res.ok) {
        setDone(true);
        fireConfetti();
      } else {
        setError(true);
      }
    });
  }

  return (
    <section className="relative overflow-hidden bg-bongo-yellow stripes-none section-pad">
      <div className="bg-dots-dark absolute inset-0" />
      <Image
        src="/characters/host.png"
        alt=""
        width={240}
        height={240}
        className="pointer-events-none absolute bottom-0 left-2 hidden w-40 md:block animate-float"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-4xl sm:text-6xl text-bongo-black">{dict.cities.title}</h2>
        <p className="mt-4 font-body text-bongo-black/80 text-lg">{dict.cities.sub}</p>

        <div className="mt-8 card-pop bg-bongo-pink p-6 sm:p-8">
          <p className="font-display uppercase text-2xl text-white">{dict.newsletter.kicker}</p>
          <p className="mt-1 font-body text-white/90">{dict.newsletter.title}</p>

          {done ? (
            <p className="mt-6 font-display uppercase text-xl text-bongo-yellow">{dict.newsletter.success}</p>
          ) : (
            <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict.newsletter.placeholder}
                className="w-full rounded-full border-4 border-bongo-black px-5 py-3 font-body text-bongo-black outline-none focus:ring-4 focus:ring-bongo-yellow"
              />
              <button type="submit" disabled={pending} className="btn-yellow shrink-0 disabled:opacity-60">
                {pending ? "…" : dict.newsletter.button}
              </button>
            </form>
          )}
          {error && <p className="mt-3 font-body text-sm text-white">⚠️ {dict.newsletter.placeholder}</p>}
          <p className="mt-4 font-body text-xs text-white/80">{dict.newsletter.consent}</p>
        </div>
      </div>
    </section>
  );
}
