import { createSupabaseServerClient } from "./supabase/server";
import { isAdminEmail } from "./supabase/env";
import type { User } from "@supabase/supabase-js";

/** Returns the signed-in user, or null. */
export async function getSessionUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/** Returns the user only if signed in AND on the admin allowlist, else null. */
export async function getAdminUser(): Promise<User | null> {
  const user = await getSessionUser();
  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}
