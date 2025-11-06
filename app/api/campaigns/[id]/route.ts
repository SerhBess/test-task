import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/db';
import type { Campaign } from '@/lib/types';

export type GetCampaignByIdResponse = Promise<
  NextResponse<Campaign | ErrorResponse>
>;
export type DeleteCampaignResponse = Promise<
  NextResponse<{ success: boolean } | ErrorResponse>
>;

/**
 * GET /api/campaigns/[id] - get campaign by ID with related data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): GetCampaignByIdResponse {
  try {
    const { id } = await params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        headlines: true,
        images: true,
        creatives: {
          include: {
            headline: true,
            image: true,
          },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaign' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/campaigns/[id] - delete campaign by ID (cascades to related data)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): DeleteCampaignResponse {
  try {
    const { id } = await params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    await prisma.campaign.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting campaign', error);
    return NextResponse.json(
      { error: 'Failed to delete campaign' },
      { status: 500 }
    );
  }
}
