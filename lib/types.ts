import { Campaign, Creative, Headline, Image } from '@prisma/client';

// Request body types
export type CreateCampaignBody = {
  name: string;
  industry: string;
  audience: string;
  tone: string;
  description?: string;
};

export type GenerateHeadlinesBody = {
  campaignId: string;
  count?: number;
}

export type GenerateImagesBody = {
  campaignId: string;
  prompt: string;
  count?: number;
};

export type CreateCreativeBody = {
  campaignId: string;
  headlineId: string;
  imageId: string;
};

// API Response types
export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

// Campaign with relations
export type CampaignWithRelations = Campaign & {
  headlines: Headline[];
  images: Image[];
  creatives: Creative[];
};

export type { Campaign, Creative, Headline, Image };