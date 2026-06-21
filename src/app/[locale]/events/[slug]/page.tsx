import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import BuyTicketsButton from "@/components/BuyTicketsButton";
import EventCard from "@/components/EventCard";
import Marquee from "@/components/Marquee";
import WhatIs from "@/components/WhatIs";
import CharacterParade from "@/components/CharacterParade";
import SocialFeed from "@/components/SocialFeed";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatEventDate } from "@/data/events";
import { getEvents, getEventBySlug, getEventParams } from "@/lib/data/events";
import { getPageContent } from "@/lib/data/content";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getEventParams();
}

export default async function EventDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const event = await getEventBySlug(slug, locale);
  if (!event) notFound();

  const d = formatEventDate(event.date, locale);
  const soldout = event.status === "soldout";
  const others = (await getEvents(locale)).filter((e) => e.slug !== event.slug).slice(0, 3);
  const about = await getPageContent("about", locale, dict.about);

  return (
    <>
      <section className="relative overflow-hidden bg-bongo-black">
        <Image
          src={event.image}
          alt={event.city}
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bongo-black/30 to-bongo-black" />
        <div className="bg-dots absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-5xl px-5 pt-10 pb-16 sm:px-8">
          <Link href={`/${locale}/events`} className="font-display uppercase text-sm text-bongo-yellow hover:underline">
            ← {dict.eventPage.back}
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="tag-pill bg-bongo-pink text-white">{d.weekday}</span>
              <h1 className="mt-3 text-6xl sm:text-8xl text-white text-stroke">{event.city}</h1>
              <p className="mt-2 font-display uppercase text-2xl text-bongo-yellow">
                {d.day}. {d.month} {d.year}
              </p>
            </div>
            <div className="rounded-3xl border-4 border-bongo-black bg-bongo-yellow p-5 text-bongo-black shadow-pop">
              <p className="font-body text-sm">{dict.eventPage.priceFrom}</p>
              <p className="font-display text-4xl">{event.priceFrom} {event.currency}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bongo-cream bg-dots-dark section-pad">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="card-pop p-7">
            <h2 className="text-3xl text-bongo-pink">{dict.eventPage.lineupTitle}</h2>
            <ul className="mt-5 space-y-3">
              {dict.whatis.list.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-bongo-black">
                  <span className="mt-0.5 text-bongo-pink">✦</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 disco-text font-display uppercase text-xl">{dict.whatis.slogan}</p>
          </div>

          <div className="space-y-4">
            <InfoRow label={dict.eventPage.venue} value={event.venue} />
            <InfoRow label="Adresse" value={event.address} />
            <InfoRow label={dict.eventPage.doors} value={event.doors} />
            <InfoRow label={dict.eventPage.starts} value={event.start} />
            <InfoRow label={dict.eventPage.age} value={dict.eventPage.age18} />

            <BuyTicketsButton
              shopUrl={event.weeztixUrl}
              label={`🎟️ ${dict.eventPage.buy}`}
              soldout={soldout}
              soldoutLabel={dict.upcoming.soldout}
              title={`${event.city} · ${event.venue}`}
              className="btn-pink w-full text-lg"
            />
          </div>
        </div>
      </section>

      <Marquee items={dict.marquee} className="bg-bongo-yellow text-bongo-black" />

      {/* What is Bongo's Bingo */}
      <WhatIs dict={dict} locale={locale} />

      {/* How an evening works */}
      <section className="bg-bongo-cream bg-dots-dark section-pad">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="text-4xl sm:text-6xl text-bongo-pink">{about.howTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(about.how ?? []).map((step, i) => (
              <Reveal key={i} delay={(i % 3) * 0.06}>
                <div className="card-pop h-full p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-4 border-bongo-black bg-bongo-yellow font-display text-lg">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-2xl text-bongo-black">{step.t}</h3>
                  <p className="mt-2 font-body text-bongo-black/70">{step.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CharacterParade />

      {/* Social proof */}
      <SocialFeed dict={dict} />

      {/* Other shows in this country */}
      {others.length > 0 && (
        <section className="bg-bongo-black bg-logo-pattern section-pad">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl text-white text-stroke-white">{dict.eventPage.otherShows}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((e, i) => (
                <EventCard key={e.slug} event={e} locale={locale} dict={dict} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter dict={dict} locale={locale} />
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border-4 border-bongo-black bg-white px-5 py-3 text-bongo-black shadow-[3px_3px_0_0_#0A0A0A]">
      <span className="font-body text-sm text-bongo-black/60">{label}</span>
      <span className="font-display uppercase text-sm text-right">{value}</span>
    </div>
  );
}
