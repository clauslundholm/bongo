import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getSessionUser, isAdmin } from "@/lib/auth";
import SetupNotice from "@/components/admin/SetupNotice";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) return <SetupNotice />;

  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!(await isAdmin(user.email))) {
    redirect(`/admin/login?error=forbidden&email=${encodeURIComponent(user.email ?? "")}`);
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar email={user.email ?? ""} />
      <main className="min-h-screen flex-1 bg-admin-panel">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-7 sm:px-8 sm:py-10">{children}</div>
      </main>
    </div>
  );
}
