-- Bongo's Bingo — admin users managed in-app
-- Admins are stored here (in addition to the ADMIN_EMAILS env bootstrap).
-- New admins are created from admin → Administratorer (creates a Supabase Auth
-- login + adds the email here). RLS has no policies, so only the service-role
-- key (server-side admin code) can read/write it.

create table if not exists public.admins (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  name        text,
  created_at  timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Bootstrap: keep at least one admin so you can log in and add the rest.
-- (Matches the default in .env.example — change/remove as needed.)
insert into public.admins (email, name)
values ('claus@lundholm.com', 'Claus')
on conflict (email) do nothing;
