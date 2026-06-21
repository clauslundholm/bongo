import Link from "next/link";
import Image from "next/image";
import { defaultLocale } from "@/i18n/config";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-bongo-pink bg-dots px-5 text-center">
      <Image src="/characters/unicorn.png" alt="" width={160} height={160} className="w-32 animate-float" />
      <h1 className="mt-6 text-7xl sm:text-9xl text-white text-stroke">404</h1>
      <p className="mt-4 font-display uppercase text-xl text-bongo-yellow">Den side stak af til festen 🎉</p>
      <Link href={`/${defaultLocale}`} className="btn-yellow mt-8 text-lg">
        ← Tilbage til forsiden
      </Link>
    </section>
  );
}
