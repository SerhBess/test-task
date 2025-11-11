import { useQuery } from '@tanstack/react-query';

import { ImageGenerationApi } from '../image-generation.service';

export function useImage(campaignId?: string) {
  return useQuery({
    queryKey: ['images', campaignId],
    queryFn: () => {
      if (campaignId && campaignId !== 'all') {
        return ImageGenerationApi.getByCampaignId(campaignId);
      }
      return ImageGenerationApi.getAll();
    },
  });
}
