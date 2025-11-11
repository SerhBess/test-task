import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CampaignFormData } from '@/lib/validations/campaign';

import { campaignsApi } from '../campaign.service';

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CampaignFormData) => campaignsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}
