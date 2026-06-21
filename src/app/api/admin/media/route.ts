import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { adminListMedia, MEDIA_BUCKET } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

function safeFileBase(name: string) {
  return (
    name
      .normalize("NFKD")
      .replace(/[^\w.\- ]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase()
      .slice(0, 80) || "fil"
  );
}

export async function GET() {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const items = await adminListMedia();
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const sb = createSupabaseAdminClient();
  if (!sb) return NextResponse.json({ error: "not_configured" }, { status: 400 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }

  const dot = file.name.lastIndexOf(".");
  const ext = dot >= 0 ? file.name.slice(dot + 1).toLowerCase() : "";
  const base = safeFileBase(dot >= 0 ? file.name.slice(0, dot) : file.name);
  const path = `${Date.now()}-${base}${ext ? "." + ext : ""}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  const { error } = await sb.storage.from(MEDIA_BUCKET).upload(path, bytes, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const url = sb.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ url, name: path });
}
