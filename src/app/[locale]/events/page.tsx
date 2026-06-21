import { notFound } from "next/navigation";
import EventsGrid from "@/components/EventsGrid";
import Marquee from "@/components/Marquee";
import PhotoBand from "@/components/PhotoBand";
import WhatIs from "@/components/WhatIs";
import CharacterParade from "@/components/CharacterParade";
import SocialFeed from "@/components/SocialFeed";
import FeaturedOn from "@/components/FeaturedOn";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getEvents } from "@/lib/data/events";
import { getPageContent } from "@/lib/data/content";

export const revalidate = 60;

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const events = await getEvents(locale);
  const hero = await getPageContent("events", locale, {
    kicker: dict.upcoming.kicker,
    title: dict.upcoming.title,
    sub: dict.upcoming.sub,
    heroVideo: "",
    heroImage: "",
    heroHeight: "auto",
  });
  const about = await getPageContent("about", locale, dict.about);
  const heroVideo = hero.heroVideo?.trim();
  const hh = (hero.heroHeight ?? "").trim();
  const heroStyle = hh && hh !== "auto" ? { minHeight: `${hh}vh` } : undefined;

  return (
    <>
      <section
        style={heroStyle}
        className={`relative flex flex-col items-center justify-center overflow-hidden px-5 py-12 sm:px-8 text-center ${
          heroVideo ? "bg-bongo-black" : "bg-bongo-pink bg-dots"
        }`}
      >
        {heroVideo && (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={hero.heroImage?.trim() || undefined}
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            >
              <source src={heroVideo} />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-bongo-black/55 via-bongo-pink/15 to-bongo-black" />
          </>
        )}
        <div className="relative z-10">
          <p className="font-display uppercase text-bongo-yellow text-xl">{hero.kicker}</p>
          <h1 className="text-5xl sm:text-8xl text-white text-stroke">{hero.title}</h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-white/90">{hero.sub}</p>
        </div>
      </section>

      <Marquee items={dict.marquee} className="bg-bongo-yellow text-bongo-black" />

      {/* Shows — the main event */}
      <section className="bg-bongo-cream bg-dots-dark section-pad">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-8 text-center">
              <p className="font-display uppercase text-bongo-pink text-lg">{dict.upcoming.kicker}</p>
              <h2 className="text-4xl sm:text-6xl text-bongo-black">{dict.upcoming.title}</h2>
            </div>
          </Reveal>
          <EventsGrid events={events} locale={locale} dict={dict} />
        </div>
      </section>

      {!heroVideo && (
        <PhotoBand src="/photos/DSC049132.webp" alt="Bongo's Bingo show" position="object-[center_25%]">
          <p className="max-w-3xl disco-text font-display uppercase text-3xl sm:text-5xl lg:text-6xl drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)]">
            {dict.whatis.slogan}
          </p>
        </PhotoBand>
      )}

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

      <FeaturedOn dict={dict} />

      <Newsletter dict={dict} locale={locale} />
    </>
  );
}
