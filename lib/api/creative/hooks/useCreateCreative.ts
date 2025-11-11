import { useMutation, useQueryClient } from '@tanstack/react-query';

import { creativesApi } from '../creative.service';
import type { CreateCreativeRequest } from '@/lib/types/creative';

export function useCreateCreative() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCreativeRequest) => creativesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatives'] });
    },
  });
}
