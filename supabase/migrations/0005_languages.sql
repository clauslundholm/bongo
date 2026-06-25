-- Bongo's Bingo — manageable languages
-- Controls which languages are available/visible. Built-in da/no/sv/fi/fo have
-- full UI translations; added languages fall back to the default-language chrome
-- until their page content is filled in under admin → Indhold.

create table if not exists public.languages (
  code        text primary key,
  name        text not null,
  flag        text not null default '',
  enabled     boolean not null default true,
  sort        integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.languages enable row level security;

drop policy if exists "languages public read" on public.languages;
create policy "languages public read" on public.languages
  for select using (true);

insert into public.languages (code, name, flag, enabled, sort) values
  ('da', 'Dansk',     '🇩🇰', true, 1),
  ('no', 'Norsk',     '🇳🇴', true, 2),
  ('sv', 'Svenska',   '🇸🇪', true, 3),
  ('fi', 'Suomi',     '🇫🇮', true, 4),
  ('fo', 'Føroyskt',  '🇫🇴', true, 5)
on conflict (code) do nothing;
