import Image from 'next/image';

interface CreativePreviewProps {
  imageUrl: string;
  headlineText: string;
  imageAlt?: string;
}

export function CreativePreview({
  imageUrl,
  headlineText,
  imageAlt = 'Creative preview',
}: CreativePreviewProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-lg border bg-card">
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover"
      />

      {/* Headline Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <h2 className="text-white text-center text-2xl md:text-3xl font-bold px-6 drop-shadow-lg">
          {headlineText}
        </h2>
      </div>
    </div>
  );
}
