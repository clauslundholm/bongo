import Link from "next/link";
import { adminCounts } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const c = await adminCounts();

  const cards = [
    { label: "Shows", value: c.events, href: "/admin/events", color: "bg-bongo-pink text-white" },
    { label: "Nyhedsbrev-tilmeldte", value: c.subscribers, href: "/admin/subscribers", color: "bg-bongo-cyan text-bongo-black" },
    { label: "Beskeder", value: c.messages, href: "/admin/messages", color: "bg-bongo-yellow text-bongo-black" },
    { label: "Ulæste beskeder", value: c.unhandled, href: "/admin/messages", color: "bg-bongo-purple text-white" },
  ];

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-bongo-black">Dashboard</h1>
      <p className="mt-2 font-body text-bongo-black/70">Overblik over showet 🎉</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`rounded-3xl border-4 border-bongo-black p-6 shadow-pop transition hover:-translate-y-1 ${card.color}`}
          >
            <div className="font-display text-5xl">{card.value}</div>
            <div className="mt-2 font-display text-sm uppercase">{card.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/admin/events/new" className="btn-pink">+ Nyt show</Link>
        <Link href="/admin/content" className="btn-white">Rediger indhold</Link>
        <Link href="/da" className="btn-white" target="_blank">Se siden ↗</Link>
      </div>
    </div>
  );
}
