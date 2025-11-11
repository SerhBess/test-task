import type {
  Creative,
  CreativeWithRelations,
  CreateCreativeRequest,
} from '@/lib/types/creative';

import { BaseApiService } from '../base-api/base-api.service';

class CreativeService extends BaseApiService {
  getAll() {
    return this.get<CreativeWithRelations[]>('/creatives');
  }

  getByCampaignId(campaignId: string) {
    return this.get<CreativeWithRelations[]>(
      `/creatives?campaignId=${campaignId}`
    );
  }

  create(data: CreateCreativeRequest) {
    return this.post<Creative, CreateCreativeRequest>('/creatives', data);
  }
}

export const creativesApi = new CreativeService();
