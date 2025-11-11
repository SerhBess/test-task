import {
  Headline,
  GenerateHeadlinesRequest,
  GenerateHeadlinesResponse,
} from '@/lib/types/headline';

import { BaseApiService } from '../base-api/base-api.service';

class HeadlinesService extends BaseApiService {
  getAll() {
    return this.get<Headline[]>('/headlines');
  }

  getByCampaignId(campaignId: string) {
    return this.get<Headline[]>(`/headlines?campaignId=${campaignId}`);
  }

  generate(data: GenerateHeadlinesRequest) {
    return this.post<GenerateHeadlinesResponse, GenerateHeadlinesRequest>(
      '/headlines',
      data
    );
  }
}

export const headlinesApi = new HeadlinesService();
