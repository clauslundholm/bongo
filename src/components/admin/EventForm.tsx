"use client";

import { useActionState } from "react";
import Link from "next/link";
import { saveEvent, type FormState } from "@/app/admin/actions";
import type { EventRow } from "@/lib/data/events";

const STATUSES = ["onsale", "fewleft", "soldout", "new"];
const ACCENTS = ["pink", "yellow", "cyan", "purple"];

export default function EventForm({ event }: { event?: EventRow | null }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveEvent, {});

  return (
    <form action={action} className="max-w-3xl space-y-5">
      {event?.id && <input type="hidden" name="id" value={event.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="slug" label="Slug (unik)" defaultValue={event?.slug} required placeholder="kobenhavn-2026-07-04" />
        <Field name="city" label="By" defaultValue={event?.city} required />
        <Field name="venue" label="Venue" defaultValue={event?.venue} required />
        <Field name="address" label="Adresse" defaultValue={event?.address} />
        <Field name="event_date" label="Dato" type="date" defaultValue={event?.event_date} required />
        <div className="grid grid-cols-2 gap-4">
          <Field name="doors" label="Døre" defaultValue={event?.doors} placeholder="18:00" />
          <Field name="starts" label="Start" defaultValue={event?.starts} placeholder="19:00" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field name="price_from" label="Pris fra" type="number" defaultValue={event ? String(event.price_from) : "249"} />
          <Field name="currency" label="Valuta" defaultValue={event?.currency ?? "DKK"} />
        </div>
        <Select name="status" label="Status" options={STATUSES} defaultValue={event?.status ?? "onsale"} />
        <Select name="accent" label="Farve" options={ACCENTS} defaultValue={event?.accent ?? "pink"} />
        <Field name="ticket_url" label="Billet-link (Paylogic)" defaultValue={event?.ticket_url} className="sm:col-span-2" />
        <Field name="image" label="Billede-URL" defaultValue={event?.image} className="sm:col-span-2" />
      </div>

      <label className="flex items-center gap-3 font-body">
        <input
          type="checkbox"
          name="published"
          defaultChecked={event ? event.published : true}
          className="h-5 w-5 rounded border-2 border-bongo-black"
        />
        <span className="font-display text-sm uppercase">Offentliggjort (vises på siden)</span>
      </label>

      {state.error && (
        <p className="rounded-2xl border-2 border-bongo-black bg-bongo-pink px-4 py-3 font-body text-sm text-white">
          ⚠️ {state.error}
        </p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={pending} className="btn-pink disabled:opacity-60">
          {pending ? "Gemmer…" : event?.id ? "Gem ændringer" : "Opret show"}
        </button>
        <Link href="/admin/events" className="btn-white">Annullér</Link>
      </div>
    </form>
  );
}

function Field({
  name, label, defaultValue, type = "text", required, placeholder, className = "",
}: {
  name: string; label: string; defaultValue?: string; type?: string; required?: boolean; placeholder?: string; className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="font-display text-xs uppercase text-bongo-black/70">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-xl border-2 border-bongo-black bg-white px-3 py-2 font-body outline-none focus:ring-4 focus:ring-bongo-pink"
      />
    </label>
  );
}

function Select({
  name, label, options, defaultValue,
}: {
  name: string; label: string; options: string[]; defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="font-display text-xs uppercase text-bongo-black/70">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-xl border-2 border-bongo-black bg-white px-3 py-2 font-body outline-none focus:ring-4 focus:ring-bongo-pink"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
