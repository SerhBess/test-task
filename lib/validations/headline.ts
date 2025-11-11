import { z } from 'zod';

export const headlineSchema = z.object({
  campaignId: z.string().min(1, 'Required'),
  count: z
    .number()
    .min(1, 'Must be at least 1')
    .max(5, 'Must not exceed 5'),
});

export type HeadlineFormData = z.infer<typeof headlineSchema>;
