import { CreativeWithRelations } from '@/lib/types/creative';
import { CreativeCard } from './creative-card';

interface CreativesGridProps {
  creatives: CreativeWithRelations[];
}

export function CreativesGrid({ creatives }: CreativesGridProps) {
  if (creatives.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">No creatives found</p>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first creative to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {creatives.map((creative) => (
        <CreativeCard key={creative.id} creative={creative} />
      ))}
    </div>
  );
}
