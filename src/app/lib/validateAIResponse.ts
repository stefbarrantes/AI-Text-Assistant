import { AIResponse } from "@/app/types";

export function isValidAIResponse(value: unknown): value is AIResponse {
  if (typeof value !== "object" || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.result === "string" &&
    obj.result.trim().length > 0 &&
    typeof obj.summary === "string" &&
    typeof obj.tone === "string"
  );
}
