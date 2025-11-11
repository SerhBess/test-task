import { useMemo } from 'react';
import { Campaign } from '@/lib/types/campaign';

interface CampaignOption {
  value: string;
  label: string;
}

interface UseCampaignOptionsConfig {
  campaigns?: Campaign[];
  includeAll?: boolean;
}

export function useCampaignOptions({
  campaigns,
  includeAll = false,
}: UseCampaignOptionsConfig): CampaignOption[] {
  return useMemo(() => {
    const options = campaigns?.map(campaign => ({
      value: campaign.id,
      label: campaign.name,
    })) || [];

    if (includeAll) {
      return [{ value: 'all', label: 'All campaigns' }, ...options];
    }

    return options;
  }, [campaigns, includeAll]);
}
