import { adminListMessages } from "@/lib/admin-data";
import { toggleMessageHandled } from "../../actions";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await adminListMessages();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-bongo-black">Beskeder</h1>
      <p className="mt-2 font-body text-bongo-black/70">{messages.length} kontaktbeskeder</p>

      <div className="mt-8 space-y-4">
        {messages.length === 0 && (
          <p className="rounded-3xl border-4 border-bongo-black bg-white p-8 text-center font-body text-bongo-black/60 shadow-pop">
            Ingen beskeder endnu.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-3xl border-4 border-bongo-black p-5 shadow-pop ${m.handled ? "bg-white" : "bg-bongo-yellow"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg uppercase">{m.name}</p>
                <a href={`mailto:${m.email}`} className="font-body text-sm text-bongo-pink-deep underline">{m.email}</a>
                {m.subject && <p className="mt-1 font-display text-sm uppercase text-bongo-black/70">{m.subject}</p>}
              </div>
              <div className="text-right">
                <p className="font-body text-xs text-bongo-black/60">{new Date(m.created_at).toLocaleString("da-DK")}</p>
                <form action={toggleMessageHandled} className="mt-2">
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="handled" value={(!m.handled).toString()} />
                  <button className="rounded-lg border-2 border-bongo-black bg-white px-3 py-1 font-display text-xs uppercase hover:bg-bongo-pink hover:text-white">
                    {m.handled ? "Markér ulæst" : "Markér læst"}
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap font-body text-bongo-black/80">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
