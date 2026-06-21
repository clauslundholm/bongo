import Image from "next/image";

export default function PhotoFrame({
  src,
  alt = "",
  caption,
  rotate = "rotate-2",
  ratio = "aspect-[4/3]",
  className = "",
}: {
  src: string;
  alt?: string;
  caption?: string;
  rotate?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-3xl border-4 border-bongo-black bg-white shadow-pop transition-transform duration-300 hover:rotate-0 ${rotate} ${className}`}
    >
      <div className={`relative w-full ${ratio}`}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      {caption && (
        <figcaption className="absolute bottom-3 left-3 rounded-full border-2 border-bongo-black bg-bongo-yellow px-3 py-1 font-display text-xs uppercase text-bongo-black shadow-[2px_2px_0_0_#0A0A0A]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
