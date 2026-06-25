"use client";

import { useActionState } from "react";
import { regenerateAdminPassword, type FormState } from "@/app/admin/actions";
import CopyButton from "./CopyButton";

export default function ResetPasswordButton({ email }: { email: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(regenerateAdminPassword, {});

  return (
    <div className="flex flex-col items-end gap-1">
      <form action={action}>
        <input type="hidden" name="email" value={email} />
        <button className="pp-btn-ghost px-3.5 py-1.5 text-xs">{pending ? "…" : "Ny adgangskode"}</button>
      </form>
      {state.error && <span className="text-[11px] text-admin-peach-text">⚠️ {state.error}</span>}
      {state.password && (
        <span className="flex items-center gap-1">
          <code className="select-all rounded border border-admin-line bg-white px-1.5 py-0.5 font-mono text-[11px] text-admin-ink">
            {state.password}
          </code>
          <CopyButton text={state.password} className="pp-btn-ghost px-2 py-0.5 text-[10px]" />
        </span>
      )}
    </div>
  );
}
