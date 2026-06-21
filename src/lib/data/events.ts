import type { BongoEvent, EventStatus } from "@/data/events";
import { events as seedEvents, sortedEvents } from "@/data/events";
import { createSupabaseReadClient } from "@/lib/supabase/read";

export interface EventRow {
  id: string;
  slug: string;
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

/** Published events, sorted by date. Falls back to seed data when no DB. */
export async function getEvents(): Promise<BongoEvent[]> {
  const sb = createSupabaseReadClient();
  if (!sb) return sortedEvents();
  const { data, error } = await sb
    .from("events")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: true });
  if (error || !data) return sortedEvents();
  return (data as EventRow[]).map(mapRow);
}

export async function getEventBySlug(slug: string): Promise<BongoEvent | undefined> {
  const sb = createSupabaseReadClient();
  if (!sb) return seedEvents.find((e) => e.slug === slug);
  const { data } = await sb
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return data ? mapRow(data as EventRow) : undefined;
}

/** Slugs for static generation (seed fallback keeps builds working offline). */
export async function getEventSlugs(): Promise<string[]> {
  const sb = createSupabaseReadClient();
  if (!sb) return seedEvents.map((e) => e.slug);
  const { data, error } = await sb.from("events").select("slug").eq("published", true);
  if (error || !data) return seedEvents.map((e) => e.slug);
  return (data as { slug: string }[]).map((r) => r.slug);
}
