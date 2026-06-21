import { redirect } from "next/navigation";
import Link from "next/link";
import { isSupabaseConfigured, isAdminEmail } from "@/lib/supabase/env";
import { getSessionUser } from "@/lib/auth";
import SetupNotice from "@/components/admin/SetupNotice";
import { signOut } from "../actions";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "🎰" },
  { href: "/admin/events", label: "Shows", icon: "🎟️" },
  { href: "/admin/subscribers", label: "Nyhedsbrev", icon: "✉️" },
  { href: "/admin/messages", label: "Beskeder", icon: "💬" },
  { href: "/admin/content", label: "Indhold", icon: "📝" },
];

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) return <SetupNotice />;

  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!isAdminEmail(user.email)) {
    redirect(`/admin/login?error=forbidden&email=${encodeURIComponent(user.email ?? "")}`);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
      <aside className="border-b-4 border-bongo-black bg-bongo-yellow lg:w-64 lg:border-b-0 lg:border-r-4">
        <div className="flex items-center justify-between px-5 py-4 lg:block">
          <Link href="/admin" className="font-display text-2xl uppercase text-bongo-black">
            Bongo Admin
          </Link>
          <p className="hidden truncate font-body text-xs text-bongo-black/70 lg:mt-1 lg:block">
            {user.email}
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="whitespace-nowrap rounded-xl border-2 border-bongo-black bg-white px-4 py-2 font-display text-sm uppercase text-bongo-black transition hover:bg-bongo-pink hover:text-white"
            >
              <span className="mr-1">{n.icon}</span>
              {n.label}
            </Link>
          ))}
          <form action={signOut} className="lg:mt-2">
            <button className="w-full whitespace-nowrap rounded-xl border-2 border-bongo-black bg-bongo-black px-4 py-2 font-display text-sm uppercase text-bongo-yellow transition hover:bg-bongo-pink-deep">
              Log ud
            </button>
          </form>
        </nav>
      </aside>

      <main className="flex-1 px-5 py-8 sm:px-8">{children}</main>
    </div>
  );
}
