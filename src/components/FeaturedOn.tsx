import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries";

const LOGOS = [
  "logo-radio-one",
  "logo-capital-fm",
  "logo-sky",
  "logo-one-show",
  "logo-bbc",
  "logo-metro",
  "logo-ladbible",
  "logo-itn",
  "logo-the-guardian",
  "logo-wall-street-journal",
];

export default function FeaturedOn({ dict }: { dict: Dictionary }) {
  return (
    <section className="bg-white section-pad">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl sm:text-4xl text-bongo-black">{dict.featured.title}</h2>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {LOGOS.map((logo) => (
            <div
              key={logo}
              className="flex items-center justify-center rounded-2xl border-2 border-bongo-black/10 bg-bongo-cream p-4 grayscale transition hover:grayscale-0 hover:border-bongo-pink"
            >
              <Image
                src={`https://bongosbingo.dk/wp-content/uploads/2026/01/${logo}-1024x582.png`}
                alt={logo}
                width={160}
                height={90}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
