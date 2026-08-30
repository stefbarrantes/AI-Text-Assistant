export type Operation = "summarize" | "rewrite" | "professional" | "friendly";

export interface AIResponse {
  result: string; // the actual transformed/generated text
  summary: string; // a one-line description of what was done
  tone: string; // the tone of the output (e.g. "professional", "casual")
}
