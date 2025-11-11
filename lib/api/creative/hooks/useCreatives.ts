import { useQuery } from '@tanstack/react-query';

import { creativesApi } from '../creative.service';

export function useCreatives(campaignId?: string) {
  return useQuery({
    queryKey: ['creatives', campaignId],
    queryFn: () => {
      if (!campaignId || campaignId === 'all') {
        return creativesApi.getAll();
      }
      return creativesApi.getByCampaignId(campaignId);
    },
  });
}
