export default function Marquee({
  items,
  reverse = false,
  className = "bg-bongo-yellow text-bongo-black",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`relative overflow-hidden border-y-4 border-bongo-black py-3 ${className}`}>
      <div
        className={`flex w-max gap-8 whitespace-nowrap ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-display uppercase text-xl sm:text-2xl tracking-tight">
            {item}
            <span className="text-bongo-pink">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
