import { createSupabaseServerClient } from "./supabase/server";
import { createSupabaseAdminClient } from "./supabase/admin";
import { isAdminEmail } from "./supabase/env";
import type { User } from "@supabase/supabase-js";

/** Returns the signed-in user, or null. */
export async function getSessionUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/**
 * True if the email is an admin — either in the ADMIN_EMAILS env bootstrap
 * or in the `admins` table (managed from the admin UI).
 */
export async function isAdmin(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  const e = email.toLowerCase();
  if (isAdminEmail(e)) return true; // env bootstrap
  const sb = createSupabaseAdminClient();
  if (!sb) return false;
  const { data } = await sb.from("admins").select("email").eq("email", e).maybeSingle();
  return Boolean(data);
}

/** Returns the user only if signed in AND an admin, else null. */
export async function getAdminUser(): Promise<User | null> {
  const user = await getSessionUser();
  if (!user || !(await isAdmin(user.email))) return null;
  return user;
}
