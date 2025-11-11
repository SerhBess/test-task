import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GenerateHeadlinesRequest } from '@/lib/types/headline';

import { headlinesApi } from '../headline.service';

export function useGenerateHeadlines() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateHeadlinesRequest) => headlinesApi.generate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['headlines'] });
    },
  });
}
