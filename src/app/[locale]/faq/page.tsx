import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/components/Accordion";
import Marquee from "@/components/Marquee";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageContent } from "@/lib/data/content";

export const revalidate = 60;

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const hero = await getPageContent("faq", locale, {
    title: dict.faq.title,
    sub: dict.faq.sub,
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
          heroVideo ? "bg-bongo-black" : "bg-bongo-cyan bg-dots-dark"
        }`}
      >
        {heroVideo && (
          <>
            <video autoPlay muted loop playsInline poster={hero.heroImage?.trim() || undefined} className="absolute inset-0 h-full w-full object-cover opacity-45">
              <source src={heroVideo} />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-bongo-black/55 via-bongo-cyan/15 to-bongo-black" />
          </>
        )}
        <div className="relative z-10">
          <h1 className={`text-5xl sm:text-8xl ${heroVideo ? "text-white text-stroke" : "text-bongo-black"}`}>{hero.title}</h1>
          <p className={`mx-auto mt-4 max-w-xl font-body text-lg ${heroVideo ? "text-white/90" : "text-bongo-black/80"}`}>{hero.sub}</p>
        </div>
      </section>

      <Marquee items={dict.marquee} />

      <section className="bg-bongo-cream bg-dots-dark section-pad">
        <div className="mx-auto max-w-3xl">
          <Accordion items={dict.faq.items} />
          <div className="mt-10 text-center">
            <Link href={`/${locale}/events`} className="btn-pink text-lg">🎟️ {dict.hero.cta}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
