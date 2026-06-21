"use client";

import { useEffect, useState } from "react";
import { fireConfetti } from "@/lib/confetti";

export default function BuyTicketsButton({
  shopUrl,
  label,
  className = "btn-pink",
  soldout,
  soldoutLabel,
  title,
}: {
  shopUrl?: string;
  label: string;
  className?: string;
  soldout?: boolean;
  soldoutLabel?: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);

  if (soldout) {
    return (
      <span className={`${className} cursor-not-allowed opacity-70`} aria-disabled>
        {soldoutLabel ?? label}
      </span>
    );
  }

  if (!shopUrl) {
    // No Weeztix shop configured yet.
    return (
      <span className={`${className} cursor-not-allowed opacity-60`} aria-disabled>
        {label}
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={(e) => {
          fireConfetti(e.clientX, e.clientY);
          setOpen(true);
        }}
      >
        {label}
      </button>
      {open && <TicketModal url={shopUrl} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}

function TicketModal({ url, title, onClose }: { url: string; title?: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border-4 border-bongo-black bg-white shadow-pop-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b-4 border-bongo-black bg-bongo-yellow px-5 py-3">
          <p className="font-display uppercase text-bongo-black">{title ?? "Køb billetter"}</p>
          <button
            onClick={onClose}
            aria-label="Luk"
            className="grid h-9 w-9 place-items-center rounded-full border-2 border-bongo-black bg-white font-display text-bongo-black transition hover:bg-bongo-pink hover:text-white"
          >
            ✕
          </button>
        </div>
        <iframe
          src={url}
          title={title ?? "Weeztix"}
          className="h-full w-full flex-1 bg-white"
          allow="payment *; fullscreen"
          loading="eager"
        />
      </div>
    </div>
  );
}
