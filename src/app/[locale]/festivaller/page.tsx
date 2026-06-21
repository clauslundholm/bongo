import { notFound } from "next/navigation";
import BookingPage from "@/components/BookingPage";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function FestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return <BookingPage data={dict.fest} dict={dict} locale={locale} heroChar="unicorn" heroImage="/photos/DSC09826.webp" />;
}
