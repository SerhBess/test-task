'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CampaignOption {
  value: string;
  label: string;
}

interface CampaignSelectProps {
  campaigns: CampaignOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function CampaignSelect({
  campaigns,
  value,
  onValueChange,
  placeholder = 'All campaigns',
  disabled = false,
}: CampaignSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[280px] cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {campaigns.map((campaign) => (
          <SelectItem
            key={campaign.value}
            value={campaign.value}
            className="cursor-pointer"
          >
            {campaign.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
