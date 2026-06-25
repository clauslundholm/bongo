"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getAdminUser } from "@/lib/auth";
import { adminEmails } from "@/lib/supabase/env";
import { locales } from "@/i18n/config";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type FormState = { ok?: boolean; error?: string };

async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}

function revalidatePublic() {
  revalidatePath("/", "layout");
  // Bust the concrete localized routes too, so ISR-cached pages update immediately.
  for (const l of locales) {
    revalidatePath(`/${l}`);
    revalidatePath(`/${l}/events`);
    revalidatePath(`/${l}/festivaller`);
    revalidatePath(`/${l}/erhverv`);
    revalidatePath(`/${l}/how-to-bingo`);
    revalidatePath(`/${l}/om`);
  }
}

function eventFromForm(form: FormData) {
  const num = Number(form.get("price_from"));
  const locale = String(form.get("locale") ?? "da").trim();
  return {
    slug: String(form.get("slug") ?? "").trim(),
    locale: ["da", "no", "sv", "fi", "fo"].includes(locale) ? locale : "da",
    city: String(form.get("city") ?? "").trim(),
    venue: String(form.get("venue") ?? "").trim(),
    address: String(form.get("address") ?? "").trim(),
    event_date: String(form.get("event_date") ?? "").trim(),
    doors: String(form.get("doors") ?? "").trim(),
    starts: String(form.get("starts") ?? "").trim(),
    price_from: Number.isFinite(num) ? Math.max(0, Math.round(num)) : 0,
    currency: String(form.get("currency") ?? "DKK").trim() || "DKK",
    status: String(form.get("status") ?? "onsale").trim(),
    image: String(form.get("image") ?? "").trim(),
    accent: String(form.get("accent") ?? "pink").trim(),
    ticket_url: String(form.get("ticket_url") ?? "").trim(),
    weeztix_shop_url: String(form.get("weeztix_shop_url") ?? "").trim(),
    published: form.get("published") === "on" || form.get("published") === "true",
  };
}

export async function saveEvent(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return { error: "Supabase er ikke konfigureret." };

  const id = String(form.get("id") ?? "").trim();
  const values = eventFromForm(form);

  if (!values.slug || !values.city || !values.venue || !values.event_date) {
    return { error: "Udfyld mindst slug, by, venue og dato." };
  }

  if (id) {
    const { error } = await sb.from("events").update(values).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { error } = await sb.from("events").insert(values);
    if (error) return { error: error.message };
  }

  revalidatePublic();
  redirect("/admin/events");
}

