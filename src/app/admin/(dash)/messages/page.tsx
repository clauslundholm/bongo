import { adminListMessages } from "@/lib/admin-data";
import { toggleMessageHandled } from "../../actions";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await adminListMessages();

  return (
    <div>
      <h1 className="text-3xl font-bold text-admin-ink">Beskeder</h1>
      <p className="mt-1 text-admin-muted">{messages.length} kontaktbeskeder</p>

      <div className="mt-7 space-y-4">
        {messages.length === 0 && (
          <p className="pp-card p-8 text-center text-admin-muted">Ingen beskeder endnu.</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`pp-card p-5 ${m.handled ? "" : "ring-2 ring-admin-yellow"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-admin-ink">{m.name}</p>
                  {!m.handled && <span className="pp-badge pp-badge-paid">Ny</span>}
                </div>
                <a href={`mailto:${m.email}`} className="text-sm text-admin-muted underline hover:text-admin-ink">{m.email}</a>
                {m.subject && <p className="mt-1 text-sm font-medium text-admin-ink/80">{m.subject}</p>}
              </div>
              <div className="text-right">
                <p className="text-xs text-admin-muted">{new Date(m.created_at).toLocaleString("da-DK")}</p>
                <form action={toggleMessageHandled} className="mt-2">
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="handled" value={(!m.handled).toString()} />
                  <button className="pp-btn-ghost px-3.5 py-1.5 text-xs">
                    {m.handled ? "Markér ulæst" : "Markér læst"}
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-admin-ink/80">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
