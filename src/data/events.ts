export type EventStatus = "onsale" | "fewleft" | "soldout" | "new";

export interface BongoEvent {
  slug: string;
  locale?: string;
  city: string;
  venue: string;
  address: string;
  date: string; // ISO date
  doors: string; // HH:mm
  start: string; // HH:mm
  priceFrom: number;
  currency: string;
  status: EventStatus;
  image: string;
  ticketUrl: string;
  weeztixUrl?: string;
  accent: "pink" | "yellow" | "cyan" | "purple";
}

// Default Paylogic shop link used on the live site.
const PAYLOGIC = "https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet";

const img = (n: number) =>
  [
    "https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg",
    "https://www.bongosbingo.fi/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg",
  ][n % 2];

export const events: BongoEvent[] = [
  {
    slug: "kobenhavn-2026-07-04",
    city: "København",
    venue: "VEGA",
    address: "Enghavevej 40, 1674 København V",
    date: "2026-07-04",
    doors: "18:00",
    start: "19:00",
    priceFrom: 249,
    currency: "DKK",
    status: "fewleft",
    image: img(0),
    ticketUrl: PAYLOGIC,
    accent: "pink",
  },
  {
    slug: "kobenhavn-2026-07-05",
    city: "København",
    venue: "VEGA",
    address: "Enghavevej 40, 1674 København V",
    date: "2026-07-05",
    doors: "18:00",
    start: "19:00",
    priceFrom: 249,
    currency: "DKK",
    status: "soldout",
    image: img(1),
    ticketUrl: PAYLOGIC,
    accent: "yellow",
  },
  {
    slug: "aarhus-2026-07-18",
    city: "Aarhus",
    venue: "Train",
    address: "Toldbodgade 6, 8000 Aarhus C",
    date: "2026-07-18",
    doors: "18:30",
    start: "19:30",
    priceFrom: 229,
    currency: "DKK",
    status: "onsale",
    image: img(0),
    ticketUrl: PAYLOGIC,
    accent: "cyan",
  },
  {
    slug: "odense-2026-08-01",
    city: "Odense",
    venue: "Posten",
    address: "Østre Stationsvej 35, 5000 Odense C",
    date: "2026-08-01",
    doors: "18:30",
    start: "19:30",
    priceFrom: 229,
    currency: "DKK",
    status: "new",
    image: img(1),
    ticketUrl: PAYLOGIC,
    accent: "purple",
  },
  {
    slug: "aalborg-2026-08-15",
    city: "Aalborg",
    venue: "Studenterhuset",
    address: "Gammeltorv 10, 9000 Aalborg",
    date: "2026-08-15",
    doors: "18:30",
    start: "19:30",
    priceFrom: 219,
    currency: "DKK",
    status: "onsale",
    image: img(0),
    ticketUrl: PAYLOGIC,
    accent: "pink",
  },
  {
    slug: "kobenhavn-2026-08-29",
    city: "København",
    venue: "Pumpehuset",
    address: "Studiestræde 52, 1554 København V",
    date: "2026-08-29",
    doors: "18:00",
    start: "19:00",
    priceFrom: 259,
    currency: "DKK",
    status: "onsale",
    image: img(1),
    ticketUrl: PAYLOGIC,
    accent: "yellow",
  },
  {
    slug: "esbjerg-2026-09-12",
    city: "Esbjerg",
    venue: "Tobakken",
    address: "Gasværksgade 2, 6700 Esbjerg",
    date: "2026-09-12",
    doors: "18:30",
    start: "19:30",
    priceFrom: 219,
    currency: "DKK",
    status: "new",
    image: img(0),
    ticketUrl: PAYLOGIC,
    accent: "cyan",
  },
  {
    slug: "aarhus-2026-09-26",
    city: "Aarhus",
    venue: "Train",
    address: "Toldbodgade 6, 8000 Aarhus C",
    date: "2026-09-26",
    doors: "18:30",
    start: "19:30",
    priceFrom: 229,
    currency: "DKK",
    status: "onsale",
    image: img(1),
    ticketUrl: PAYLOGIC,
    accent: "purple",
  },
  {
    slug: "kobenhavn-2026-10-10",
    city: "København",
    venue: "Store VEGA",
    address: "Enghavevej 40, 1674 København V",
    date: "2026-10-10",
    doors: "18:00",
    start: "19:00",
    priceFrom: 269,
    currency: "DKK",
    status: "onsale",
    image: img(0),
    ticketUrl: PAYLOGIC,
    accent: "pink",
  },
  {
    slug: "odense-2026-10-24",
    city: "Odense",
    venue: "Posten",
    address: "Østre Stationsvej 35, 5000 Odense C",
    date: "2026-10-24",
    doors: "18:30",
    start: "19:30",
    priceFrom: 229,
    currency: "DKK",
    status: "onsale",
    image: img(1),
    ticketUrl: PAYLOGIC,
    accent: "yellow",
  },
  {
    slug: "aalborg-2026-11-07",
    city: "Aalborg",
    venue: "Studenterhuset",
    address: "Gammeltorv 10, 9000 Aalborg",
    date: "2026-11-07",
    doors: "18:30",
    start: "19:30",
    priceFrom: 219,
    currency: "DKK",
    status: "new",
    image: img(0),
    ticketUrl: PAYLOGIC,
    accent: "cyan",
  },
  {
    slug: "kobenhavn-2026-12-31",
    city: "København",
    venue: "Store VEGA",
    address: "Enghavevej 40, 1674 København V",
    date: "2026-12-31",
    doors: "19:00",
    start: "20:00",
    priceFrom: 349,
    currency: "DKK",
    status: "new",
    image: img(1),
    ticketUrl: PAYLOGIC,
    accent: "purple",
  },
];

export function getEvent(slug: string): BongoEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function sortedEvents(): BongoEvent[] {
  return [...events].sort((a, b) => a.date.localeCompare(b.date));
}

const monthNames: Record<string, string[]> = {
  da: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
  no: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
  sv: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
  fi: ["tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mar", "jou"],
  fo: ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
};

export function formatEventDate(date: string, locale: string) {
  const d = new Date(date + "T00:00:00");
  const months = monthNames[locale] ?? monthNames.da;
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: months[d.getMonth()].toUpperCase(),
    year: d.getFullYear(),
    weekday: d.toLocaleDateString(
      locale === "fo" ? "da" : locale === "no" ? "nb" : locale,
      { weekday: "long" }
    ),
  };
}
