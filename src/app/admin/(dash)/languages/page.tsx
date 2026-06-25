import AddLanguageForm from "@/components/admin/AddLanguageForm";
import { adminListLanguages } from "@/lib/admin-data";
import { toggleLanguage, deleteLanguage } from "../../actions";

export const dynamic = "force-dynamic";

const BUILTIN = ["da", "no", "sv", "fi", "fo"];

export default async function LanguagesPage() {
  const languages = await adminListLanguages();

  return (
    <div>
      <h1 className="text-3xl font-bold text-admin-ink">Sprog</h1>
      <p className="mt-1 max-w-2xl text-admin-muted">
        Styr hvilke sprog der vises på sitet. Deaktiver et sprog for at skjule det uden at slette indholdet.
        Standardsproget (Dansk) kan ikke slås fra eller slettes.
      </p>

      <div className="mt-6">
        <AddLanguageForm />
      </div>

      <div className="pp-card mt-6 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-admin-line text-xs font-semibold uppercase tracking-wide text-admin-muted">
              <th className="px-5 py-4">Sprog</th>
              <th className="px-5 py-4">Kode</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {languages.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-admin-muted">Ingen sprog (kør 0005_languages.sql).</td></tr>
            )}
            {languages.map((l) => {
              const isDefault = l.code === "da";
              const builtin = BUILTIN.includes(l.code);
              return (
                <tr key={l.code} className="border-b border-admin-line/70 last:border-0 hover:bg-admin-panel/60">
                  <td className="px-5 py-4">
                    <span className="mr-2 text-lg">{l.flag}</span>
                    <span className="font-semibold text-admin-ink">{l.name}</span>
                  </td>
                  <td className="px-5 py-4 uppercase text-admin-muted">{l.code}</td>
                  <td className="px-5 py-4 text-admin-muted">{builtin ? "Indbygget" : "Tilføjet"}</td>
                  <td className="px-5 py-4">
                    <span className={`pp-badge ${l.enabled ? "pp-badge-completed" : "pp-badge-new"}`}>
                      {l.enabled ? "Aktiv" : "Deaktiveret"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {!isDefault && (
                        <form action={toggleLanguage}>
                          <input type="hidden" name="code" value={l.code} />
                          <input type="hidden" name="enabled" value={(!l.enabled).toString()} />
                          <button className="pp-btn-ghost px-3.5 py-1.5 text-xs">
                            {l.enabled ? "Deaktiver" : "Aktiver"}
                          </button>
                        </form>
                      )}
                      {!builtin && (
                        <form action={deleteLanguage}>
                          <input type="hidden" name="code" value={l.code} />
                          <button className="rounded-full border border-admin-line bg-white px-3.5 py-1.5 text-xs font-semibold text-admin-peach-text transition hover:bg-admin-peach">
                            Slet
                          </button>
                        </form>
                      )}
                      {isDefault && <span className="text-xs text-admin-muted">Standard</span>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
