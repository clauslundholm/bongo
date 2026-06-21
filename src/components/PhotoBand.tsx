import Image from "next/image";
import type { ReactNode } from "react";

export default function PhotoBand({
  src,
  alt = "",
  height = "h-[55vh] min-h-[360px]",
  children,
  position = "object-center",
}: {
  src: string;
  alt?: string;
  height?: string;
  children?: ReactNode;
  position?: string;
}) {
  return (
    <section className={`relative w-full overflow-hidden border-y-4 border-bongo-black ${height}`}>
      <Image src={src} alt={alt} fill priority={false} className={`object-cover ${position}`} sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-bongo-black/80 via-bongo-black/20 to-bongo-black/40" />
      {children && (
        <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
          {children}
        </div>
      )}
    </section>
  );
}
