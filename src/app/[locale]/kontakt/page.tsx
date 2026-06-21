import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageContent } from "@/lib/data/content";

export const revalidate = 60;

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const hero = await getPageContent("kontakt", locale, {
    title: dict.contact.title,
    sub: dict.contact.sub,
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
        className="relative flex flex-col items-center justify-center overflow-hidden bg-bongo-black bg-logo-pattern px-5 py-16 sm:px-8 text-center"
      >
        {heroVideo && (
          <>
            <video autoPlay muted loop playsInline poster={hero.heroImage?.trim() || undefined} className="absolute inset-0 h-full w-full object-cover opacity-45">
              <source src={heroVideo} />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-bongo-black/55 via-bongo-pink/15 to-bongo-black" />
          </>
        )}
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-7xl text-white text-stroke-white">{hero.title}</h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-white/80 text-lg">{hero.sub}</p>
        </div>
      </section>

      <section className="bg-bongo-black bg-logo-pattern px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
          <ContactForm dict={dict} />

          <div className="space-y-4">
            <ContactCard title={dict.contact.generalTitle} value={dict.contact.generalEmail} href={`mailto:${dict.contact.generalEmail}`} color="bg-bongo-pink text-white" />
            <ContactCard title={dict.contact.pressTitle} value={dict.contact.pressEmail} href={`mailto:${dict.contact.pressEmail}`} color="bg-bongo-yellow text-bongo-black" />
            <div className="card-pop bg-bongo-cyan p-6">
              <h3 className="text-xl text-bongo-black">{dict.contact.followTitle}</h3>
              <div className="mt-3 flex gap-3">
                <a href="https://www.tiktok.com/@bongosbingodk" target="_blank" rel="noopener noreferrer" className="btn-white text-sm">TikTok</a>
                <a href="https://www.instagram.com/bongosbingodk" target="_blank" rel="noopener noreferrer" className="btn-pink text-sm">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

function ContactCard({ title, value, href, color }: { title: string; value: string; href: string; color: string }) {
  return (
    <a href={href} className={`card-pop block p-6 transition hover:-translate-y-1 ${color}`}>
      <h3 className="text-xl">{title}</h3>
      <p className="mt-1 font-body underline">{value}</p>
    </a>
  );
}
