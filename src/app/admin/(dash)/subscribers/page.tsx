import { adminListSubscribers } from "@/lib/admin-data";
import { deleteSubscriber } from "../../actions";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subs = await adminListSubscribers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-admin-ink">Nyhedsbrev</h1>
          <p className="mt-1 text-admin-muted">{subs.length} tilmeldte</p>
        </div>
        <a href="/api/admin/subscribers.csv" className="pp-btn-ghost">⬇︎ Eksportér CSV</a>
      </div>

      <div className="pp-card mt-7 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-admin-line text-xs font-semibold uppercase tracking-wide text-admin-muted">
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Sprog</th>
              <th className="px-5 py-4">Tilmeldt</th>
              <th className="px-5 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {subs.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-admin-muted">Ingen tilmeldte endnu.</td></tr>
            )}
            {subs.map((s) => (
              <tr key={s.id} className="border-b border-admin-line/70 last:border-0 hover:bg-admin-panel/60">
                <td className="px-5 py-4 font-semibold text-admin-ink">{s.email}</td>
                <td className="px-5 py-4 uppercase text-admin-muted">{s.locale ?? "—"}</td>
                <td className="px-5 py-4 text-admin-muted">{new Date(s.created_at).toLocaleString("da-DK")}</td>
                <td className="px-5 py-4 text-right">
                  <form action={deleteSubscriber}>
                    <input type="hidden" name="id" value={s.id} />
                    <button className="rounded-full border border-admin-line bg-white px-3.5 py-1.5 text-xs font-semibold text-admin-peach-text transition hover:bg-admin-peach">
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
