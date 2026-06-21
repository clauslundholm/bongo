export default function SetupNotice() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="rounded-3xl border-4 border-bongo-black bg-white p-8 shadow-pop">
        <h1 className="font-display text-3xl uppercase text-bongo-pink">Forbind Supabase</h1>
        <p className="mt-4 font-body text-bongo-black/80">
          Admin-området er ikke aktivt endnu, fordi Supabase-miljøvariablerne mangler.
          Sådan kommer du i gang:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 font-body text-bongo-black/80">
          <li>Opret et projekt på <strong>supabase.com</strong>.</li>
          <li>Kør SQL&apos;en i <code className="rounded bg-bongo-cream px-1">supabase/migrations/0001_init.sql</code> i Supabase SQL-editoren.</li>
          <li>Kopiér <code className="rounded bg-bongo-cream px-1">.env.example</code> til <code className="rounded bg-bongo-cream px-1">.env.local</code> og udfyld nøgler + <code className="rounded bg-bongo-cream px-1">ADMIN_EMAILS</code>.</li>
          <li>Opret din admin-bruger i Supabase → Authentication → Users.</li>
          <li>Genstart serveren og gå til <code className="rounded bg-bongo-cream px-1">/admin/login</code>.</li>
        </ol>
      </div>
    </div>
  );
}
