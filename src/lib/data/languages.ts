import { createSupabaseReadClient } from "@/lib/supabase/read";
import { locales, localeNames, localeFlags } from "@/i18n/config";

export interface Language {
  code: string;
  name: string;
  flag: string;
}

/** Built-in languages used when Supabase isn't configured. */
function fallback(): Language[] {
  return locales.map((c) => ({ code: c, name: localeNames[c], flag: localeFlags[c] }));
}

/** Enabled languages, sorted. Falls back to the built-in 5 when no DB / empty. */
export async function getActiveLanguages(): Promise<Language[]> {
  const sb = createSupabaseReadClient();
  if (!sb) return fallback();
  const { data, error } = await sb
    .from("languages")
    .select("code, name, flag")
    .eq("enabled", true)
    .order("sort", { ascending: true });
  if (error || !data || data.length === 0) return fallback();
  return data as Language[];
}

export async function getActiveLanguageCodes(): Promise<string[]> {
  return (await getActiveLanguages()).map((l) => l.code);
}
