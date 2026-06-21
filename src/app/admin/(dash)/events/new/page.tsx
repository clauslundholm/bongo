import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="font-display text-4xl uppercase text-bongo-black">Nyt show</h1>
      <p className="mt-2 font-body text-bongo-black/70">Opret et nyt Bongo&apos;s Bingo-show.</p>
      <div className="mt-8">
        <EventForm />
      </div>
    </div>
  );
}
