"use client";

import { useState, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { Operation, AIResponse } from "@/app/types";
import OperationSelector from "./OperationSelector";

export default function Generator() {
  const [operation, setOperation] = useState<Operation>("summarize");
  const [text, setText] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, operation }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResponse(data);
    } catch (err: any) {
      setError(err.message || "Failed to generate response");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <OperationSelector value={operation} onChange={setOperation} />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text..."
          rows={4}
          className="w-full p-3 text-base text-gray-900 placeholder-gray-400 bg-white rounded-lg border border-gray-300 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="self-start px-5 py-2.5 text-base font-medium rounded-lg bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {response && <ResponseDisplay response={response} />}
    </div>
  );
}

function ResponseDisplay({ response }: { response: AIResponse }) {
  const hasResult =
    typeof response.result === "string" && response.result.trim().length > 0;
  const hasSummary =
    typeof response.summary === "string" && response.summary.trim().length > 0;
  const hasTone =
    typeof response.tone === "string" && response.tone.trim().length > 0;

  if (!hasResult && !hasSummary && !hasTone) {
    return (
      <div className="mt-5 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
        The model returned an empty or unrecognized response. Try again.
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col gap-4">
      {hasResult && (
        <section className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-lg">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
            Result
          </h2>
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-a:text-blue-600">
            <ReactMarkdown>{response.result}</ReactMarkdown>
          </div>
        </section>
      )}

      {hasSummary && (
        <section className="p-4 sm:p-5 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-blue-600 mb-2">
            Summary
          </h2>
          <p className="text-gray-800 text-base leading-relaxed">
            {response.summary}
          </p>
        </section>
      )}

      {hasTone && (
        <section className="flex items-center gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Tone
          </h2>
          <span className="px-2.5 py-1 text-sm font-medium rounded-full bg-gray-900 text-white capitalize">
            {response.tone}
          </span>
        </section>
      )}

      {(!hasResult || !hasSummary || !hasTone) && (
        <p className="text-xs text-gray-400">
          Note: some fields were missing from the model's response.
        </p>
      )}
    </div>
  );
}
