import MediaUploader from "@/components/admin/MediaUploader";
import CopyButton from "@/components/admin/CopyButton";
import { adminListMedia } from "@/lib/admin-data";
import { deleteMedia, renameMedia } from "../../actions";

export const dynamic = "force-dynamic";

function formatSize(bytes: number) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function MediaPage() {
  const media = await adminListMedia();

  return (
    <div>
      <h1 className="text-3xl font-bold text-admin-ink">Mediebibliotek</h1>
      <p className="mt-1 text-admin-muted">{media.length} filer</p>

      <div className="mt-6">
        <MediaUploader />
      </div>

      {media.length === 0 ? (
        <p className="pp-card mt-6 p-8 text-center text-admin-muted">Ingen medier endnu. Upload din første fil ovenfor.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((m) => {
            const isVideo = m.mimetype.startsWith("video");
            return (
              <div key={m.name} className="pp-card overflow-hidden">
                <div className="aspect-video bg-admin-panel">
                  {isVideo ? (
                    <video src={m.url} muted loop className="h-full w-full object-cover" />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="space-y-2 p-3">
                  <p className="truncate text-xs font-medium text-admin-ink" title={m.name}>{m.name}</p>
                  <p className="text-[11px] text-admin-muted">
                    {isVideo ? "Video" : "Billede"}{m.size ? ` · ${formatSize(m.size)}` : ""}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    <CopyButton text={m.url} />
                    <a href={m.url} target="_blank" rel="noopener noreferrer" className="pp-btn-ghost px-3 py-1.5 text-xs">Åbn</a>
                  </div>

                  <form action={renameMedia} className="flex gap-1.5">
                    <input type="hidden" name="from" value={m.name} />
                    <input
                      name="to"
                      defaultValue={m.name}
                      className="min-w-0 flex-1 rounded-lg border border-admin-line bg-white px-2 py-1 text-xs outline-none focus:border-admin-ink/40"
                    />
                    <button className="rounded-lg border border-admin-line bg-white px-2.5 py-1 text-xs font-semibold hover:bg-admin-panel">Omdøb</button>
                  </form>

                  <form action={deleteMedia}>
                    <input type="hidden" name="name" value={m.name} />
                    <button className="w-full rounded-lg border border-admin-line bg-white px-2.5 py-1 text-xs font-semibold text-admin-peach-text transition hover:bg-admin-peach">
                      Slet
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
