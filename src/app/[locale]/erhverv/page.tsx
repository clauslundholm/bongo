import { notFound } from "next/navigation";
import BookingPage from "@/components/BookingPage";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPageContent } from "@/lib/data/content";

export const revalidate = 60;

export default async function CorpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const data = await getPageContent("corp", locale, dict.corp);

  return <BookingPage data={data} dict={dict} locale={locale} heroChar="strong-duck" heroImage="/photos/DSC03884.jpg" />;
}
