import type { BongoEvent, EventStatus } from "@/data/events";
import { events as seedEvents, sortedEvents } from "@/data/events";
import { createSupabaseReadClient } from "@/lib/supabase/read";

export interface EventRow {
  id: string;
  slug: string;
  locale: string;
  city: string;
  venue: string;
  address: string;
  event_date: string;
  doors: string;
  starts: string;
  price_from: number;
  currency: string;
  status: EventStatus;
  image: string;
  accent: BongoEvent["accent"];
  ticket_url: string;
  published: boolean;
}

export function mapRow(r: EventRow): BongoEvent {
  return {
    slug: r.slug,
    locale: r.locale,
    city: r.city,
    venue: r.venue,
    address: r.address,
    date: r.event_date,
    doors: r.doors,
    start: r.starts,
    priceFrom: r.price_from,
    currency: r.currency,
    status: r.status,
    image: r.image,
    ticketUrl: r.ticket_url,
    accent: r.accent,
  };
}

function seedFor(locale: string) {
  return sortedEvents().filter((e) => (e.locale ?? "da") === locale);
}

/** Published events for one country/locale, sorted by date. Seed fallback when no DB. */
export async function getEvents(locale: string): Promise<BongoEvent[]> {
  const sb = createSupabaseReadClient();
  if (!sb) return seedFor(locale);
  const { data, error } = await sb
    .from("events")
    .select("*")
    .eq("published", true)
    .eq("locale", locale)
    .order("event_date", { ascending: true });
  if (error || !data) return seedFor(locale);
  return (data as EventRow[]).map(mapRow);
}

export async function getEventBySlug(slug: string, locale: string): Promise<BongoEvent | undefined> {
  const sb = createSupabaseReadClient();
  if (!sb) return seedFor(locale).find((e) => e.slug === slug);
  const { data } = await sb
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("locale", locale)
    .eq("published", true)
    .maybeSingle();
  return data ? mapRow(data as EventRow) : undefined;
}

/** (locale, slug) pairs for static generation. Seed fallback keeps builds working offline. */
export async function getEventParams(): Promise<{ locale: string; slug: string }[]> {
  const sb = createSupabaseReadClient();
  if (!sb) return seedEvents.map((e) => ({ locale: e.locale ?? "da", slug: e.slug }));
  const { data, error } = await sb.from("events").select("slug, locale").eq("published", true);
  if (error || !data) return seedEvents.map((e) => ({ locale: e.locale ?? "da", slug: e.slug }));
  return (data as { slug: string; locale: string }[]).map((r) => ({ locale: r.locale, slug: r.slug }));
}
