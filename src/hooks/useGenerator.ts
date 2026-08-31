"use client";

import { useState } from "react";
import { Operation, AIResponse } from "@/types/types";

type UseGeneratorReturn = {
  operation: Operation;
  text: string;
  response: AIResponse | null;
  loading: boolean;
  error: string;
  setOperation: (operation: Operation) => void;
  setText: (text: string) => void;
  generate: () => Promise<void>;
};

export function useGenerator(): UseGeneratorReturn {
  const [operation, setOperation] = useState<Operation>("summarize");

  const [text, setText] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    if (!text.trim() || loading) return;

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          operation,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResponse(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate response",
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    operation,
    text,
    response,
    loading,
    error,
    setOperation,
    setText,
    generate,
  };
}
