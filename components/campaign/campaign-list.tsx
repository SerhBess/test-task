import { Campaign } from '@/lib/types/campaign';

import { CampaignCard } from './campaign-card';

interface CampaignListProps {
  campaigns: Campaign[];
  onCampaignClick?: (campaign: Campaign) => void;
}

export function CampaignList({
  campaigns,
  onCampaignClick,
}: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No campaigns yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first campaign to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map(campaign => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onClick={() => onCampaignClick?.(campaign)}
        />
      ))}
    </div>
  );
}
