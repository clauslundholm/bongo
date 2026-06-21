import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bongo's Bingo — The Original Bingo Experience",
  description:
    "Bongo's Bingo er et vildt mix af traditionel bingo, dance offs, rave-rounds, publikumsinvolvering og masser af overraskelser. Nu i Danmark!",
  metadataBase: new URL("https://www.bongosbingo.dk"),
  openGraph: {
    title: "Bongo's Bingo — The Original Bingo Experience",
    description: "Bingo møder rave. 3 timers party-show. Nu i Danmark!",
    images: ["/characters/host.png"],
  },
  icons: { icon: "/characters/69-ball.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
