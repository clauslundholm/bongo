-- Bongo's Bingo — Weeztix ticket shop per event
-- Each event gets its own Weeztix shop URL (from the Weeztix dashboard → Shops →
-- "Show integration code" / shop link). The site embeds it in an in-page modal.

alter table public.events
  add column if not exists weeztix_shop_url text not null default '';
