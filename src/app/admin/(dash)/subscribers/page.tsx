import { adminListSubscribers } from "@/lib/admin-data";
import { deleteSubscriber } from "../../actions";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subs = await adminListSubscribers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl uppercase text-bongo-black">Nyhedsbrev</h1>
        <a href="/api/admin/subscribers.csv" className="btn-white">⬇︎ Eksportér CSV</a>
      </div>
      <p className="mt-2 font-body text-bongo-black/70">{subs.length} tilmeldte</p>

      <div className="mt-8 overflow-hidden rounded-3xl border-4 border-bongo-black bg-white shadow-pop">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-bongo-yellow font-display text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Sprog</th>
              <th className="px-4 py-3">Tilmeldt</th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {subs.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-bongo-black/60">Ingen tilmeldte endnu.</td></tr>
            )}
            {subs.map((s) => (
              <tr key={s.id} className="border-t-2 border-bongo-black/10">
                <td className="px-4 py-3 font-display">{s.email}</td>
                <td className="px-4 py-3 uppercase">{s.locale ?? "—"}</td>
                <td className="px-4 py-3 text-bongo-black/60">{new Date(s.created_at).toLocaleString("da-DK")}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteSubscriber}>
                    <input type="hidden" name="id" value={s.id} />
                    <button className="rounded-lg border-2 border-bongo-black px-3 py-1 font-display text-xs uppercase hover:bg-bongo-pink hover:text-white">
                      Slet
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
