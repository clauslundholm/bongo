import Link from "next/link";
import { adminCounts } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const c = await adminCounts();

  const cards = [
    { label: "Shows", value: c.events, href: "/admin/events", accent: "bg-admin-yellow-soft text-admin-yellow-text" },
    { label: "Nyhedsbrev-tilmeldte", value: c.subscribers, href: "/admin/subscribers", accent: "bg-admin-green text-admin-green-text" },
    { label: "Beskeder", value: c.messages, href: "/admin/messages", accent: "bg-admin-peach text-admin-peach-text" },
    { label: "Ulæste beskeder", value: c.unhandled, href: "/admin/messages", accent: "bg-admin-ink text-white" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-admin-ink">Dashboard</h1>
      <p className="mt-1 text-admin-muted">Overblik over showet 🎉</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="pp-card p-6 transition hover:-translate-y-0.5">
            <span className={`pp-badge ${card.accent}`}>{card.label}</span>
            <div className="mt-4 text-5xl font-bold text-admin-ink">{card.value}</div>
          </Link>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/admin/events/new" className="pp-btn-dark">+ Nyt show</Link>
        <Link href="/admin/content" className="pp-btn-ghost">Rediger indhold</Link>
        <Link href="/da" target="_blank" className="pp-btn-ghost">Se siden ↗</Link>
      </div>
    </div>
  );
}
