-- Bongo's Bingo — per-country events
-- Each event belongs to one country/language so each site only shows its own shows.

alter table public.events
  add column if not exists locale text not null default 'da';

-- constrain to the supported locales (drop first so re-runs don't fail)
alter table public.events drop constraint if exists events_locale_check;
alter table public.events
  add constraint events_locale_check check (locale in ('da','no','sv','fi','fo'));

-- existing seed events are Danish shows
update public.events set locale = 'da' where locale is null;

create index if not exists events_locale_idx on public.events (locale);
