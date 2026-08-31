type SummaryCardProps = {
  summary: string;
};

export default function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <section className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
          ✓
        </div>

        <h2 className="text-sm font-semibold text-indigo-900">Summary</h2>
      </div>

      <p className="text-[15px] leading-7 text-slate-700">{summary}</p>
    </section>
  );
}
