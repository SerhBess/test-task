import { useQuery } from '@tanstack/react-query';

import { campaignsApi } from '../campaign.service';

export function useCampaignById(id: string) {
  return useQuery({
    queryKey: ['campaign', id],
    queryFn: () => campaignsApi.getById(id),
  });
}
