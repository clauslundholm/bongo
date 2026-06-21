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

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
