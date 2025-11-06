import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/db';
import type { Image } from '@/lib/types';

export type GetImageByIdResponse = Promise<
  NextResponse<Image | ErrorResponse>
>;
export type DeleteImageResponse = Promise<
  NextResponse<{ success: boolean } | ErrorResponse>
>;

/**
 * GET /api/images/[id] - get image by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): GetImageByIdResponse {
  try {
    const { id } = await params;

    const image = await prisma.image.findUnique({
      where: { id },
      include: {
        campaign: true,
      },
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error('Error fetching image', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/images/[id] - delete image by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): DeleteImageResponse {
  try {
    const { id } = await params;

    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    await prisma.image.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
