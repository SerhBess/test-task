'use client';

import { useState } from 'react';

import { useCampaignOptions } from '@/hooks/use-campaign-options';
import { useCampaigns } from '@/lib/api/campaign/hooks/useCampaigns';
import { useCreatives } from '@/lib/api/creative/hooks/useCreatives';

import { CampaignSelect } from '../campaign-select';

import { CreativesGrid } from './creatives-grid';


export function CreativesContainer() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');

  const { data: campaigns, isLoading: isLoadingCampaigns } = useCampaigns();
  const campaignOptions = useCampaignOptions({ campaigns, includeAll: true });

  const { data: creatives, isLoading: isLoadingCreatives } =
    useCreatives(selectedCampaign);

  if (isLoadingCampaigns || isLoadingCreatives) {
    return (
      <div className="space-y-6">
        <CampaignSelect
          campaigns={[]}
          disabled={true}
          placeholder="Loading..."
        />
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading creatives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CampaignSelect
        campaigns={campaignOptions}
        value={selectedCampaign}
        onValueChange={setSelectedCampaign}
      />

      <CreativesGrid creatives={creatives || []} />
    </div>
  );
}
