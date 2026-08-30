"use client";

import { useState } from "react";
import { Operation } from "../types";
import ReactMarkdown from "react-markdown";
import OperationSelector from "./OperationSelector";

export default function Generator() {
  const [operation, setOperation] = useState<Operation>("summarize");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: prompt, operation }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data.text);
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
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          rows={4}
          className="w-full p-3 text-base text-gray-900 placeholder-gray-400 bg-white rounded-lg border border-gray-300 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="self-start px-5 py-2.5 text-base font-medium rounded-lg bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Generating...
            </span>
          ) : (
            "Generate"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-5 p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-base leading-relaxed whitespace-pre-wrap break-words">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
