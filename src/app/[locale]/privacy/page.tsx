import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <section className="bg-bongo-cream bg-dots-dark section-pad">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl sm:text-6xl text-bongo-black">{dict.privacy.title}</h1>
        <p className="mt-6 font-body text-lg leading-relaxed text-bongo-black/80">{dict.privacy.body}</p>
        <p className="mt-6 font-body text-bongo-black/60">
          {dict.contact.generalTitle}: <a href="mailto:hello@bongosbingo.dk" className="underline">hello@bongosbingo.dk</a>
        </p>
      </div>
    </section>
  );
}
