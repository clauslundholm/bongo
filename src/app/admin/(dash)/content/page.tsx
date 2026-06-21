import Link from "next/link";
import { cookies } from "next/headers";
import BookingContentForm from "@/components/admin/BookingContentForm";
import AboutContentForm from "@/components/admin/AboutContentForm";
import HeroForm from "@/components/admin/HeroForm";
import HomeHeroForm from "@/components/admin/HomeHeroForm";
import { setContentLocale, resetContent } from "../../actions";
import { adminGetContent } from "@/lib/admin-data";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, localeNames, localeFlags, isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

const HERO_DEFAULTS = { heroVideo: "", heroImage: "", heroHeight: "auto" };

const KEYS = [
  { id: "home", label: "Forside (hero)" },
  { id: "about", label: "Hvad er Bongo's" },
  { id: "howto", label: "How to Bingo" },
  { id: "fest", label: "Events & Festivaller" },
  { id: "corp", label: "Virksomheder" },
  { id: "events", label: "Shows (hero)" },
  { id: "faq", label: "FAQ (hero)" },
  { id: "kontakt", label: "Kontakt (hero)" },
] as const;
type Key = (typeof KEYS)[number]["id"];

function fallbackFor(key: Key, locale: Locale) {
  const dict = getDictionary(locale);
  if (key === "about") return { ...dict.about, ...HERO_DEFAULTS };
  if (key === "corp") return dict.corp;
  if (key === "fest") return dict.fest;
  if (key === "howto") return dict.howto;
  if (key === "events") return { kicker: dict.upcoming.kicker, title: dict.upcoming.title, sub: dict.upcoming.sub, ...HERO_DEFAULTS };
  if (key === "faq") return { kicker: "", title: dict.faq.title, sub: dict.faq.sub, ...HERO_DEFAULTS };
  if (key === "kontakt") return { kicker: "", title: dict.contact.title, sub: dict.contact.sub, ...HERO_DEFAULTS };
  // home
  return {
    badge: dict.hero.badge,
    title1: dict.hero.title1,
    title2: dict.hero.title2,
    sub: dict.hero.sub,
    cta: dict.hero.cta,
    ...HERO_DEFAULTS,
  };
}

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; locale?: string }>;
}) {
  const sp = await searchParams;
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("admin_locale")?.value;

  const key: Key = KEYS.some((k) => k.id === sp.key) ? (sp.key as Key) : "about";
  const locale: Locale = isLocale(sp.locale ?? "")
    ? (sp.locale as Locale)
    : isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : "da";

  const override = await adminGetContent(key, locale);
  const current = (override ?? fallbackFor(key, locale)) as Record<string, unknown>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-admin-ink">Indhold</h1>
      <p className="mt-1 max-w-2xl text-admin-muted">
        Hvert sprog redigeres helt for sig — indholdet behøver ikke være ens på tværs af sprog.
      </p>

      {/* Language selector — primary control */}
      <div className="pp-card mt-6 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-admin-muted">Redigerer sprog</p>
        <div className="flex flex-wrap gap-2">
          {locales.map((l) => (
            <form key={l} action={setContentLocale}>
              <input type="hidden" name="key" value={key} />
              <input type="hidden" name="locale" value={l} />
              <button
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  l === locale
                    ? "border-admin-ink bg-admin-ink text-white"
                    : "border-admin-line bg-white text-admin-ink hover:bg-admin-panel"
                }`}
              >
                <span>{localeFlags[l]}</span>
                {localeNames[l]}
              </button>
            </form>
          ))}
        </div>
      </div>

      {/* Page selector (keeps current language) */}
      <div className="mt-5 flex flex-wrap gap-2">
        {KEYS.map((k) => (
          <Link
            key={k.id}
            href={`/admin/content?key=${k.id}&locale=${locale}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              k.id === key
                ? "border-admin-yellow bg-admin-yellow text-admin-ink"
                : "border-admin-line bg-white text-admin-ink hover:bg-admin-panel"
            }`}
          >
            {k.label}
          </Link>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-admin-muted">
        <span className="pp-badge pp-badge-new">{localeFlags[locale]} {localeNames[locale]}</span>
        <span>{override ? "Tilpasset for dette sprog" : "Viser standardtekst — gem for at tilpasse dette sprog"}</span>
      </div>

      <div className="mt-5">
        {key === "about" ? (
          <AboutContentForm contentKey={key} locale={locale} initial={current} />
        ) : key === "home" ? (
          <HomeHeroForm locale={locale} initial={current} />
        ) : key === "events" || key === "faq" || key === "kontakt" ? (
          <HeroForm contentKey={key} locale={locale} initial={current} showKicker={key === "events"} />
        ) : (
          <BookingContentForm contentKey={key} locale={locale} initial={current} />
        )}
      </div>

      {override != null && (
        <form action={resetContent} className="mt-4">
          <input type="hidden" name="key" value={key} />
          <input type="hidden" name="locale" value={locale} />
          <button className="pp-btn-ghost px-4 py-2 text-xs">Nulstil {localeNames[locale]} til standardtekst</button>
        </form>
      )}
    </div>
  );
}
