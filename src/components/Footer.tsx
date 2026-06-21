import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dots border-t-4 border-bongo-pink bg-bongo-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href={base} className="inline-block rounded-2xl bg-bongo-yellow p-3 border-4 border-bongo-black">
            <Image
              src="/characters/Bongos-Bingo-logo-Black_RGB.png"
              alt="Bongo's Bingo"
              width={150}
              height={48}
              className="h-9 w-auto"
            />
          </Link>
          <p className="mt-4 font-display uppercase text-bongo-yellow text-sm leading-snug">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <h4 className="text-bongo-pink text-lg">{dict.footer.nav}</h4>
          <ul className="mt-3 space-y-2 font-body text-white/80">
            <li><Link href={`${base}/events`} className="hover:text-bongo-yellow">{dict.nav.shows}</Link></li>
            <li><Link href={`${base}/how-to-bingo`} className="hover:text-bongo-yellow">{dict.howto.title}</Link></li>
            <li><Link href={`${base}/om`} className="hover:text-bongo-yellow">{dict.nav.about}</Link></li>
            <li><Link href={`${base}/erhverv`} className="hover:text-bongo-yellow">{dict.corp.nav}</Link></li>
            <li><Link href={`${base}/festivaller`} className="hover:text-bongo-yellow">{dict.fest.nav}</Link></li>
            <li><Link href={`${base}/faq`} className="hover:text-bongo-yellow">{dict.nav.faq}</Link></li>
            <li><Link href={`${base}/kontakt`} className="hover:text-bongo-yellow">{dict.nav.contact}</Link></li>
            <li><Link href={`${base}/privacy`} className="hover:text-bongo-yellow">{dict.footer.privacy}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-bongo-pink text-lg">{dict.footer.follow}</h4>
          <ul className="mt-3 space-y-2 font-body text-white/80">
            <li><a href="https://www.instagram.com/bongosbingodk" target="_blank" rel="noopener noreferrer" className="hover:text-bongo-yellow">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@bongosbingodk" target="_blank" rel="noopener noreferrer" className="hover:text-bongo-yellow">TikTok</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-bongo-pink text-lg">{dict.footer.nordic}</h4>
          <ul className="mt-3 space-y-2 font-body text-white/80">
            <li><a href="https://www.bongosbingo.se/" target="_blank" rel="noopener noreferrer" className="hover:text-bongo-yellow">🇸🇪 Sverige</a></li>
            <li><a href="https://www.bongosbingo.no/" target="_blank" rel="noopener noreferrer" className="hover:text-bongo-yellow">🇳🇴 Norge</a></li>
            <li><a href="https://www.bongosbingo.dk/" target="_blank" rel="noopener noreferrer" className="hover:text-bongo-yellow">🇩🇰 Danmark</a></li>
            <li><a href="https://www.bongosbingo.fi/" target="_blank" rel="noopener noreferrer" className="hover:text-bongo-yellow">🇫🇮 Suomi</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-white/15 px-5 py-5 text-center font-body text-sm text-white/60">
        Copyright © {dict.footer.rights} {year} ·{" "}
        <Link href={`${base}/privacy`} className="underline hover:text-bongo-yellow">
          {dict.footer.privacy}
        </Link>
      </div>
    </footer>
  );
}
