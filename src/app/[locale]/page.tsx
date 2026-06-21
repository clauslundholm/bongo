import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import CharacterParade from "@/components/CharacterParade";
import PhotoBand from "@/components/PhotoBand";
import EventsGrid from "@/components/EventsGrid";
import WhatIs from "@/components/WhatIs";
import FeaturedOn from "@/components/FeaturedOn";
import Newsletter from "@/components/Newsletter";
import SocialFeed from "@/components/SocialFeed";
import Reveal from "@/components/Reveal";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />

      <Marquee items={dict.marquee} />

      {/* Upcoming shows */}
      <section className="bg-bongo-cream bg-dots-dark section-pad">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display uppercase text-bongo-pink text-xl">{dict.upcoming.kicker}</p>
                <h2 className="text-5xl sm:text-7xl text-bongo-black">{dict.upcoming.title}</h2>
                <p className="mt-3 max-w-xl font-body text-bongo-black/70">{dict.upcoming.sub}</p>
              </div>
              <Link href={`/${locale}/events`} className="btn-pink">{dict.upcoming.all}</Link>
            </div>
          </Reveal>

          <div className="mt-10">
            <EventsGrid locale={locale} dict={dict} limit={6} showFilter={false} />
          </div>

          <div className="mt-10 text-center">
            <Link href={`/${locale}/events`} className="btn-yellow text-lg">{dict.upcoming.all} →</Link>
          </div>
        </div>
      </section>

      <CharacterParade />

      <PhotoBand src="/photos/DSC049132.webp" alt="Bongo's Bingo show" position="object-[center_30%]">
        <p className="max-w-3xl disco-text font-display uppercase text-3xl sm:text-5xl lg:text-6xl drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)]">
          {dict.whatis.slogan}
        </p>
      </PhotoBand>

      <WhatIs dict={dict} />

      <Marquee items={dict.marquee} reverse className="bg-bongo-cyan text-bongo-black" />

      <FeaturedOn dict={dict} />

      <SocialFeed dict={dict} />

      <Newsletter dict={dict} />
    </>
  );
}
