"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BuyTicketsButton from "./BuyTicketsButton";
import { type BongoEvent, formatEventDate } from "@/data/events";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const accentMap: Record<BongoEvent["accent"], string> = {
  pink: "bg-bongo-pink text-white",
  yellow: "bg-bongo-yellow text-bongo-black",
  cyan: "bg-bongo-cyan text-bongo-black",
  purple: "bg-bongo-purple text-white",
};

export default function EventCard({
  event,
  locale,
  dict,
  index = 0,
}: {
  event: BongoEvent;
  locale: Locale;
  dict: Dictionary;
  index?: number;
}) {
  const d = formatEventDate(event.date, locale);
  const soldout = event.status === "soldout";

  const statusLabel =
    event.status === "soldout"
      ? dict.upcoming.soldout
      : event.status === "fewleft"
      ? dict.upcoming.fewleft
      : event.status === "new"
      ? dict.upcoming.new
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6, rotate: index % 2 ? -1 : 1 }}
      className="group card-pop flex h-full flex-col"
    >
      <div className={`relative ${accentMap[event.accent]} rounded-t-[1.3rem] px-5 pt-6 pb-4 border-b-4 border-bongo-black`}>
        <div className="flex items-center justify-between">
          <div className="font-display leading-none">
            <div className="text-4xl">{d.day}</div>
            <div className="text-lg">{d.month}</div>
          </div>
          <div className="text-right font-display uppercase">
            <div className="text-2xl">{event.city}</div>
            <div className="text-xs opacity-80 font-body capitalize">{d.weekday}</div>
          </div>
        </div>
        {statusLabel && (
          <span className="absolute -top-3 left-4 rotate-[-4deg] rounded-full border-2 border-bongo-black bg-white px-3 py-0.5 font-display text-[11px] uppercase text-bongo-black shadow-[2px_2px_0_0_#0A0A0A]">
            {statusLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-display uppercase text-xl text-bongo-black">{event.venue}</p>
        <p className="mt-1 font-body text-sm text-bongo-black/60">{event.address}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="tag-pill bg-bongo-yellow">{dict.eventPage.doors} {event.doors}</span>
          <span className="tag-pill bg-bongo-cyan">{dict.upcoming.from} {event.priceFrom} {event.currency}</span>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <BuyTicketsButton
            shopUrl={event.weeztixUrl}
            label={dict.upcoming.buy}
            soldout={soldout}
            soldoutLabel={dict.upcoming.soldout}
            title={`${event.city} · ${event.venue}`}
            className="btn-pink flex-1 text-sm"
          />
          <Link
            href={`/${locale}/events/${event.slug}`}
            className="btn-white px-4 text-sm"
            aria-label={dict.upcoming.details}
          >
            ›
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
