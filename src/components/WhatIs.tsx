import Image from "next/image";
import Reveal from "./Reveal";
import PhotoFrame from "./PhotoFrame";
import ConfettiButton from "./ConfettiButton";
import type { Dictionary } from "@/i18n/dictionaries";

export default function WhatIs({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative bg-bongo-pink bg-logo-pattern section-pad overflow-hidden">
      <Image
        src="/characters/dancer1.png"
        alt=""
        width={260}
        height={260}
        className="pointer-events-none absolute -bottom-4 right-2 hidden w-44 animate-float md:block"
      />
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-display uppercase text-bongo-yellow text-xl">{dict.whatis.kicker}</p>
          <h2 className="text-5xl sm:text-7xl text-white text-stroke">{dict.whatis.title}</h2>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="space-y-4 font-body text-white text-lg">
              <p>{dict.whatis.p1}</p>
              <p>{dict.whatis.p2}</p>
              <p>{dict.whatis.p3}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-pop p-6">
              <h3 className="text-2xl text-bongo-pink">{dict.whatis.listTitle}</h3>
              <ul className="mt-4 space-y-2">
                {dict.whatis.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-bongo-black">
                    <span className="mt-1 inline-block h-5 w-5 shrink-0 rounded-full border-2 border-bongo-black bg-bongo-yellow text-center text-xs font-bold leading-4">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-display uppercase text-sm text-bongo-black/70">{dict.whatis.everyone}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <PhotoFrame src="/photos/DSC09826.webp" alt="Dance-off på scenen" caption="Dance-offs" rotate="-rotate-1" />
            <PhotoFrame src="/photos/DSC05983.webp" alt="Bingoborde" caption="Bingo-tid" rotate="rotate-1" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-6 text-center">
            <p className="disco-text font-display uppercase text-2xl sm:text-4xl">{dict.whatis.slogan}</p>
            <ConfettiButton className="btn-yellow text-lg" href="https://shop.paylogic.com/45cf201e07dd425ab1a4f00ef2562b85/billet" external>
              {dict.whatis.cta}
            </ConfettiButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
