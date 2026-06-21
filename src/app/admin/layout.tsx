import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Bongo's Bingo",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-bongo-cream text-bongo-black font-body">{children}</div>;
}
