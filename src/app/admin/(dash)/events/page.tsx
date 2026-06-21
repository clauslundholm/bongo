import Link from "next/link";
import { adminListEvents } from "@/lib/admin-data";
import { deleteEvent } from "../../actions";

export const dynamic = "force-dynamic";

const badgeClass: Record<string, string> = {
  onsale: "pp-badge-paid",
  fewleft: "pp-badge-paid",
  soldout: "pp-badge-new",
  new: "pp-badge-completed",
};

const COUNTRY: Record<string, string> = {
  da: "🇩🇰 DK",
  no: "🇳🇴 NO",
  sv: "🇸🇪 SE",
  fi: "🇫🇮 FI",
  fo: "🇫🇴 FO",
};

export default async function AdminEvents() {
  const events = await adminListEvents();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-admin-ink">Shows</h1>
          <p className="mt-1 text-admin-muted">{events.length} shows</p>
        </div>
        <Link href="/admin/events/new" className="pp-btn-dark">+ Nyt show</Link>
      </div>

      <div className="pp-card mt-7 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-admin-line text-xs font-semibold uppercase tracking-wide text-admin-muted">
              <th className="px-5 py-4">Land</th>
              <th className="px-5 py-4">Dato</th>
              <th className="px-5 py-4">By / Venue</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Pris</th>
              <th className="px-5 py-4">Synlig</th>
              <th className="px-5 py-4 text-right">Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-admin-muted">Ingen shows endnu.</td></tr>
            )}
            {events.map((e) => (
              <tr key={e.id} className="border-b border-admin-line/70 last:border-0 hover:bg-admin-panel/60">
                <td className="px-5 py-4 whitespace-nowrap text-admin-ink">{COUNTRY[e.locale] ?? e.locale}</td>
                <td className="px-5 py-4 font-semibold text-admin-ink">{e.event_date}</td>
                <td className="px-5 py-4">
                  <div className="font-semibold text-admin-ink">{e.city}</div>
                  <div className="text-admin-muted">{e.venue}</div>
                </td>
                <td className="px-5 py-4">
                  <span className={`pp-badge ${badgeClass[e.status] ?? "pp-badge-paid"}`}>{e.status}</span>
                </td>
                <td className="px-5 py-4 text-admin-ink">{e.price_from} {e.currency}</td>
                <td className="px-5 py-4">{e.published ? "✅" : "—"}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/events/${e.id}`} className="pp-btn-ghost px-3.5 py-1.5 text-xs">
                      Rediger
                    </Link>
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={e.id} />
                      <button className="rounded-full border border-admin-line bg-white px-3.5 py-1.5 text-xs font-semibold text-admin-peach-text transition hover:bg-admin-peach">
                        Slet
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
