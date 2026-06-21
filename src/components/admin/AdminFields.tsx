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

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-admin-muted">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="pp-input mt-1.5">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

export const HERO_HEIGHT_OPTIONS = [
  { value: "auto", label: "Auto (tilpas indhold)" },
  { value: "50", label: "50% af skærmhøjde" },
  { value: "60", label: "60% af skærmhøjde" },
  { value: "75", label: "75% af skærmhøjde" },
  { value: "90", label: "90% af skærmhøjde" },
  { value: "100", label: "100% (fuld skærm)" },
];

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
