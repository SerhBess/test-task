import { Image, ImageGenerateProps } from '@/lib/types/image';

import { BaseApiService } from '../base-api/base-api.service';

class ImageGenerationService extends BaseApiService {
  generate({ campaignId, count = 1, prompt }: ImageGenerateProps) {
    return this.post<Image>('/images', {
      campaignId,
      count,
      ...(prompt && { prompt }),
    });
  }

  getAll() {
    return this.get<Image[]>('/images');
  }

  getByCampaignId(campaignId: string) {
    return this.get<Image[]>(`/images?campaignId=${campaignId}`);
  }
}

export const ImageGenerationApi = new ImageGenerationService();
