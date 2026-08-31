import ReactMarkdown from "react-markdown";

type ResultCardProps = {
  result: string;
};

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            ✦
          </div>

          <h2 className="text-sm font-semibold text-slate-900">Result</h2>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="prose prose-sm max-w-none text-slate-700 sm:prose-base prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900 prose-strong:text-slate-900 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-li:marker:text-slate-400">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
