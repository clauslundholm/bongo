"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";

const ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <path d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z" />
  ),
  shows: (
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11ZM4 9h16M9 9v11" />
  ),
  mail: (
    <path d="M3.5 6.5h17v11h-17v-11Zm0 .8 8.5 6 8.5-6" />
  ),
  chat: (
    <path d="M4 5h16v10H9l-5 4V5Z" />
  ),
  doc: (
    <path d="M6 3h8l4 4v14H6V3Zm8 0v4h4M9 12h6M9 16h6" />
  ),
  logout: (
    <path d="M15 12H4m0 0 3.5-3.5M4 12l3.5 3.5M14 5h5v14h-5" />
  ),
};

function Icon({ name }: { name: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "dashboard", exact: true },
  { href: "/admin/events", label: "Shows", icon: "shows" },
  { href: "/admin/subscribers", label: "Nyhedsbrev", icon: "mail" },
  { href: "/admin/messages", label: "Beskeder", icon: "chat" },
  { href: "/admin/content", label: "Indhold", icon: "doc" },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="flex w-full shrink-0 flex-col bg-admin-ink px-4 py-5 text-white/70 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:self-start lg:overflow-y-auto">
      <div className="flex items-center gap-2.5 px-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-admin-yellow text-admin-ink">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h3l2-6 4 13 3-9 2 2h4" />
          </svg>
        </span>
        <span className="text-lg font-bold text-white">Bongo Admin</span>
      </div>

      <nav className="mt-7 flex flex-1 flex-col gap-1">
        {NAV.map((n) => {
          const active = isActive(n.href, n.exact);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                active ? "bg-white text-admin-ink shadow-sm" : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon name={n.icon} />
              {n.label}
            </Link>
          );
        })}

        <Link
          href="/da"
          target="_blank"
          className="mt-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 4h6v6M20 4l-9 9M10 6H5v13h13v-5" />
          </svg>
          Se siden
        </Link>
      </nav>

      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="truncate px-3 pb-2 text-xs text-white/45">{email}</p>
        <form action={signOut}>
          <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/65 transition hover:bg-white/10 hover:text-white">
            <Icon name="logout" />
            Log ud
          </button>
        </form>
      </div>
    </aside>
  );
}
