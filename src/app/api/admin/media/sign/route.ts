import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { MEDIA_BUCKET } from "@/lib/admin-data";

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

/**
 * Returns a one-time signed URL so the browser can upload a file straight to
 * Supabase Storage — bypassing Vercel's serverless request-body size limit.
 */
export async function POST(req: NextRequest) {
  const user = await getAdminUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const sb = createSupabaseAdminClient();
  if (!sb) return NextResponse.json({ error: "not_configured" }, { status: 400 });

  let filename = "fil";
  try {
    const body = await req.json();
    if (body?.filename) filename = String(body.filename);
  } catch {
    /* ignore — fall back to default */
  }

  const dot = filename.lastIndexOf(".");
  const ext = dot >= 0 ? filename.slice(dot + 1).toLowerCase() : "";
  const base = safeFileBase(dot >= 0 ? filename.slice(0, dot) : filename);
  const path = `${Date.now()}-${base}${ext ? "." + ext : ""}`;

  const { data, error } = await sb.storage.from(MEDIA_BUCKET).createSignedUploadUrl(path);
  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "sign_failed" }, { status: 500 });
  }

  const publicUrl = sb.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ path: data.path, token: data.token, publicUrl });
}
