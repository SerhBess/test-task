import { z } from 'zod';

export const campaignSchema = z.object({
  name: z
    .string()
    .min(3, 'Must be at least 3 characters')
    .max(100, 'Must not exceed 100 characters'),

  industry: z
    .string()
    .min(2, 'Must be at least 2 characters')
    .max(50, 'Must not exceed 50 characters'),

  audience: z
    .string()
    .min(3, 'Must be at least 3 characters')
    .max(100, 'Must not exceed 100 characters'),

  tone: z.enum(['professional', 'casual', 'exciting', 'trustworthy']),

  description: z
    .string()
    .max(500, 'Must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;

// Tone options for select field
export const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'exciting', label: 'Exciting' },
  { value: 'trustworthy', label: 'Trustworthy' },
];
