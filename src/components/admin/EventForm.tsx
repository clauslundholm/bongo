"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveEvent, type FormState } from "@/app/admin/actions";
import type { EventRow } from "@/lib/data/events";
import MediaField from "./MediaField";

const STATUSES = ["onsale", "fewleft", "soldout", "new"];
const ACCENTS = ["pink", "yellow", "cyan", "purple"];
const COUNTRIES = [
  { value: "da", label: "🇩🇰 Danmark" },
  { value: "no", label: "🇳🇴 Norge" },
  { value: "sv", label: "🇸🇪 Sverige" },
  { value: "fi", label: "🇫🇮 Suomi" },
  { value: "fo", label: "🇫🇴 Føroyar" },
];

export default function EventForm({ event }: { event?: EventRow | null }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveEvent, {});
  const [image, setImage] = useState(event?.image ?? "");

  return (
    <form action={action} className="max-w-3xl space-y-5">
      {event?.id && <input type="hidden" name="id" value={event.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">Land (hvilket sprog/land viser showet)</span>
          <select name="locale" defaultValue={event?.locale ?? "da"} className="pp-input mt-1.5">
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>
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
        <Field name="weeztix_shop_url" label="Weeztix shop-URL" defaultValue={event?.weeztix_shop_url} placeholder="https://shop.weeztix.com/..." className="sm:col-span-2" />
        <div className="sm:col-span-2">
          <MediaField label="Billede" accept="image" value={image} onChange={setImage} name="image" />
        </div>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="published"
          defaultChecked={event ? event.published : true}
          className="h-5 w-5 rounded-md border border-admin-line accent-admin-ink"
        />
        <span className="text-sm font-medium text-admin-ink">Offentliggjort (vises på siden)</span>
      </label>

      {state.error && (
        <p className="rounded-xl border border-admin-line bg-admin-peach px-4 py-3 text-sm text-admin-peach-text">
          ⚠️ {state.error}
        </p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={pending} className="pp-btn-dark">
          {pending ? "Gemmer…" : event?.id ? "Gem ændringer" : "Opret show"}
        </button>
        <Link href="/admin/events" className="pp-btn-ghost">Annullér</Link>
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
      <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="pp-input mt-1.5"
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
      <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="pp-input mt-1.5"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
