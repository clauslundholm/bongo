import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Bongo's Bingo",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-admin-panel font-body text-admin-ink antialiased">{children}</div>
  );
}
