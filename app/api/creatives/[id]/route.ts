import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/db';
import type { Creative } from '@/lib/types';

export type GetCreativeByIdResponse = Promise<
  NextResponse<Creative | ErrorResponse>
>;
export type DeleteCreativeResponse = Promise<
  NextResponse<{ success: boolean } | ErrorResponse>
>;

/**
 * GET /api/creatives/[id] - get creative by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): GetCreativeByIdResponse {
  try {
    const { id } = await params;

    const creative = await prisma.creative.findUnique({
      where: { id },
      include: {
        headline: true,
        image: true,
        campaign: true,
      },
    });

    if (!creative) {
      return NextResponse.json(
        { error: 'Creative not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(creative);
  } catch (error) {
    console.error('Error fetching creative', error);
    return NextResponse.json(
      { error: 'Failed to fetch creative' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/creatives/[id] - delete creative by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): DeleteCreativeResponse {
  try {
    const { id } = await params;

    const creative = await prisma.creative.findUnique({
      where: { id },
    });

    if (!creative) {
      return NextResponse.json(
        { error: 'Creative not found' },
        { status: 404 }
      );
    }

    await prisma.creative.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting creative', error);
    return NextResponse.json(
      { error: 'Failed to delete creative' },
      { status: 500 }
    );
  }
}
