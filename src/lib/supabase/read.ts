import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./env";

/**
 * Anon read-only client for public data (RLS-restricted to published rows).
 * Works without a request context (usable in generateStaticParams).
 * Returns null when Supabase isn't configured → callers fall back to seed data.
 */
export function createSupabaseReadClient() {
  if (!isSupabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
