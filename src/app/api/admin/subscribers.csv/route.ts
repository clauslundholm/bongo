import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { adminListSubscribers } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export async function GET() {
  const user = await getAdminUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const subs = await adminListSubscribers();
  const rows = [
    ["email", "locale", "created_at"],
    ...subs.map((s) => [s.email, s.locale ?? "", s.created_at]),
  ];
  const csv = rows.map((r) => r.map((c) => csvEscape(String(c))).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="bongos-bingo-subscribers.csv"',
    },
  });
}
