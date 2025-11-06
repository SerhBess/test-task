import { NextRequest, NextResponse } from 'next/server';

import { ErrorResponse } from '@/app/types';
import { prisma } from '@/lib/db';
import { openai } from '@/lib/openai';
import type { Headline, GenerateHeadlinesBody } from '@/lib/types';

type GetHeadlinesResponse = Promise<NextResponse<Headline[] | ErrorResponse>>;
type PostGenerateHeadlines = Promise<NextResponse<Headline[] | ErrorResponse>>;

/**
 * GET /api/headlines - get list of headlines
 * Query params: ?campaignId=xxx (optional)
 */
export async function GET(request: NextRequest): GetHeadlinesResponse {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaignId');

    const where = campaignId ? { campaignId } : {};

    const headlines = await prisma.headline.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(headlines);
  } catch (error) {
    console.error('Error fetching headlines', error);
    return NextResponse.json(
      { error: 'Failed to fetch headlines' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/headlines - generate German marketing headlines using OpenAI
 * Body: { campaignId, count? }
 */
export async function POST(request: NextRequest): PostGenerateHeadlines {
  try {
    const body: GenerateHeadlinesBody = await request.json();
    const { campaignId, count = 5 } = body;

    if (!campaignId) {
      return NextResponse.json(
        { error: 'Missing required field: campaignId' },
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'Du bist ein kreativer Marketing-Experte, der überzeugende deutsche Werbeüberschriften erstellt. Erstelle kurze, einprägsame Headlines auf Deutsch.',
        },
        {
          role: 'user',
          content: `Erstelle ${count} Marketing-Headlines auf Deutsch für eine Kampagne mit folgenden Details:
            - Name: ${campaign.name}
            - Branche: ${campaign.industry}
            - Zielgruppe: ${campaign.audience}
            - Tonalität: ${campaign.tone}
            ${campaign.description ? `- Beschreibung: ${campaign.description}` : ''}

            Gib nur die Headlines zurück, jeweils in einer neuen Zeile, ohne Nummerierung oder zusätzliche Formatierung.`,
        },
      ],
      temperature: 0.9,
    });

    const generatedText = completion.choices[0]?.message?.content || '';
    const headlineTexts = generatedText
      .split('\n')
      .filter(line => line.trim().length > 0)
      .slice(0, count);

    const headlines = await Promise.all(
      headlineTexts.map(text =>
        prisma.headline.create({
          data: {
            text,
            campaignId,
            status: 'ACTIVE',
          },
        })
      )
    );

    return NextResponse.json(headlines, { status: 201 });
  } catch (error) {
    console.error('Error generating headlines:', error);
    return NextResponse.json(
      { error: 'Failed to generate headlines' },
      { status: 500 }
    );
  }
}
