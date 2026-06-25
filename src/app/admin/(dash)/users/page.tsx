import AddAdminForm from "@/components/admin/AddAdminForm";
import { adminListAdmins } from "@/lib/admin-data";
import { adminEmails } from "@/lib/supabase/env";
import { getAdminUser } from "@/lib/auth";
import { revokeAdmin } from "../../actions";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const [dbAdmins, me] = await Promise.all([adminListAdmins(), getAdminUser()]);
  const envAdmins = adminEmails();
  const myEmail = me?.email?.toLowerCase();

  // Combine env-bootstrap admins (read-only) with DB admins.
  const dbEmails = new Set(dbAdmins.map((a) => a.email.toLowerCase()));
  const rows = [
    ...envAdmins
      .filter((e) => !dbEmails.has(e))
      .map((email) => ({ email, name: null as string | null, source: "env" as const })),
    ...dbAdmins.map((a) => ({ email: a.email, name: a.name, source: "db" as const })),
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-admin-ink">Administratorer</h1>
      <p className="mt-1 max-w-2xl text-admin-muted">
        Opret nye administratorer med email og adgangskode, eller fjern adgang. Du kan ikke fjerne dig selv.
      </p>

      <div className="mt-6">
        <AddAdminForm />
      </div>

      <div className="pp-card mt-6 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-admin-line text-xs font-semibold uppercase tracking-wide text-admin-muted">
              <th className="px-5 py-4">Navn</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4 text-right">Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-admin-muted">Ingen administratorer (kør 0006_admins.sql).</td></tr>
            )}
            {rows.map((r) => {
              const isSelf = r.email.toLowerCase() === myEmail;
              return (
                <tr key={r.email} className="border-b border-admin-line/70 last:border-0 hover:bg-admin-panel/60">
                  <td className="px-5 py-4 font-semibold text-admin-ink">{r.name ?? "—"}</td>
                  <td className="px-5 py-4 text-admin-ink">
                    {r.email}
                    {isSelf && <span className="ml-2 pp-badge pp-badge-paid">dig</span>}
                  </td>
                  <td className="px-5 py-4 text-admin-muted">
                    {r.source === "env" ? "Miljøvariabel" : "Oprettet i admin"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {r.source === "db" && !isSelf ? (
                      <form action={revokeAdmin}>
                        <input type="hidden" name="email" value={r.email} />
                        <button className="rounded-full border border-admin-line bg-white px-3.5 py-1.5 text-xs font-semibold text-admin-peach-text transition hover:bg-admin-peach">
                          Fjern adgang
                        </button>
                      </form>
                    ) : (
                      <span className="text-xs text-admin-muted">{isSelf ? "—" : "Via .env"}</span>
                    )}
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
