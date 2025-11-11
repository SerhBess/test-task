export interface Image {
  id: string;
  campaignId: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
}

export interface GenerateImageRequest {
  campaignId: string;
  prompt: string;
  count?: number;
}

export interface GenerateImageResponse {
  image: Image;
}


export type ImageGenerateProps = {
  prompt?: string;
  campaignId: string;
  count?: number;
};