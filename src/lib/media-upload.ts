"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const BUCKET = "media";

/**
 * Uploads a file directly from the browser to Supabase Storage using a
 * server-issued signed upload URL. This bypasses Vercel's serverless
 * request-body size limit, so large videos work.
 */
export async function uploadViaSignedUrl(file: File): Promise<{ url: string }> {
  const res = await fetch("/api/admin/media/sign", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ filename: file.name }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Kunne ikke starte upload.");

  const supabase = createSupabaseBrowserClient();
  const { error } = await supabase.storage
    .from(BUCKET)
    .uploadToSignedUrl(json.path, json.token, file, {
      contentType: file.type || undefined,
    });
  if (error) throw new Error(error.message);

  return { url: json.publicUrl as string };
}
