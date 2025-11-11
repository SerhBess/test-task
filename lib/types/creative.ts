import { Headline } from './headline';
import { Image } from './image';

export interface Creative {
  id: string;
  campaignId: string;
  headlineId: string;
  imageId: string;
  createdAt: Date;
}

export interface CreativeWithRelations extends Creative {
  headline: Headline;
  image: Image;
}

export interface CreateCreativeRequest {
  campaignId: string;
  headlineId: string;
  imageId: string;
}

export interface CreateCreativeResponse {
  creative: Creative;
}
