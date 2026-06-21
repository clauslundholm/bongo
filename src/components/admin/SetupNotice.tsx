export default function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="pp-card p-8">
        <h1 className="text-2xl font-bold text-admin-ink">Forbind Supabase</h1>
        <p className="mt-4 text-admin-ink/80">
          Admin-området er ikke aktivt endnu, fordi Supabase-miljøvariablerne mangler. Sådan kommer du i gang:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-admin-ink/80">
          <li>Opret et projekt på <strong>supabase.com</strong>.</li>
          <li>Kør alle SQL-filerne i <code className="rounded bg-admin-panel px-1">supabase/migrations/</code> i rækkefølge (0001 → 0004).</li>
          <li>Kopiér <code className="rounded bg-admin-panel px-1">.env.example</code> til <code className="rounded bg-admin-panel px-1">.env.local</code> og udfyld nøgler + <code className="rounded bg-admin-panel px-1">ADMIN_EMAILS</code>.</li>
          <li>Opret din admin-bruger i Supabase → Authentication → Users (slå Auto Confirm til).</li>
          <li>Genstart serveren og gå til <code className="rounded bg-admin-panel px-1">/admin/login</code>.</li>
        </ol>
      </div>
    </div>
  );
}
