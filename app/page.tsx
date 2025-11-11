import { CampaignsContainer } from '@/components/campaign';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="pt-20 pl-10 w-[90%] max-w-[1000px]">
        <CampaignsContainer />
      </div>
    </main>
  );
}
