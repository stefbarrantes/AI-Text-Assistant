import { AIResponse } from "@/types/types";
import ResultCard from "@/components/ui/ResultCard";
import SummaryCard from "@/components/generator/SummaryCard";
import ToneBadge from "@/components/generator/ToneBadge";

type ResponseDisplayProps = {
  response: AIResponse;
};

export default function ResponseDisplay({ response }: ResponseDisplayProps) {
  const hasResult =
    typeof response.result === "string" && response.result.trim().length > 0;

  const hasSummary =
    typeof response.summary === "string" && response.summary.trim().length > 0;

  const hasTone =
    typeof response.tone === "string" && response.tone.trim().length > 0;

  if (!hasResult && !hasSummary && !hasTone) {
    return (
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        The model returned an empty or unrecognized response. Try again.
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5">
      {hasResult && <ResultCard result={response.result} />}

      {hasSummary && <SummaryCard summary={response.summary} />}

      {hasTone && <ToneBadge tone={response.tone} />}

      {(!hasResult || !hasSummary || !hasTone) && (
        <p className="px-1 text-xs text-slate-400">
          Note: some fields were missing from the model&apos;s response.
        </p>
      )}
    </div>
  );
}
