'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { SelectField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useCampaignOptions } from '@/hooks/use-campaign-options';
import { useCampaigns } from '@/lib/api/campaign/hooks/useCampaigns';
import { useHeadlines } from '@/lib/api/headline/hooks/useHeadlines';
import { useImage } from '@/lib/api/image-generation/hooks/useImage';
import {
  creativeSchema,
  type CreativeFormData,
} from '@/lib/validations/creative';

import { CreativePreview } from './creative-preview';

import { useCreateCreative } from '@/lib/api/creative/hooks/useCreateCreative';

export function CreativeFormContainer() {
  const router = useRouter();

  const form = useForm<CreativeFormData>({
    resolver: zodResolver(creativeSchema),
    defaultValues: {
      campaignId: '',
      headlineId: '',
      imageId: '',
    },
  });

  const {
    mutate: createCreative,
    isPending: isLoading,
    error,
  } = useCreateCreative();

  const { data: campaigns, isLoading: isLoadingCampaigns } = useCampaigns();
  const campaignOptions = useCampaignOptions({ campaigns });

  const selectedCampaign = useWatch({
    control: form.control,
    name: 'campaignId',
  });

  const selectedHeadlineId = useWatch({
    control: form.control,
    name: 'headlineId',
  });

  const selectedImageId = useWatch({
    control: form.control,
    name: 'imageId',
  });

  const { data: headlines } = useHeadlines(selectedCampaign);
  const { data: images } = useImage(selectedCampaign);

  const headlineOptions = useMemo(
    () =>
      headlines?.map(h => ({
        value: h.id,
        label: h.text,
      })) || [],
    [headlines]
  );

  const imageOptions = useMemo(
    () =>
      images?.map(i => ({
        value: i.id,
        label: `Image ${i.id}`,
      })) || [],
    [images]
  );

  const selectedHeadline = useMemo(
    () => headlines?.find(h => h.id === selectedHeadlineId),
    [headlines, selectedHeadlineId]
  );

  const selectedImage = useMemo(
    () => images?.find(i => i.id === selectedImageId),
    [images, selectedImageId]
  );

  function onSubmit(data: CreativeFormData) {
    createCreative(data, {
      onSuccess: () => {
        router.push('/creatives');
        router.refresh();
      },
    });
  }

  return (
    <div className="space-y-8">
      <Card className="border-border/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <SelectField
                  control={form.control}
                  name="campaignId"
                  label="Campaign"
                  placeholder="Select campaign"
                  options={campaignOptions}
                  disabled={isLoadingCampaigns}
                  required
                />

                <SelectField
                  control={form.control}
                  name="headlineId"
                  label="Headline"
                  placeholder="Select headline"
                  options={headlineOptions}
                  required
                />

                <SelectField
                  control={form.control}
                  name="imageId"
                  label="Image"
                  placeholder="Select image"
                  options={imageOptions}
                  required
                />
              </div>

              {error && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                  <p className="text-sm font-medium text-destructive">
                    {error instanceof Error
                      ? error.message
                      : 'Failed to create creative'}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                  className="w-32 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="max-w-[200px] gap-2 cursor-pointer"
                >
                  {isLoading && <Loader2 className="size-4 animate-spin" />}
                  {isLoading ? 'Creating...' : 'Create Creative'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {selectedHeadline && selectedImage && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <div className="max-w-md mx-auto">
            <CreativePreview
              imageUrl={selectedImage.imageUrl}
              headlineText={selectedHeadline.text}
            />
          </div>
        </div>
      )}
    </div>
  );
}
