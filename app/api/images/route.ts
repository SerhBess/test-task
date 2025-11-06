import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/db';
import { openai } from '@/lib/openai';
import type { Image, GenerateImagesBody } from '@/lib/types';

type GetImagesResponse = Promise<NextResponse<Image[] | ErrorResponse>>;
type PostGenerateImage = Promise<NextResponse<Image[] | ErrorResponse>>;

/**
 * GET /api/images - get list of images
 * Query params: ?campaignId=xxx (optional)
 */
export async function GET(request: NextRequest): GetImagesResponse {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');

    const where = campaignId ? { campaignId } : {};

    const images = await prisma.image.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/images - generate images using DALL-E 3
 * Body: { campaignId, prompt, count? }
 * Note: DALL-E URLs expire after 1 hour (temporary storage)
 */
export async function POST(request: NextRequest): PostGenerateImage {
  try {
    const body: GenerateImagesBody = await request.json();

    const { campaignId, prompt, count = 1 } = body;

    if (!campaignId || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: campaignId, prompt' },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    const imagePromises = Array.from({ length: count }, async () => {
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: `Create a 16:9 marketing image for: ${prompt}. Context: ${campaign.industry} industry, targeting ${campaign.audience}, ${campaign.tone} tone.`,
        size: '1792x1024', // 16:9 aspect ratio
        quality: 'standard',
        n: 1,
      });

      if (!response.data || !response.data[0]?.url) {
        throw new Error('No image URL returned from DALL-E');
      }

      const imageUrl = response.data[0].url;

      return prisma.image.create({
        data: {
          imageUrl,
          prompt,
          campaignId,
          status: 'ACTIVE',
        },
      });
    });

    const images = await Promise.all(imagePromises);

    return NextResponse.json(images, { status: 201 });
  } catch (error) {
    console.error('Error generating images:', error);
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    );
  }
}
