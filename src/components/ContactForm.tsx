"use client";

import { useState } from "react";
import { fireConfetti } from "@/lib/confetti";
import type { Dictionary } from "@/i18n/dictionaries";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    fireConfetti();
  }

  if (done) {
    return (
      <div className="card-pop bg-bongo-yellow p-8 text-center">
        <p className="font-display uppercase text-2xl text-bongo-black">{dict.contact.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-pop space-y-4 bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={dict.contact.nameLabel} name="name" />
        <Field label={dict.contact.emailLabel} name="email" type="email" />
      </div>
      <Field label={dict.contact.subjectLabel} name="subject" />
      <label className="block">
        <span className="font-display uppercase text-sm text-bongo-black">{dict.contact.messageLabel}</span>
        <textarea
          required
          rows={5}
          className="mt-1 w-full rounded-2xl border-4 border-bongo-black px-4 py-3 font-body text-bongo-black outline-none focus:ring-4 focus:ring-bongo-pink"
        />
      </label>
      <button type="submit" className="btn-pink w-full text-lg">{dict.contact.send}</button>
    </form>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block">
      <span className="font-display uppercase text-sm text-bongo-black">{label}</span>
      <input
        required
        name={name}
        type={type}
        className="mt-1 w-full rounded-2xl border-4 border-bongo-black px-4 py-3 font-body text-bongo-black outline-none focus:ring-4 focus:ring-bongo-pink"
      />
    </label>
  );
}
