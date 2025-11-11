import { CreativeFormContainer } from '@/components/creative/creative-form-container';
import { PageHeader } from '@/components/page-header';

export default function NewCreativePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-10">
      <div className="w-full max-w-[1000px] space-y-8">
        <PageHeader title="Create Creative" />

        <CreativeFormContainer />
      </div>
    </div>
  );
}