export async function deleteEvent(form: FormData) {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return;
  const id = String(form.get("id") ?? "");
  if (id) await sb.from("events").delete().eq("id", id);
  revalidatePublic();
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function toggleMessageHandled(form: FormData) {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return;
  const id = String(form.get("id") ?? "");
  const handled = form.get("handled") === "true";
  if (id) await sb.from("contact_messages").update({ handled }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteSubscriber(form: FormData) {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return;
  const id = String(form.get("id") ?? "");
  if (id) await sb.from("newsletter_subscribers").delete().eq("id", id);
  revalidatePath("/admin/subscribers");
}

export async function saveContent(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return { error: "Supabase er ikke konfigureret." };

  const key = String(form.get("key") ?? "").trim();
  const locale = String(form.get("locale") ?? "").trim();
  const raw = String(form.get("data") ?? "").trim();

  if (!key || !locale) return { error: "Manglende key/locale." };

  let parsed: unknown;
  try {
    parsed = raw ? JSON.parse(raw) : {};
  } catch {
    return { error: "Ugyldig JSON — tjek syntaksen." };
  }

  const { error } = await sb
    .from("page_content")
    .upsert({ key, locale, data: parsed }, { onConflict: "key,locale" });
  if (error) return { error: error.message };

  revalidatePublic();
  return { ok: true };
}

export async function setContentLocale(form: FormData) {
  await requireAdmin();
  const locale = String(form.get("locale") ?? "da").trim();
  const key = String(form.get("key") ?? "about").trim();
  const cookieStore = await cookies();
  cookieStore.set("admin_locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  redirect(`/admin/content?key=${key}&locale=${locale}`);
}

export async function resetContent(form: FormData) {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return;
  const key = String(form.get("key") ?? "");
  const locale = String(form.get("locale") ?? "");
  if (key && locale) await sb.from("page_content").delete().eq("key", key).eq("locale", locale);
  revalidatePublic();
  revalidatePath("/admin/content");
}

/* ───────────────── Media library ───────────────── */

const MEDIA_BUCKET = "media";

function safeFileBase(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[^\w.\- ]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .slice(0, 80) || "fil";
}

export async function uploadMedia(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return { error: "Supabase er ikke konfigureret." };

  const files = form.getAll("file").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Vælg mindst én fil." };

  for (const file of files) {
    const dot = file.name.lastIndexOf(".");
    const ext = dot >= 0 ? file.name.slice(dot + 1).toLowerCase() : "";
    const base = safeFileBase(dot >= 0 ? file.name.slice(0, dot) : file.name);
    const path = `${Date.now()}-${base}${ext ? "." + ext : ""}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error } = await sb.storage.from(MEDIA_BUCKET).upload(path, bytes, {
      contentType: file.type || undefined,
      upsert: false,
    });
    if (error) return { error: error.message };
  }

  revalidatePath("/admin/media");
  return { ok: true };
}

export async function deleteMedia(form: FormData) {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return;
  const name = String(form.get("name") ?? "").trim();
  if (name) await sb.storage.from(MEDIA_BUCKET).remove([name]);
  revalidatePath("/admin/media");
}

export async function renameMedia(form: FormData) {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return;
  const from = String(form.get("from") ?? "").trim();
  let to = String(form.get("to") ?? "").trim();
  if (!from || !to) return;

  // keep original extension if the new name dropped it
  const fromDot = from.lastIndexOf(".");
  const fromExt = fromDot >= 0 ? from.slice(fromDot) : "";
  const toDot = to.lastIndexOf(".");
  const toBase = toDot >= 0 ? to.slice(0, toDot) : to;
  to = safeFileBase(toBase) + (toDot >= 0 ? to.slice(toDot) : fromExt);

  if (from !== to) await sb.storage.from(MEDIA_BUCKET).move(from, to);
  revalidatePath("/admin/media");
}

/* ───────────────── Languages ───────────────── */

export async function createLanguage(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return { error: "Supabase er ikke konfigureret." };

  const code = String(form.get("code") ?? "").trim().toLowerCase();
  const name = String(form.get("name") ?? "").trim();
  const flag = String(form.get("flag") ?? "").trim();

  if (!/^[a-z]{2,3}$/.test(code)) return { error: "Ugyldig sprogkode — brug 2–3 små bogstaver (fx en, de)." };
  if (!name) return { error: "Angiv et navn for sproget." };

  const { error } = await sb
    .from("languages")
    .upsert({ code, name, flag, enabled: true, sort: 99 }, { onConflict: "code" });
  if (error) return { error: error.message };

  revalidatePublic();
  revalidatePath("/admin/languages");
  return { ok: true };
}

export async function toggleLanguage(form: FormData) {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return;
  const code = String(form.get("code") ?? "").trim();
  const enabled = form.get("enabled") === "true";
  if (code === "da" && !enabled) return; // never disable the default language
  if (code) await sb.from("languages").update({ enabled }).eq("code", code);
  revalidatePublic();
  revalidatePath("/admin/languages");
}

export async function deleteLanguage(form: FormData) {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return;
  const code = String(form.get("code") ?? "").trim();
  if (code === "da") return; // never delete the default language
  if (code) await sb.from("languages").delete().eq("code", code);
  revalidatePublic();
  revalidatePath("/admin/languages");
}

/* ───────────────── Admin users ───────────────── */

export async function createAdmin(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return { error: "Supabase er ikke konfigureret." };

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const name = String(form.get("name") ?? "").trim();
  const password = String(form.get("password") ?? "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Ugyldig email." };
  if (password.length < 8) return { error: "Adgangskoden skal være mindst 8 tegn." };

  // Create the Supabase Auth login (confirmed so they can log in straight away).
  const { error: createErr } = await sb.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  // If the user already exists, that's fine — we still add them to the allowlist.
  if (createErr && !/registered|already|exists/i.test(createErr.message)) {
    return { error: createErr.message };
  }

  const { error } = await sb.from("admins").upsert({ email, name: name || null }, { onConflict: "email" });
  if (error) return { error: error.message };

  revalidatePath("/admin/users");
  return { ok: true };
}

export async function revokeAdmin(form: FormData) {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return;
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!email) return;

  // Don't let an admin revoke their own access (avoid lock-out).
  const me = await getAdminUser();
  if (me?.email?.toLowerCase() === email) return;
  // Env-bootstrap admins can't be revoked here (managed via ADMIN_EMAILS).
  if (adminEmails().includes(email)) return;

  await sb.from("admins").delete().eq("email", email);
  revalidatePath("/admin/users");
}

export async function setAdminPassword(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const sb = createSupabaseAdminClient();
  if (!sb) return { error: "Supabase er ikke konfigureret." };

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  if (!email) return { error: "Manglende email." };
  if (password.length < 8) return { error: "Adgangskoden skal være mindst 8 tegn." };

  // Find the auth user by email.
  const { data, error: listErr } = await sb.auth.admin.listUsers();
  if (listErr) return { error: listErr.message };
  const user = data.users.find((u) => u.email?.toLowerCase() === email);
  if (!user) return { error: "Brugeren findes ikke i Supabase Auth." };

  const { error } = await sb.auth.admin.updateUserById(user.id, { password });
  if (error) return { error: error.message };
  return { ok: true };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}
