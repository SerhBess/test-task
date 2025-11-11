'use client';

import { useCampaigns } from '@/lib/api/campaign/hooks/useCampaigns';
import { Campaign } from '@/lib/types/campaign';

import { CampaignList } from './campaign-list';

interface CampaignsContainerProps {
  onCampaignClick?: (campaign: Campaign) => void;
}

export function CampaignsContainer({
  onCampaignClick,
}: CampaignsContainerProps) {
  const { data: campaigns, isLoading, error } = useCampaigns();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="text-sm text-muted-foreground mt-4">
            Loading campaigns...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-destructive font-medium">
            Failed to load campaigns
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Something went wrong
          </p>
        </div>
      </div>
    );
  }

  return (
    <CampaignList
      campaigns={campaigns || []}
      onCampaignClick={onCampaignClick}
    />
  );
}
