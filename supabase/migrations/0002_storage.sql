-- Bongo's Bingo — media storage bucket
-- Run after 0001_init.sql. Creates a public bucket for images & video.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  104857600, -- 100 MB
  array[
    'image/jpeg','image/png','image/webp','image/gif','image/svg+xml','image/avif',
    'video/mp4','video/webm','video/quicktime'
  ]
)
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Public read of objects in the bucket (bucket is public, but make the policy explicit).
drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

-- Writes (upload/delete/move) happen via the service-role key in the admin server
-- actions, which bypasses RLS. No additional write policies are required.
