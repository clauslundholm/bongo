import Image from "next/image";

const CHARS = [
  "unicorn",
  "strong-duck",
  "blowey",
  "henry-hoover",
  "dancer1",
  "dancer2",
  "host",
  "69-ball",
];

export default function CharacterParade() {
  const doubled = [...CHARS, ...CHARS];
  return (
    <div className="relative overflow-hidden border-y-4 border-bongo-black bg-bongo-black py-6">
      <div className="flex w-max items-center gap-12 animate-marquee-fast">
        {doubled.map((c, i) => (
          <div key={i} className="shrink-0">
            <Image
              src={`/characters/${c}.png`}
              alt=""
              width={120}
              height={120}
              className="h-20 w-auto sm:h-28 drop-shadow-[4px_4px_0_rgba(255,31,162,0.6)] transition hover:scale-110 hover:-rotate-6"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
