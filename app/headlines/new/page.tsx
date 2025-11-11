import { Suspense } from 'react';

import { HeadlineFormContainer } from '@/components/headline/headline-form-container';
import { PageHeader } from '@/components/page-header';

export default function NewHeadlinePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-10">
      <div className="w-full max-w-[1000px] space-y-8">
        <PageHeader title="Generate Headlines" />

        <Suspense fallback={<div>Loading...</div>}>
          <HeadlineFormContainer />
        </Suspense>
      </div>
    </div>
  );
}
