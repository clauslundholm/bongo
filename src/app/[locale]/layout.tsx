import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getActiveLanguages, getActiveLanguageCodes } from "@/lib/data/languages";

export async function generateStaticParams() {
  const codes = await getActiveLanguageCodes();
  return codes.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const languages = await getActiveLanguages();
  if (!languages.some((l) => l.code === rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Navbar locale={locale} dict={dict} languages={languages} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
