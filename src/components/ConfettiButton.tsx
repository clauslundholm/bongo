"use client";

import { fireConfetti } from "@/lib/confetti";
import type { ReactNode, MouseEvent } from "react";

export default function ConfettiButton({
  children,
  href,
  className = "btn-yellow",
  external = false,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  external?: boolean;
}) {
  function handle(e: MouseEvent) {
    fireConfetti(e.clientX, e.clientY);
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={handle}
        className={className}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <button onClick={handle} className={className} type="button">
      {children}
    </button>
  );
}
