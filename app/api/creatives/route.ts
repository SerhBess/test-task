import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/db';
import type { Creative, CreateCreativeBody } from '@/lib/types';

export type GetCreativesResponse = Promise<
  NextResponse<Creative[] | ErrorResponse>
>;
export type PostCreativeResponse = Promise<
  NextResponse<Creative | ErrorResponse>
>;

/**
 * GET /api/creatives - get list of creatives (headline + image pairs)
 * Query params: ?campaignId=xxx (optional)
 */
export async function GET(request: NextRequest): GetCreativesResponse {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');

    const where = campaignId ? { campaignId } : {};

    const creatives = await prisma.creative.findMany({
      where,
      include: {
        headline: true,
        image: true,
        campaign: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(creatives);
  } catch (error) {
    console.error('Error fetching creatives', error);
    return NextResponse.json(
      { error: 'Failed to fetch creatives' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/creatives - create new creative (headline + image pair)
 * Body: { campaignId, headlineId, imageId }
 */
export async function POST(request: NextRequest): PostCreativeResponse {
  try {
    const body: CreateCreativeBody = await request.json();
    const { campaignId, headlineId, imageId } = body;

    if (!campaignId || !headlineId || !imageId) {
      return NextResponse.json(
        { error: 'Missing required fields: campaignId, headlineId, imageId' },
        { status: 400 }
      );
    }

    const [headline, image] = await Promise.all([
      prisma.headline.findUnique({ where: { id: headlineId } }),
      prisma.image.findUnique({ where: { id: imageId } }),
    ]);

    if (!headline || headline.campaignId !== campaignId) {
      return NextResponse.json(
        { error: 'Headline not found or does not belong to this campaign' },
        { status: 404 }
      );
    }

    if (!image || image.campaignId !== campaignId) {
      return NextResponse.json(
        { error: 'Image not found or does not belong to this campaign' },
        { status: 404 }
      );
    }

    const existingCreative = await prisma.creative.findUnique({
      where: {
        headlineId_imageId: {
          headlineId,
          imageId,
        },
      },
    });

    if (existingCreative) {
      return NextResponse.json(
        { error: 'This creative pair already exists' },
        { status: 409 }
      );
    }

    const creative = await prisma.creative.create({
      data: {
        campaignId,
        headlineId,
        imageId,
      },
      include: {
        headline: true,
        image: true,
        campaign: true,
      },
    });

    return NextResponse.json(creative, { status: 201 });
  } catch (error) {
    console.error('Error creating creative', error);
    return NextResponse.json(
      { error: 'Failed to create creative' },
      { status: 500 }
    );
  }
}
