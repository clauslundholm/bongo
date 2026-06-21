# 🎉 Bongo's Bingo — Next.js

The Original Bingo Experience. A crazy, funky, fest-fyldt website built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and **Framer Motion** — inspired by [bongosbingo.dk](https://www.bongosbingo.dk).

Pink 💖 · Gul 💛 · Sort 🖤

## ✨ Features

- **5 sprog** — Dansk (default), Norsk, Svensk, Suomi, Føroyskt — med sprog-switcher i menuen. Auto-detektering via browser-sprog.
- **Alle sider oprettet:** Forside, Shows (oversigt), Show-detalje (pr. event), Hvad er Bongo's (om), FAQ, Kontakt, Privatlivspolitik, 404.
- **Alle events oprettet** — 12 shows på tværs af danske byer (København, Aarhus, Odense, Aalborg, Esbjerg). Hver med egen detaljeside.
- **Masser af interaction:** baggrundsvideo i hero, konfetti-knapper 🎊, flydende maskotter, marquee-bånd, character-parade, scroll-reveals, FAQ-accordion, event-filter, animerede menuer.
- **Social feed:** rigtige TikTok-embeds + et kurateret socials-grid (#bongosbingodk).
- **Billetter** linker direkte til Paylogic, ligesom det rigtige site.
- **Brand-farver** pink / gul / sort gennemgående.

## 🚀 Kør lokalt

```bash
npm install
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000) — du sendes automatisk til `/da`.

## 🏗️ Build

```bash
npm run build
npm start
```

## ☁️ Deploy til Vercel

1. Push projektet til GitHub/GitLab.
2. Importér repoet på [vercel.com](https://vercel.com) — Next.js detekteres automatisk (`vercel.json` er inkluderet).
3. Ingen miljøvariabler er nødvendige. Klik **Deploy**.

Eller via CLI:

```bash
npm i -g vercel
vercel
```

## 📁 Struktur

```
src/
  app/
    layout.tsx              # rod-layout + fonts
    page.tsx                # redirect → /da
    not-found.tsx           # funky 404
    [locale]/
      layout.tsx            # navbar + footer pr. sprog
      page.tsx              # forside
      events/page.tsx       # alle shows + filter
      events/[slug]/page.tsx# show-detalje (Paylogic-link)
      om/page.tsx           # Hvad er Bongo's Bingo
      faq/page.tsx          # FAQ-accordion
      kontakt/page.tsx      # kontaktformular
      privacy/page.tsx      # privatlivspolitik
  components/               # Hero, Navbar, EventCard, SocialFeed, ...
  data/events.ts            # alle events (tilføj/ret her)
  i18n/                     # config + dictionaries (5 sprog)
  lib/confetti.ts           # konfetti-burst
  lib/supabase/             # server/admin/browser/read clients + env
  lib/data/                 # events + page-content data-access (DB → seed fallback)
  lib/admin-data.ts         # admin reads (service role)
  app/admin/                # admin-område (login + dashboard)
  app/actions.ts            # nyhedsbrev + kontakt server actions
  proxy.ts                  # sprog-routing + Supabase session
supabase/migrations/        # SQL-skema (kør i Supabase)
public/characters/          # maskotter + logo
```

## 🗄️ Supabase + Admin

Sitet kan køre i to tilstande:

- **Uden Supabase** (standard): events kommer fra `src/data/events.ts`, og nyhedsbrev/kontakt-formularer kvitterer pænt uden at gemme. Alt virker ud af boksen.
- **Med Supabase:** events, nyhedsbrev-tilmeldinger, kontaktbeskeder og sidetekster ligger i databasen og styres fra `/admin`.

### Sådan slår du Supabase til

1. Opret et projekt på [supabase.com](https://supabase.com).
2. Åbn **SQL Editor** og kør hele `supabase/migrations/0001_init.sql` (opretter tabeller, RLS og seed-data).
3. Kopiér `.env.example` → `.env.local` og udfyld:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` (samme side — **kun server, hold hemmelig**)
   - `ADMIN_EMAILS` = kommasepareret liste af emails der må logge ind på `/admin`
4. Opret din admin-bruger i **Authentication → Users → Add user** (email + password). Emailen skal stå i `ADMIN_EMAILS`.
5. Genstart `npm run dev` og log ind på **`/admin`**.

### Admin-området (`/admin`)

- **Shows** — opret, rediger, slet, og udgiv/skjul events (CRUD).
- **Nyhedsbrev** — se tilmeldte og eksportér som CSV.
- **Beskeder** — læs kontaktbeskeder, markér som læst.
- **Indhold** — rediger sidetekster (om / virksomheder / festivaller / how-to-bingo) pr. sprog som JSON. Tomt = standardtekst fra ordbogen.

Login bruger Supabase Auth (email/password) og er låst til `ADMIN_EMAILS`. Skrivninger går via service-role-nøglen server-side; offentlige læsninger er beskyttet af RLS (kun udgivne events).

Datatabeller: `events`, `newsletter_subscribers`, `contact_messages`, `page_content`.

## 🛠️ Tilpasning

- **Tilføj et show:** via `/admin` (med Supabase) — ellers rediger `src/data/events.ts`.
- **Ret tekster/oversættelser:** `/admin` → Indhold, eller `src/i18n/dictionaries.ts` for standardteksten.
- **Skift farver:** `tailwind.config.ts` (`bongo.pink`, `bongo.yellow`, `bongo.black` …).
- **Skift billet-link:** konstanten `PAYLOGIC` i `src/data/events.ts` (og seed-SQL).

---

It's Not Just Bingo — It's Bongo's Bingo. 💖💛🖤
# bongo
