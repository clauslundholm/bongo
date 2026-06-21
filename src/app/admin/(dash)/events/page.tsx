import Link from "next/link";
import { adminListEvents } from "@/lib/admin-data";
import { deleteEvent } from "../../actions";

export const dynamic = "force-dynamic";

const statusColor: Record<string, string> = {
  onsale: "bg-bongo-cyan",
  fewleft: "bg-bongo-yellow",
  soldout: "bg-bongo-black text-white",
  new: "bg-bongo-purple text-white",
};

export default async function AdminEvents() {
  const events = await adminListEvents();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-4xl uppercase text-bongo-black">Shows</h1>
        <Link href="/admin/events/new" className="btn-pink">+ Nyt show</Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border-4 border-bongo-black bg-white shadow-pop">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-bongo-yellow font-display text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Dato</th>
              <th className="px-4 py-3">By / Venue</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Pris</th>
              <th className="px-4 py-3">Synlig</th>
              <th className="px-4 py-3 text-right">Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-bongo-black/60">Ingen shows endnu.</td></tr>
            )}
            {events.map((e) => (
              <tr key={e.id} className="border-t-2 border-bongo-black/10">
                <td className="px-4 py-3 font-display">{e.event_date}</td>
                <td className="px-4 py-3">
                  <div className="font-display uppercase">{e.city}</div>
                  <div className="text-bongo-black/60">{e.venue}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`tag-pill ${statusColor[e.status] ?? "bg-bongo-cream"}`}>{e.status}</span>
                </td>
                <td className="px-4 py-3">{e.price_from} {e.currency}</td>
                <td className="px-4 py-3">{e.published ? "✅" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/events/${e.id}`} className="rounded-lg border-2 border-bongo-black px-3 py-1 font-display text-xs uppercase hover:bg-bongo-yellow">
                      Rediger
                    </Link>
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={e.id} />
                      <button className="rounded-lg border-2 border-bongo-black bg-bongo-pink px-3 py-1 font-display text-xs uppercase text-white hover:bg-bongo-pink-deep">
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
