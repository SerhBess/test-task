import { Campaign } from '@prisma/client';

import { BaseApiService } from '@/lib/api/base-api/base-api.service';

import { CampaignFormData } from '../../validations/campaign';

class CampaignsService extends BaseApiService {
  getAll() {
    return this.get<Campaign[]>('/campaigns');
  }

  getById(id: string) {
    return this.get<Campaign[]>(`/campaigns/${id}`);
  }

  create(data: CampaignFormData) {
    return this.post<Campaign, CampaignFormData>('/campaigns', data);
  }
}

export const campaignsApi = new CampaignsService();
