import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { EventRow } from "@/lib/data/events";

export interface Subscriber {
  id: string;
  email: string;
  locale: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  handled: boolean;
  created_at: string;
}

export async function adminListEvents(): Promise<EventRow[]> {
  const sb = createSupabaseAdminClient();
  if (!sb) return [];
  const { data } = await sb.from("events").select("*").order("event_date", { ascending: true });
  return (data as EventRow[]) ?? [];
}

export async function adminGetEvent(id: string): Promise<EventRow | null> {
  const sb = createSupabaseAdminClient();
  if (!sb) return null;
  const { data } = await sb.from("events").select("*").eq("id", id).maybeSingle();
  return (data as EventRow) ?? null;
}

export async function adminListSubscribers(): Promise<Subscriber[]> {
  const sb = createSupabaseAdminClient();
  if (!sb) return [];
  const { data } = await sb
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Subscriber[]) ?? [];
}

export async function adminListMessages(): Promise<ContactMessage[]> {
  const sb = createSupabaseAdminClient();
  if (!sb) return [];
  const { data } = await sb
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as ContactMessage[]) ?? [];
}

export async function adminGetContent(key: string, locale: string): Promise<unknown | null> {
  const sb = createSupabaseAdminClient();
  if (!sb) return null;
  const { data } = await sb
    .from("page_content")
    .select("data")
    .eq("key", key)
    .eq("locale", locale)
    .maybeSingle();
  return data?.data ?? null;
}

export const MEDIA_BUCKET = "media";

export interface MediaItem {
  name: string;
  url: string;
  size: number;
  mimetype: string;
  createdAt: string;
}

export async function adminListMedia(): Promise<MediaItem[]> {
  const sb = createSupabaseAdminClient();
  if (!sb) return [];
  const { data, error } = await sb.storage.from(MEDIA_BUCKET).list("", {
    limit: 500,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error || !data) return [];
  return data
    .filter((o) => o.id) // skip folder placeholders
    .map((o) => {
      const meta = (o.metadata ?? {}) as { size?: number; mimetype?: string };
      return {
        name: o.name,
        url: sb.storage.from(MEDIA_BUCKET).getPublicUrl(o.name).data.publicUrl,
        size: meta.size ?? 0,
        mimetype: meta.mimetype ?? "",
        createdAt: o.created_at ?? "",
      };
    });
}

export interface LanguageRow {
  code: string;
  name: string;
  flag: string;
  enabled: boolean;
  sort: number;
  created_at: string;
}

export async function adminListLanguages(): Promise<LanguageRow[]> {
  const sb = createSupabaseAdminClient();
  if (!sb) return [];
  const { data } = await sb.from("languages").select("*").order("sort", { ascending: true });
  return (data as LanguageRow[]) ?? [];
}

export interface AdminRow {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
}

export async function adminListAdmins(): Promise<AdminRow[]> {
  const sb = createSupabaseAdminClient();
  if (!sb) return [];
  const { data } = await sb.from("admins").select("*").order("created_at", { ascending: true });
  return (data as AdminRow[]) ?? [];
}

export async function adminCounts() {
  const sb = createSupabaseAdminClient();
  if (!sb) return { events: 0, subscribers: 0, messages: 0, unhandled: 0 };
  const [ev, subs, msgs, unh] = await Promise.all([
    sb.from("events").select("*", { count: "exact", head: true }),
    sb.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    sb.from("contact_messages").select("*", { count: "exact", head: true }),
    sb.from("contact_messages").select("*", { count: "exact", head: true }).eq("handled", false),
  ]);
  return {
    events: ev.count ?? 0,
    subscribers: subs.count ?? 0,
    messages: msgs.count ?? 0,
    unhandled: unh.count ?? 0,
  };
}
