import { notFound } from "next/navigation";
import EventsGrid from "@/components/EventsGrid";
import Marquee from "@/components/Marquee";
import PhotoBand from "@/components/PhotoBand";
import Newsletter from "@/components/Newsletter";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getEvents } from "@/lib/data/events";

export const revalidate = 60;

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const events = await getEvents();

  return (
    <>
      <section className="relative bg-bongo-pink bg-dots overflow-hidden pt-16 pb-12 px-5 sm:px-8 text-center">
        <p className="font-display uppercase text-bongo-yellow text-xl">{dict.upcoming.kicker}</p>
        <h1 className="text-5xl sm:text-8xl text-white text-stroke">{dict.upcoming.title}</h1>
        <p className="mx-auto mt-4 max-w-xl font-body text-white/90">{dict.upcoming.sub}</p>
      </section>

      <Marquee items={dict.marquee} className="bg-bongo-yellow text-bongo-black" />

      <PhotoBand src="/photos/DSC049132.webp" alt="Bongo's Bingo show" height="h-[40vh] min-h-[280px]" position="object-[center_25%]" />

      <section className="bg-bongo-cream bg-dots-dark section-pad">
        <div className="mx-auto max-w-6xl">
          <EventsGrid events={events} locale={locale} dict={dict} />
        </div>
      </section>

      <Newsletter dict={dict} locale={locale} />
    </>
  );
}
