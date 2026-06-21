import Link from "next/link";
import ContentEditor from "@/components/admin/ContentEditor";
import { resetContent } from "../../actions";
import { adminGetContent } from "@/lib/admin-data";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

const KEYS = ["about", "corp", "fest", "howto"] as const;
type Key = (typeof KEYS)[number];

function fallbackFor(key: Key, locale: Locale) {
  const dict = getDictionary(locale);
  if (key === "about") return dict.about;
  if (key === "corp") return dict.corp;
  if (key === "fest") return dict.fest;
  return dict.howto;
}

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; locale?: string }>;
}) {
  const sp = await searchParams;
  const key: Key = (KEYS as readonly string[]).includes(sp.key ?? "") ? (sp.key as Key) : "about";
  const locale: Locale = isLocale(sp.locale ?? "") ? (sp.locale as Locale) : "da";

  const override = await adminGetContent(key, locale);
  const current = override ?? fallbackFor(key, locale);
  const json = JSON.stringify(current, null, 2);

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-bongo-black">Indhold</h1>
      <p className="mt-2 max-w-2xl font-body text-bongo-black/70">
        Rediger sidetekster pr. sprog. Tomt felt = standardtekst fra ordbogen.
        Gem som JSON — strukturen skal matche den viste.
      </p>

      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          {KEYS.map((k) => (
            <Link
              key={k}
              href={`/admin/content?key=${k}&locale=${locale}`}
              className={`rounded-full border-2 border-bongo-black px-4 py-1.5 font-display text-xs uppercase ${k === key ? "bg-bongo-pink text-white" : "bg-white"}`}
            >
              {k}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/admin/content?key=${key}&locale=${l}`}
              className={`rounded-full border-2 border-bongo-black px-4 py-1.5 font-display text-xs uppercase ${l === locale ? "bg-bongo-cyan" : "bg-white"}`}
            >
              {l}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <ContentEditor contentKey={key} locale={locale} initialJson={json} isOverridden={Boolean(override)} />
      </div>

      {override != null && (
        <form action={resetContent} className="mt-4">
          <input type="hidden" name="key" value={key} />
          <input type="hidden" name="locale" value={locale} />
          <button className="rounded-xl border-2 border-bongo-black bg-white px-4 py-2 font-display text-xs uppercase hover:bg-bongo-yellow">
            Nulstil til standardtekst
          </button>
        </form>
      )}
    </div>
  );
}
