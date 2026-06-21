import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/components/Accordion";
import Marquee from "@/components/Marquee";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <section className="bg-bongo-cyan bg-dots-dark pt-16 pb-12 px-5 sm:px-8 text-center">
        <h1 className="text-5xl sm:text-8xl text-bongo-black">{dict.faq.title}</h1>
        <p className="mx-auto mt-4 max-w-xl font-body text-bongo-black/80 text-lg">{dict.faq.sub}</p>
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
