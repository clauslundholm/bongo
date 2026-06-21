-- Bongo's Bingo — Supabase schema
-- Run this in the Supabase SQL editor (or via the Supabase CLI).

-- ──────────────────────────────────────────────────────────────
-- Helper: auto-update updated_at
-- ──────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ──────────────────────────────────────────────────────────────
-- events
-- ──────────────────────────────────────────────────────────────
create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  city        text not null,
  venue       text not null,
  address     text not null default '',
  event_date  date not null,
  doors       text not null default '',
  starts      text not null default '',
  price_from  integer not null default 0,
  currency    text not null default 'DKK',
  status      text not null default 'onsale'
              check (status in ('onsale','fewleft','soldout','new')),
  image       text not null default '',
  accent      text not null default 'pink'
              check (accent in ('pink','yellow','cyan','purple')),
  ticket_url  text not null default '',
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists events_date_idx on public.events (event_date);
create index if not exists events_published_idx on public.events (published);

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at before update on public.events
  for each row execute function public.set_updated_at();

-- ──────────────────────────────────────────────────────────────
-- newsletter_subscribers
-- ──────────────────────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  locale      text,
  created_at  timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────────
-- contact_messages
-- ──────────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text,
  message     text not null,
  handled     boolean not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);

-- ──────────────────────────────────────────────────────────────
-- page_content  (per-page, per-locale JSON overrides of the static dictionary)
-- key ∈ ('about','corp','fest','howto')
-- ──────────────────────────────────────────────────────────────
create table if not exists public.page_content (
  key         text not null,
  locale      text not null,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  primary key (key, locale)
);

drop trigger if exists page_content_set_updated_at on public.page_content;
create trigger page_content_set_updated_at before update on public.page_content
  for each row execute function public.set_updated_at();

-- ══════════════════════════════════════════════════════════════
-- Row Level Security
-- ══════════════════════════════════════════════════════════════
alter table public.events                enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages      enable row level security;
alter table public.page_content          enable row level security;

-- Public can read published events
drop policy if exists "events public read" on public.events;
create policy "events public read" on public.events
  for select using (published = true);

-- Public can read page content
drop policy if exists "page_content public read" on public.page_content;
create policy "page_content public read" on public.page_content
  for select using (true);

-- Anyone can subscribe to the newsletter (insert only)
drop policy if exists "newsletter public insert" on public.newsletter_subscribers;
create policy "newsletter public insert" on public.newsletter_subscribers
  for insert with check (true);

-- Anyone can submit a contact message (insert only)
drop policy if exists "contact public insert" on public.contact_messages;
create policy "contact public insert" on public.contact_messages
  for insert with check (true);

-- NOTE: All admin reads/writes go through the service-role key, which
-- bypasses RLS. No additional policies are required for the admin area.

-- ══════════════════════════════════════════════════════════════
-- Seed events (idempotent)
-- ══════════════════════════════════════════════════════════════
insert into public.events
  (slug, city, venue, address, event_date, doors, starts, price_from, currency, status, image, accent, ticket_url)
values
  ('kobenhavn-2026-07-04','København','VEGA','Enghavevej 40, 1674 København V','2026-07-04','18:00','19:00',249,'DKK','fewleft','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','pink','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('kobenhavn-2026-07-05','København','VEGA','Enghavevej 40, 1674 København V','2026-07-05','18:00','19:00',249,'DKK','soldout','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','yellow','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('aarhus-2026-07-18','Aarhus','Train','Toldbodgade 6, 8000 Aarhus C','2026-07-18','18:30','19:30',229,'DKK','onsale','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','cyan','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('odense-2026-08-01','Odense','Posten','Østre Stationsvej 35, 5000 Odense C','2026-08-01','18:30','19:30',229,'DKK','new','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','purple','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('aalborg-2026-08-15','Aalborg','Studenterhuset','Gammeltorv 10, 9000 Aalborg','2026-08-15','18:30','19:30',219,'DKK','onsale','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','pink','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('kobenhavn-2026-08-29','København','Pumpehuset','Studiestræde 52, 1554 København V','2026-08-29','18:00','19:00',259,'DKK','onsale','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','yellow','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('esbjerg-2026-09-12','Esbjerg','Tobakken','Gasværksgade 2, 6700 Esbjerg','2026-09-12','18:30','19:30',219,'DKK','new','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','cyan','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('aarhus-2026-09-26','Aarhus','Train','Toldbodgade 6, 8000 Aarhus C','2026-09-26','18:30','19:30',229,'DKK','onsale','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','purple','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('kobenhavn-2026-10-10','København','Store VEGA','Enghavevej 40, 1674 København V','2026-10-10','18:00','19:00',269,'DKK','onsale','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','pink','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('odense-2026-10-24','Odense','Posten','Østre Stationsvej 35, 5000 Odense C','2026-10-24','18:30','19:30',229,'DKK','onsale','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','yellow','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('aalborg-2026-11-07','Aalborg','Studenterhuset','Gammeltorv 10, 9000 Aalborg','2026-11-07','18:30','19:30',219,'DKK','new','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','cyan','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet'),
  ('kobenhavn-2026-12-31','København','Store VEGA','Enghavevej 40, 1674 København V','2026-12-31','19:00','20:00',349,'DKK','new','https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg','purple','https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet')
on conflict (slug) do nothing;
