import { z } from 'zod';

export const creativeSchema = z.object({
  campaignId: z.string().min(1, 'Required'),
  headlineId: z.string().min(1, 'Required'),
  imageId: z.string().min(1, 'Required'),
});

export type CreativeFormData = z.infer<typeof creativeSchema>;
