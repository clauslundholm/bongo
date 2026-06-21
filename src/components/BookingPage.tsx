import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import PhotoFrame from "./PhotoFrame";
import ConfettiButton from "./ConfettiButton";
import Marquee from "./Marquee";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Section = { title: string; paragraphs: string[]; list: string[] };
type Data = {
  kicker: string;
  title: string;
  intro: string;
  cta: string;
  blocks: Section[];
  heroVideo?: string;
  heroImage?: string;
};

const CHARS = ["strong-duck", "dancer2", "dancer1", "unicorn", "blowey", "henry-hoover", "host", "69-ball"];
const HEADER_BG = ["bg-bongo-pink", "bg-bongo-cyan", "bg-bongo-yellow", "bg-bongo-purple"];

export default function BookingPage({
  data,
  dict,
  locale,
  heroChar,
  ctaHref,
  heroImage,
}: {
  data: Data;
  dict: Dictionary;
  locale: Locale;
  heroChar: string;
  ctaHref?: string;
  heroImage?: string;
}) {
  const contactHref = ctaHref ?? `/${locale}/kontakt`;
  const heroVideo = data.heroVideo?.trim();
  const effectiveImage = data.heroImage?.trim() || heroImage;

  return (
    <>
      <section className="relative overflow-hidden bg-bongo-black pt-16 pb-16 px-5 sm:px-8">
        {heroVideo ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={effectiveImage}
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            >
              <source src={heroVideo} />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-bongo-black/55 via-bongo-pink/15 to-bongo-black" />
          </>
        ) : (
          <>
            <div className="bg-dots absolute inset-0" />
            <Image
              src={`/characters/${heroChar}.png`}
              alt=""
              width={260}
              height={260}
              className="pointer-events-none absolute -right-2 bottom-0 hidden w-48 animate-float md:block"
            />
          </>
        )}

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="font-display uppercase text-bongo-pink text-xl">{data.kicker}</p>
          <h1 className="text-5xl sm:text-8xl text-white text-stroke-white">{data.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl font-display uppercase text-bongo-yellow text-lg sm:text-2xl">
            {data.intro}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ConfettiButton className="btn-pink text-lg" href={contactHref}>
              {data.cta}
            </ConfettiButton>
            <Link href={`/${locale}/events`} className="btn-white text-lg">
              {dict.hero.cta2}
            </Link>
          </div>

          {!heroVideo && effectiveImage && (
            <div className="mx-auto mt-10 max-w-3xl">
              <PhotoFrame src={effectiveImage} alt={data.title} ratio="aspect-[16/9]" rotate="-rotate-1" />
            </div>
          )}
        </div>
      </section>

      <Marquee items={dict.marquee} className="bg-bongo-yellow text-bongo-black" />

      <section className="bg-bongo-cream bg-dots-dark section-pad">
        <div className="mx-auto max-w-4xl space-y-12">
          {data.blocks.map((block, i) => (
            <Reveal key={i} delay={0.04}>
              <article className="card-pop overflow-hidden">
                <div className={`flex items-center gap-4 border-b-4 border-bongo-black px-6 py-4 ${HEADER_BG[i % HEADER_BG.length]}`}>
                  <Image
                    src={`/characters/${CHARS[i % CHARS.length]}.png`}
                    alt=""
                    width={64}
                    height={64}
                    className="h-12 w-12 object-contain drop-shadow-[3px_3px_0_rgba(0,0,0,0.3)] sm:h-14 sm:w-14"
                  />
                  <h2 className="text-2xl sm:text-3xl text-bongo-black">
                    {block.title || dict.whatis.kicker + " Bongo's"}
                  </h2>
                </div>
                <div className="space-y-4 p-6 sm:p-8">
                  {block.paragraphs.map((p, j) => (
                    <p key={j} className="font-body text-lg text-bongo-black/80">{p}</p>
                  ))}
                  {block.list.length > 0 && (
                    <ul className="mt-2 grid gap-3 sm:grid-cols-2">
                      {block.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 rounded-2xl border-2 border-bongo-black bg-bongo-cream px-4 py-3 font-body text-bongo-black">
                          <span className="mt-0.5 text-bongo-pink">✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}

          <div className="text-center">
            <ConfettiButton className="btn-pink text-lg" href={contactHref}>
              {data.cta}
            </ConfettiButton>
          </div>
        </div>
      </section>
    </>
  );
}
