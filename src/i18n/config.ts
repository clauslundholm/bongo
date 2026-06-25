export const locales = ["da", "no", "sv", "fi", "fo"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "da";

export const localeNames: Record<Locale, string> = {
  da: "Dansk",
  no: "Norsk",
  sv: "Svenska",
  fi: "Suomi",
  fo: "Føroyskt",
};

export const localeFlags: Record<Locale, string> = {
  da: "🇩🇰",
  no: "🇳🇴",
  sv: "🇸🇪",
  fi: "🇫🇮",
  fo: "🇫🇴",
};

/**
 * Format guard for a locale-looking path segment (2–3 lowercase letters).
 * The authoritative "is this an active language" check happens in the
 * [locale] layout against the languages table.
 */
export function isLocale(value: string): value is Locale {
  return /^[a-z]{2,3}$/.test(value);
}
