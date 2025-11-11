import { CreativeWithRelations } from '@/lib/types/creative';
import { CreativePreview } from './creative-preview';

interface CreativeCardProps {
  creative: CreativeWithRelations;
  onClick?: () => void;
}

export function CreativeCard({ creative, onClick }: CreativeCardProps) {
  return (
    <div
      className="group cursor-pointer transition-all hover:scale-105"
      onClick={onClick}
    >
      <CreativePreview
        imageUrl={creative.image.imageUrl}
        headlineText={creative.headline.text}
        imageAlt={creative.headline.text}
      />
    </div>
  );
}
