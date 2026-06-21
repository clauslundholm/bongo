"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/env";

export type ActionResult = { ok: boolean; error?: string; demo?: boolean };

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function subscribeNewsletter(email: string, locale?: string): Promise<ActionResult> {
  const clean = (email ?? "").trim().toLowerCase();
  if (!validEmail(clean)) return { ok: false, error: "invalid_email" };

  // No DB configured → behave as a friendly no-op so the demo still works.
  if (!isSupabaseAdminConfigured) return { ok: true, demo: true };

  const sb = createSupabaseAdminClient();
  if (!sb) return { ok: true, demo: true };

  const { error } = await sb
    .from("newsletter_subscribers")
    .upsert({ email: clean, locale: locale ?? null }, { onConflict: "email" });

  if (error) return { ok: false, error: "db_error" };
  return { ok: true };
}

export async function submitContact(input: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<ActionResult> {
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim().toLowerCase();
  const message = (input.message ?? "").trim();
  if (!name || !message || !validEmail(email)) return { ok: false, error: "invalid" };

  if (!isSupabaseAdminConfigured) return { ok: true, demo: true };

  const sb = createSupabaseAdminClient();
  if (!sb) return { ok: true, demo: true };

  const { error } = await sb.from("contact_messages").insert({
    name,
    email,
    subject: (input.subject ?? "").trim() || null,
    message,
  });

  if (error) return { ok: false, error: "db_error" };
  return { ok: true };
}
