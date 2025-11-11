'use client';

import { useState } from 'react';

import { useCampaignOptions } from '@/hooks/use-campaign-options';
import { useCampaigns } from '@/lib/api/campaign/hooks/useCampaigns';
import { useHeadlines } from '@/lib/api/headline/hooks/useHeadlines';

import { CampaignSelect } from '../../campaign-select';

import { HeadlineTable } from './headline-table';

export function HeadlinesTableContainer() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');

  const { data: campaigns, isLoading: isLoadingCampaigns } = useCampaigns();
  const campaignOptions = useCampaignOptions({ campaigns, includeAll: true });

  const { data: headlines, isLoading: isLoadingHeadlines } =
    useHeadlines(selectedCampaign);

  if (isLoadingCampaigns || isLoadingHeadlines) {
    return (
      <div className="space-y-6">
        <CampaignSelect
          campaigns={[]}
          disabled={true}
          placeholder="Loading..."
        />
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading headlines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {campaigns ? (
        <CampaignSelect
          campaigns={campaignOptions}
          value={selectedCampaign}
          onValueChange={setSelectedCampaign}
        />
      ) : null}

      {headlines && headlines.length > 0 ? (
        <HeadlineTable headlines={headlines} />
      ) : null}
    </div>
  );
}
