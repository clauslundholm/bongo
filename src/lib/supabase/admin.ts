import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  isSupabaseAdminConfigured,
} from "./env";

/**
 * Privileged service-role client. Bypasses RLS — use ONLY in server-side
 * admin code and trusted server actions. Never import into client components.
 */
export function createSupabaseAdminClient(): SupabaseClient | null {
  if (!isSupabaseAdminConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
