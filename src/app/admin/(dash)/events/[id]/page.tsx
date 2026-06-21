import { notFound } from "next/navigation";
import EventForm from "@/components/admin/EventForm";
import { adminGetEvent } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await adminGetEvent(id);
  if (!event) notFound();

  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-bongo-black">Rediger show</h1>
      <p className="mt-2 font-body text-bongo-black/70">{event.city} · {event.event_date}</p>
      <div className="mt-8">
        <EventForm event={event} />
      </div>
    </div>
  );
}
