import { useQuery } from '@tanstack/react-query';

import { campaignsApi } from '../campaign.service';

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: () => campaignsApi.getAll(),
  });
}
