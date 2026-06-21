"use client";

import { useMemo, useState } from "react";
import EventCard from "./EventCard";
import type { BongoEvent } from "@/data/events";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function EventsGrid({
  events,
  locale,
  dict,
  limit,
  showFilter = true,
}: {
  events: BongoEvent[];
  locale: Locale;
  dict: Dictionary;
  limit?: number;
  showFilter?: boolean;
}) {
  const all = useMemo(() => events, [events]);
  const cities = useMemo(() => ["ALL", ...Array.from(new Set(all.map((e) => e.city)))], [all]);
  const [city, setCity] = useState("ALL");

  let list = city === "ALL" ? all : all.filter((e) => e.city === city);
  if (limit) list = list.slice(0, limit);

  return (
    <div>
      {showFilter && (
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className={`rounded-full border-4 border-bongo-black px-5 py-2 font-display text-sm uppercase tracking-wide transition shadow-[3px_3px_0_0_#0A0A0A] hover:-translate-y-0.5 ${
                city === c ? "bg-bongo-pink text-white" : "bg-white text-bongo-black"
              }`}
            >
              {c === "ALL" ? dict.upcoming.all : c}
            </button>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <p className="text-center font-display uppercase text-bongo-yellow">{dict.upcoming.empty}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e, i) => (
            <EventCard key={e.slug} event={e} locale={locale} dict={dict} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
