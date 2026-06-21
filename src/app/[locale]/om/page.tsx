import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Marquee from "@/components/Marquee";
import CharacterParade from "@/components/CharacterParade";
import Reveal from "@/components/Reveal";
import PhotoFrame from "@/components/PhotoFrame";
import PhotoBand from "@/components/PhotoBand";
import ConfettiButton from "@/components/ConfettiButton";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageContent } from "@/lib/data/content";

export const revalidate = 60;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const about = await getPageContent("about", locale, {
    ...dict.about,
    heroVideo: "",
    heroImage: "",
    heroHeight: "auto",
  });
  const heroVideo = about.heroVideo?.trim();
  const hh = (about.heroHeight ?? "").trim();
  const heroStyle = hh && hh !== "auto" ? { minHeight: `${hh}vh` } : undefined;

  return (
    <>
      <section
        style={heroStyle}
        className={`relative flex flex-col items-center justify-center overflow-hidden px-5 py-14 sm:px-8 text-center ${
          heroVideo ? "bg-bongo-black" : "bg-bongo-purple bg-dots"
        }`}
      >
        {heroVideo ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={about.heroImage?.trim() || undefined}
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            >
              <source src={heroVideo} />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-bongo-black/55 via-bongo-purple/20 to-bongo-black" />
          </>
        ) : (
          <>
            <Image src="/characters/dancer2.png" alt="" width={200} height={200} className="pointer-events-none absolute left-4 bottom-0 hidden w-36 animate-float md:block" />
            <Image src="/characters/dancer2-reverse.png" alt="" width={200} height={200} className="pointer-events-none absolute right-4 bottom-0 hidden w-36 animate-float md:block" />
          </>
        )}
        <div className="relative z-10">
          <p className="font-display uppercase text-bongo-yellow text-xl">{dict.whatis.kicker}</p>
          <h1 className="text-5xl sm:text-8xl text-white text-stroke">{about.title}</h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-white/90 text-lg">{about.intro}</p>
        </div>
      </section>

      <Marquee items={dict.marquee} className="bg-bongo-yellow text-bongo-black" />

      <section className="bg-bongo-cream bg-dots-dark section-pad">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-4xl text-bongo-pink">{about.historyTitle}</h2>
                <p className="mt-4 font-body text-lg text-bongo-black/80">{about.history}</p>
              </div>
              <PhotoFrame src="/photos/DSC09826.webp" alt="Bongo's Bingo show" caption="Liverpool → Norden" rotate="rotate-2" />
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-14 text-4xl text-bongo-pink">{about.howTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {about.how.map((step, i) => (
              <Reveal key={i} delay={(i % 2) * 0.06}>
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

      <PhotoBand src="/photos/DSC03884.jpg" alt="Fest til Bongo's Bingo" height="h-[45vh] min-h-[300px]" position="object-[center_35%]">
        <p className="disco-text font-display uppercase text-3xl sm:text-5xl drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)]">
          {dict.whatis.everyone}
        </p>
      </PhotoBand>

      <section className="bg-bongo-pink bg-dots section-pad text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-4xl sm:text-6xl text-white text-stroke">{about.prizesTitle}</h2>
            <p className="mt-4 font-body text-white/90 text-lg">{about.prizes}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ConfettiButton className="btn-yellow text-lg" href={`/${locale}/events`}>
                🎟️ {dict.hero.cta}
              </ConfettiButton>
              <Link href={`/${locale}/faq`} className="btn-white text-lg">{about.faqCta}</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
