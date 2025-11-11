import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ImageGenerateProps } from '@/lib/types/image';

import { ImageGenerationApi } from '../image-generation.service';

export function useGenerateImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ImageGenerateProps) => ImageGenerationApi.generate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images', 'all'] });
    },
  });
}
