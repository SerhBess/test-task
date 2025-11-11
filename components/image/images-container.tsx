'use client';

import { useState } from 'react';

import { useCampaignOptions } from '@/hooks/use-campaign-options';
import { useCampaigns } from '@/lib/api/campaign/hooks/useCampaigns';
import { useImage } from '@/lib/api/image-generation/hooks/useImage';

import { CampaignSelect } from '../campaign-select';

import { ImageGrid } from './image-grid';

export function ImagesContainer() {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');

  const { data: campaigns, isLoading: isLoadingCampaigns } = useCampaigns();
  const { data: images, isLoading: isLoadingImages } =
    useImage(selectedCampaign);

  const campaignOptions = useCampaignOptions({ campaigns, includeAll: true });

  if (isLoadingCampaigns || isLoadingImages) {
    return (
      <div className="space-y-6">
        <CampaignSelect
          campaigns={[]}
          disabled={true}
          placeholder="Loading..."
        />
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading images...</p>
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

      {images ? <ImageGrid images={images} /> : null}
    </div>
  );
}
