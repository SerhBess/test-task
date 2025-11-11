'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TextField, TextareaField, SelectField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useCreateCampaign } from '@/lib/api/campaign/hooks/useCreateCampaign';
import {
  campaignSchema,
  type CampaignFormData,
  toneOptions,
} from '@/lib/validations/campaign';

export default function NewCampaignPage() {
  const router = useRouter();
  const [error] = useState<string | null>(null);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: '',
      industry: '',
      audience: '',
      tone: 'professional',
      description: '',
    },
  });

  const createCampaignMutation = useCreateCampaign();

  function onSubmit(data: CampaignFormData) {
    createCampaignMutation.mutate(data, {
      onSuccess: () => {
        router.push(`/`);
        router.refresh();
      },
    });
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-10">
      <div className="w-full max-w-[1000px] space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Create New Campaign
          </h1>
        </div>

        {/* Form Card */}
        <Card className="border-border/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Four fields in one row */}
                <div className="grid grid-cols-4 gap-4">
                  {/* Campaign Name */}
                  <TextField
                    control={form.control}
                    name="name"
                    label="Campaign Name"
                    placeholder="e.g., Summer Sale 2024"
                    required
                  />

                  {/* Industry */}
                  <TextField
                    control={form.control}
                    name="industry"
                    label="Industry"
                    placeholder="e.g., Insurance, SaaS"
                    required
                  />

                  {/* Target Audience */}
                  <TextField
                    control={form.control}
                    name="audience"
                    label="Target Audience"
                    placeholder="e.g., Young professionals"
                    required
                  />

                  {/* Tone */}
                  <SelectField
                    control={form.control}
                    name="tone"
                    label="Tone"
                    placeholder="Select tone"
                    options={toneOptions}
                    required
                  />
                </div>

                {/* Description - same width as row above */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4">
                    <TextareaField
                      control={form.control}
                      name="description"
                      label="Description"
                      placeholder="Additional context, goals, or special requirements for this campaign..."
                      rows={6}
                      maxLength={500}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                    <p className="text-sm font-medium text-destructive">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={form.formState.isSubmitting}
                    className="w-32 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="max-w-[200px] gap-2 cursor-pointer"
                  >
                    {form.formState.isSubmitting && (
                      <Loader2 className="size-4 animate-spin" />
                    )}
                    {form.formState.isSubmitting
                      ? 'Creating Campaign...'
                      : 'Create Campaign'}
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
