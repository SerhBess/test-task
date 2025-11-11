import { z } from 'zod';

export const imageSchema = z.object({
  campaignId: z.string().min(1, 'Required'),
  prompt: z
    .string()
    .min(10, 'Must be at least 10 characters')
    .max(1000, 'Must not exceed 1000 characters'),
  count: z
    .number()
    .min(1, 'Must be at least 1')
    .max(3, 'Must not exceed 3'),
});

export type ImageFormData = z.infer<typeof imageSchema>;
