'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { TextField, SelectField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useCampaignOptions } from '@/hooks/use-campaign-options';
import { useCampaigns } from '@/lib/api/campaign/hooks/useCampaigns';
import { useGenerateHeadlines } from '@/lib/api/headline/hooks/useGenerateHeadlines';
import {
  headlineSchema,
  type HeadlineFormData,
} from '@/lib/validations/headline';

export default function NewHeadlinePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaignId');

  const { data: campaigns, isLoading: loadingCampaigns } = useCampaigns();
  const campaignOptions = useCampaignOptions({ campaigns });

  const form = useForm<HeadlineFormData>({
    resolver: zodResolver(headlineSchema),
    defaultValues: {
      campaignId: campaignId || '',
      count: 5,
    },
  });

  const generateHeadlinesMutation = useGenerateHeadlines();

  function onSubmit(data: HeadlineFormData) {
    generateHeadlinesMutation.mutate(data, {
      onSuccess: () => {
        router.push('/headlines');
        router.refresh();
      },
    });
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-10">
      <div className="w-full max-w-[1000px] space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Generate Headlines
          </h1>
        </div>

        <Card className="border-border/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    control={form.control}
                    name="campaignId"
                    label="Campaign"
                    placeholder="Select campaign"
                    options={campaignOptions}
                    disabled={loadingCampaigns}
                    required
                  />

                  <TextField
                    control={form.control}
                    name="count"
                    label="Number of Headlines"
                    placeholder="5"
                    type="number"
                    required
                  />
                </div>

                {generateHeadlinesMutation.error && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <p className="text-sm font-medium text-destructive">
                      {generateHeadlinesMutation.error.message}
                    </p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={generateHeadlinesMutation.isPending}
                    className="w-32 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={generateHeadlinesMutation.isPending}
                    className="max-w-[200px] gap-2 cursor-pointer"
                  >
                    {generateHeadlinesMutation.isPending && (
                      <Loader2 className="size-4 animate-spin" />
                    )}
                    {generateHeadlinesMutation.isPending
                      ? 'Generating...'
                      : 'Generate Headlines'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
