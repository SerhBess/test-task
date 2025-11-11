import Image from 'next/image';

import { Image as ImageType } from '@/lib/types/image';

interface ImageGridProps {
  images: ImageType[];
}

export function ImageGrid({ images }: ImageGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">No images found</p>
        <p className="text-sm text-muted-foreground mt-2">
          Generate images for your campaigns to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map(image => (
        <div
          key={image.id}
          className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
        >
          <div className="aspect-square relative">
            <Image
              src={
                image?.imageUrl ||
                'https://placehold.co/600x600/0f172a/22d3ee?text=Expired'
              }
              alt={image.prompt}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {image.prompt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
