import Generator from "@/components/generator/Generator";

export default function GeneratorPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <Generator />
      </div>
    </main>
  );
}
