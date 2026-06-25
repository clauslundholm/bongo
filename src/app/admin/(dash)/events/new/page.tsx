import EventForm from "@/components/admin/EventForm";
import { adminListLanguages } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  const languages = await adminListLanguages();
  return (
    <div>
      <h1 className="text-3xl font-bold text-admin-ink">Nyt show</h1>
      <p className="mt-1 text-admin-muted">Opret et nyt Bongo&apos;s Bingo-show.</p>
      <div className="mt-8">
        <EventForm languages={languages} />
      </div>
    </div>
  );
}
