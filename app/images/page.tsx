'use client';

import { ImagesContainer } from '@/components/image';
import { PageHeader } from '@/components/page-header';

export default function ImagesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="pt-20 pl-10 w-[90%] max-w-[1000px] space-y-8">
        <PageHeader
          title="All Images"
        />

        <ImagesContainer />
      </div>
    </div>
  );
}
