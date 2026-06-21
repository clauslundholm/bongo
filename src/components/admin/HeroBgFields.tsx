"use client";

import MediaField from "./MediaField";
import { SelectField, HERO_HEIGHT_OPTIONS } from "./AdminFields";

export default function HeroBgFields({
  video,
  image,
  height,
  onVideo,
  onImage,
  onHeight,
}: {
  video: string;
  image: string;
  height: string;
  onVideo: (v: string) => void;
  onImage: (v: string) => void;
  onHeight: (v: string) => void;
}) {
  return (
    <div className="pp-card space-y-4 p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-admin-muted">Baggrund (hero)</h3>
      <MediaField
        label="Baggrundsvideo"
        accept="video"
        value={video}
        onChange={onVideo}
        hint="Tom video = brug billede/standard. Afspilles automatisk, lydløst og i loop."
      />
      <MediaField label="Baggrundsbillede (fallback / poster)" accept="image" value={image} onChange={onImage} />
      <SelectField label="Hero-højde" value={height} onChange={onHeight} options={HERO_HEIGHT_OPTIONS} />
    </div>
  );
}
