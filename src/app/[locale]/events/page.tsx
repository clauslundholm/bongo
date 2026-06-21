import { notFound } from "next/navigation";
import EventsGrid from "@/components/EventsGrid";
import Marquee from "@/components/Marquee";
import PhotoBand from "@/components/PhotoBand";
import Newsletter from "@/components/Newsletter";
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
  const events = await getEvents();
  const hero = await getPageContent("events", locale, {
    kicker: dict.upcoming.kicker,
    title: dict.upcoming.title,
    sub: dict.upcoming.sub,
    heroVideo: "",
    heroImage: "",
    heroHeight: "auto",
  });
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

      {!heroVideo && (
        <PhotoBand src="/photos/DSC049132.webp" alt="Bongo's Bingo show" height="h-[40vh] min-h-[280px]" position="object-[center_25%]" />
      )}

      <section className="bg-bongo-cream bg-dots-dark section-pad">
        <div className="mx-auto max-w-6xl">
          <EventsGrid events={events} locale={locale} dict={dict} />
        </div>
      </section>

      <Newsletter dict={dict} locale={locale} />
    </>
  );
}
