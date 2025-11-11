'use client';

import { PageHeader } from '@/components/page-header';
import { HeadlinesTableContainer } from '@/components/headline/headlineTableContainer';

export default function HeadlinesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="pt-20 pl-10 w-[90%] max-w-[1000px] space-y-8">
        <PageHeader
          title="All Headlines"
          description="View and manage your marketing headlines"
        />

        <HeadlinesTableContainer />
      </div>
    </div>
  );
}
