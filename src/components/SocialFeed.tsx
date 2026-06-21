import Reveal from "./Reveal";
import TikTokEmbed from "./TikTokEmbed";
import type { Dictionary } from "@/i18n/dictionaries";

const TIKTOKS = [
  {
    user: "bongosbingoofficial",
    videoId: "7338396615830506785",
    caption: "If anyone was wondering how the US launch went 👀 #bongosbingo #nyc",
  },
  {
    user: "rise_festival",
    videoId: "7177706548104383749",
    caption: "A week at Rise just isn't the same without a little visit to @bongosbingoofficial 🙌🎉",
  },
  {
    user: "adventurous_anders",
    videoId: "7337089693479128363",
    caption: "The craziest Bingo experience I've been to — a four hour long extravaganza! #bongosbingo",
  },
];

// Curated social cards (Instagram / TikTok style) — visual feed.
const CURATED = [
  { handle: "@bongosbingodk", platform: "Instagram", text: "RAVE-ROUND incoming 🔥 København, er I klar?!", likes: "4.2k", tag: "#bongosbingodk", color: "bg-bongo-pink text-white" },
  { handle: "@bongosbingodk", platform: "TikTok", text: "Da hele salen sang med… gåsehud 🎤✨", likes: "12.8k", tag: "#singalong", color: "bg-bongo-yellow text-bongo-black" },
  { handle: "@bongosbingoofficial", platform: "Instagram", text: "Vandt en støvsuger til bingo igen 😂🧹", likes: "8.1k", tag: "#crazyprizes", color: "bg-bongo-cyan text-bongo-black" },
  { handle: "@bongosbingodk", platform: "TikTok", text: "KONFETTI. OVERALT. 🎉🎉🎉", likes: "21.4k", tag: "#confetti", color: "bg-bongo-purple text-white" },
  { handle: "@bongosbingodk", platform: "Instagram", text: "Dance-off finale på scenen 💃🕺", likes: "6.7k", tag: "#danceoff", color: "bg-bongo-yellow text-bongo-black" },
  { handle: "@bongosbingoofficial", platform: "TikTok", text: "It's Not Just Bingo — It's Bongo's Bingo 💖", likes: "33.9k", tag: "#bongosbingo", color: "bg-bongo-pink text-white" },
];

export default function SocialFeed({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-bongo-black bg-logo-pattern section-pad">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-display uppercase text-bongo-pink text-xl">{dict.social.kicker}</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-5xl sm:text-7xl text-white text-stroke-white">{dict.social.title}</h2>
            <div className="flex gap-3">
              <a href="https://www.tiktok.com/@bongosbingodk" target="_blank" rel="noopener noreferrer" className="btn-white text-sm">TikTok</a>
              <a href="https://www.instagram.com/bongosbingodk" target="_blank" rel="noopener noreferrer" className="btn-pink text-sm">Instagram</a>
            </div>
          </div>
          <p className="mt-4 max-w-2xl font-body text-white/70">{dict.social.sub}</p>
        </Reveal>

        {/* Curated visual feed */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CURATED.map((c, i) => (
            <Reveal key={i} delay={(i % 3) * 0.07}>
              <div className={`card-pop flex h-full flex-col justify-between p-5 ${c.color}`}>
                <div className="flex items-center justify-between">
                  <span className="font-display uppercase text-sm">{c.handle}</span>
                  <span className="tag-pill bg-white/90 text-bongo-black">{c.platform}</span>
                </div>
                <p className="my-6 font-display uppercase text-2xl leading-tight">{c.text}</p>
                <div className="flex items-center justify-between font-body text-sm">
                  <span>♥ {c.likes}</span>
                  <span className="opacity-80">{c.tag}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Real TikTok embeds */}
        <Reveal>
          <h3 className="mt-16 text-center text-3xl text-bongo-yellow">{dict.social.feedTitle}</h3>
        </Reveal>
        <div className="mt-8 grid items-start gap-8 md:grid-cols-3">
          {TIKTOKS.map((t) => (
            <TikTokEmbed key={t.videoId} user={t.user} videoId={t.videoId} caption={t.caption} />
          ))}
        </div>
      </div>
    </section>
  );
}
