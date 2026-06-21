import { createSupabaseReadClient } from "@/lib/supabase/read";

export type ContentKey = "about" | "corp" | "fest" | "howto" | "events" | "home" | "faq" | "kontakt";

/**
 * Returns the DB override for (key, locale) if present and non-empty,
 * otherwise the provided fallback (the static dictionary section).
 */
export async function getPageContent<T>(
  key: ContentKey,
  locale: string,
  fallback: T
): Promise<T> {
  const sb = createSupabaseReadClient();
  if (!sb) return fallback;
  const { data, error } = await sb
    .from("page_content")
    .select("data")
    .eq("key", key)
    .eq("locale", locale)
    .maybeSingle();
  if (error || !data?.data) return fallback;
  const obj = data.data as Record<string, unknown>;
  if (!obj || Object.keys(obj).length === 0) return fallback;
  return obj as T;
}
