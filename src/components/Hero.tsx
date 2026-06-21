"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ConfettiButton from "./ConfettiButton";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const VIDEO = "https://www.bongosbingo.dk/wp-content/uploads/2026/01/promo-reel-nosound.mov";

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const base = `/${locale}`;
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-bongo-black">
      {/* background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        autoPlay
        muted
        loop
        playsInline
        poster="https://www.bongosbingo.dk/wp-content/uploads/2026/01/DSC07419-scaled-1-1024x683.jpg"
      >
        <source src={VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-bongo-black/40 via-bongo-pink/20 to-bongo-black" />
      <div className="bg-dots absolute inset-0 opacity-60" />

      {/* floating characters */}
      <FloatChar src="/characters/unicorn.png" className="left-[3%] top-[18%] w-24 sm:w-36" delay={0} />
      <FloatChar src="/characters/strong-duck.png" className="right-[4%] top-[14%] w-24 sm:w-40" delay={0.6} />
      <FloatChar src="/characters/blowey.png" className="left-[6%] bottom-[10%] w-20 sm:w-32" delay={1.1} />
      <FloatChar src="/characters/henry-hoover.png" className="right-[7%] bottom-[8%] w-20 sm:w-32" delay={0.3} />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-5xl flex-col items-center justify-center px-5 text-center">
        <motion.span
          initial={{ scale: 0, rotate: -8 }}
          animate={{ scale: 1, rotate: -3 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="mb-6 inline-block rounded-full border-4 border-bongo-black bg-bongo-yellow px-5 py-2 font-display uppercase text-bongo-black text-sm sm:text-base shadow-pop"
        >
          ✦ {dict.hero.badge} ✦
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl"
        >
          <span className="block text-white text-stroke">{dict.hero.title1}</span>
          <span className="block disco-text">{dict.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-2xl font-body text-base sm:text-lg text-white/90"
        >
          {dict.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <ConfettiButton className="btn-pink text-lg" href={`${base}/events`}>
            🎟️ {dict.hero.cta}
          </ConfettiButton>
          <Link href={`${base}/events`} className="btn-white text-lg">
            {dict.hero.cta2}
          </Link>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="absolute bottom-6 font-display uppercase text-xs tracking-widest text-bongo-yellow"
        >
          ↓ {dict.hero.scroll} ↓
        </motion.div>
      </div>
    </section>
  );
}

function FloatChar({ src, className, delay }: { src: string; className: string; delay: number }) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-[5] ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -16, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { repeat: Infinity, duration: 4, delay, ease: "easeInOut" },
      }}
    >
      <Image src={src} alt="" width={200} height={200} className="h-auto w-full drop-shadow-[6px_6px_0_rgba(0,0,0,0.4)]" />
    </motion.div>
  );
}
