"use client";

export default function TikTokEmbed({
  user,
  videoId,
  caption,
}: {
  user: string;
  videoId: string;
  caption: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[325px]">
      <div className="overflow-hidden rounded-3xl border-4 border-bongo-black bg-white shadow-pop">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          title={`TikTok @${user}`}
          loading="lazy"
          allow="encrypted-media; fullscreen"
          className="h-[575px] w-full"
          style={{ border: "none" }}
        />
      </div>
      <a
        href={`https://www.tiktok.com/@${user}/video/${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block px-1 font-body text-sm text-white/70 hover:text-bongo-yellow"
      >
        <span className="font-display uppercase text-bongo-pink">@{user}</span> — {caption}
      </a>
    </div>
  );
}
