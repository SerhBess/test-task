import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/db';
import type { Campaign, CreateCampaignBody } from '@/lib/types';

export type GetCampaignsResponse = Promise<
  NextResponse<Campaign[] | ErrorResponse>
>;
export type PostCampaignsResponse = Promise<
  NextResponse<Campaign | ErrorResponse>
>;

/**
 * GET /api/campaigns - get list of all campaigns
 */
export async function GET(): GetCampaignsResponse {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/campaigns - create new campaign
 * Body: { name, industry, audience, tone, description? }
 */
export async function POST(request: NextRequest): PostCampaignsResponse {
  try {
    const body: CreateCampaignBody = await request.json();
    const { audience, industry, name, tone, description } = body;

    if (!name || !industry || !audience || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, industry, audience, tone' },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.create({
      data: {
        name,
        industry,
        audience,
        tone,
        description: description || null,
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('Error during creation campaign', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}
