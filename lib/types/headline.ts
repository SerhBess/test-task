export interface Headline {
  id: string;
  campaignId: string;
  text: string;
  variant: number;
  createdAt: Date;
}

export interface GenerateHeadlinesRequest {
  campaignId: string;
  count?: number;
}

export interface GenerateHeadlinesResponse {
  headlines: Headline[];
}
