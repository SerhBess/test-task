import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/lib/types/campaign';

interface CampaignCardProps {
  campaign: Campaign;
  onClick?: () => void;
}

export function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  const toneLabels: Record<string, string> = {
    professional: 'Professional',
    casual: 'Casual',
    exciting: 'Exciting',
    trustworthy: 'Trustworthy',
  };

  return (
    <Card
      className="cursor-pointer hover:border-primary/50 transition-colors"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{campaign.name}</CardTitle>
          <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
            {toneLabels[campaign.tone] || campaign.tone}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground text-xs">Industry</dt>
            <dd className="font-medium mt-1">{campaign.industry}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">Target Audience</dt>
            <dd className="font-medium mt-1">{campaign.audience}</dd>
          </div>
          {campaign.description && (
            <div>
              <dt className="text-muted-foreground text-xs">Description</dt>
              <dd className="line-clamp-2 mt-1 text-muted-foreground">
                {campaign.description}
              </dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}
