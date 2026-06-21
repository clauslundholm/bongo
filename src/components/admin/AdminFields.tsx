"use client";

export function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="pp-input mt-1.5" />
    </label>
  );
}

export function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">{label}</span>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="pp-input mt-1.5 leading-relaxed" />
    </label>
  );
}

export function IconBtn({ children, onClick, label, danger }: { children: React.ReactNode; onClick: () => void; label: string; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid h-7 w-7 place-items-center rounded-lg border border-admin-line bg-white text-sm transition hover:bg-admin-panel ${danger ? "text-admin-peach-text hover:bg-admin-peach" : "text-admin-ink"}`}
    >
      {children}
    </button>
  );
}
