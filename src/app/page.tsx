import FeatureLinks from "@/components/FeatureLinks";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <FeatureLinks />
        </div>
      </main>
    </div>
  );
}
