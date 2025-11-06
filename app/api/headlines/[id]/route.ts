import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/db';
import type { Headline } from '@/lib/types';

export type GetHeadlineByIdResponse = Promise<
  NextResponse<Headline | ErrorResponse>
>;
export type DeleteHeadlineResponse = Promise<
  NextResponse<{ success: boolean } | ErrorResponse>
>;

/**
 * GET /api/headlines/[id] - get headline by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): GetHeadlineByIdResponse {
  try {
    const { id } = await params;

    const headline = await prisma.headline.findUnique({
      where: { id },
      include: {
        campaign: true,
      },
    });

    if (!headline) {
      return NextResponse.json(
        { error: 'Headline not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(headline);
  } catch (error) {
    console.error('Error fetching headline', error);
    return NextResponse.json(
      { error: 'Failed to fetch headline' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/headlines/[id] - delete headline by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): DeleteHeadlineResponse {
  try {
    const { id } = await params;

    const headline = await prisma.headline.findUnique({
      where: { id },
    });

    if (!headline) {
      return NextResponse.json(
        { error: 'Headline not found' },
        { status: 404 }
      );
    }

    await prisma.headline.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting headline', error);
    return NextResponse.json(
      { error: 'Failed to delete headline' },
      { status: 500 }
    );
  }
}
