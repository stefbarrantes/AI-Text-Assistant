export type Operation = "summarize" | "rewrite" | "professional" | "friendly";

export interface AIResponse {
  result: string; // the actual transformed/generated text
  summary: string; // a one-line description of what was done
  tone: string; // the tone of the output (e.g. "professional", "casual")
}
export interface CustomerResponse {
  response: string;
  tone: string;
  category: string;
  requiresMoreInformation: boolean;
}

export type ChatRole = "user" | "assistant";
export type ChatMessage = { id: string; role: ChatRole; content: string };
