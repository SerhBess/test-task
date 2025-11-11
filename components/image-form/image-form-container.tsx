'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { SelectField, TextareaField, TextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useCampaignOptions } from '@/hooks/use-campaign-options';
import { useCampaigns } from '@/lib/api/campaign/hooks/useCampaigns';
import { useGenerateImage } from '@/lib/api/image-generation/hooks/useGenerateImage';
import { imageSchema, type ImageFormData } from '@/lib/validations/image';

export function ImageFormContainer() {
  const router = useRouter();

  const form = useForm<ImageFormData>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      campaignId: '',
      prompt: '',
      count: 1,
    },
  });

  const {
    data: campaigns,
    isLoading: isLoadingCampaigns,
    isError,
  } = useCampaigns();
  const generateImageMutation = useGenerateImage();
  const campaignOptions = useCampaignOptions({ campaigns });

  function onSubmit(data: ImageFormData) {
    generateImageMutation.mutate(data, {
      onSuccess: () => {
        router.push('/images');
        router.refresh();
      },
    });
  }

  return (
    <Card className="border-border/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                control={form.control}
                name="campaignId"
                label="Campaign"
                placeholder="Select campaign"
                options={campaignOptions}
                required
              />

              <TextField
                control={form.control}
                name="count"
                label="Number of Images"
                placeholder="1"
                type="number"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <TextareaField
                control={form.control}
                name="prompt"
                label="Image Prompt"
                placeholder="A vibrant summer beach scene with palm trees and sunset"
                rows={6}
                maxLength={1000}
              />
            </div>

            {isError && (
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <p className="text-sm font-medium text-destructive">
                  Failed to generate image
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoadingCampaigns}
                className="w-32 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoadingCampaigns}
                className="max-w-[200px] gap-2 cursor-pointer"
              >
                {isLoadingCampaigns && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {isLoadingCampaigns ? 'Generating...' : 'Generate Image'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
