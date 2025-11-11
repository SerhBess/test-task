import { useQuery } from '@tanstack/react-query';

import { headlinesApi } from '../headline.service';

export function useHeadlines(campaignId?: string) {
  return useQuery({
    queryKey: ['headlines', campaignId],
    queryFn: () => {
      if (campaignId && campaignId !== 'all') {
        return headlinesApi.getByCampaignId(campaignId);
      }
      return headlinesApi.getAll();
    },
  });
}
