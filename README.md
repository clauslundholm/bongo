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
  middleware.ts             # sprog-routing
public/characters/          # maskotter + logo
```

## 🛠️ Tilpasning

- **Tilføj et show:** rediger `src/data/events.ts` (kopiér et objekt, ret by/dato/venue/pris).
- **Ret tekster/oversættelser:** `src/i18n/dictionaries.ts`.
- **Skift farver:** `tailwind.config.ts` (`bongo.pink`, `bongo.yellow`, `bongo.black` …).
- **Skift billet-link:** konstanten `PAYLOGIC` i `src/data/events.ts`.

---

It's Not Just Bingo — It's Bongo's Bingo. 💖💛🖤
# bongo
