import { Operation } from "@/app/types";

const RESPONSE_FORMAT_INSTRUCTIONS = `
Return your response with these fields:
- "result": the transformed text itself
- "summary": a brief, one-sentence description of what changes you made
- "tone": a single word describing the tone of the result (e.g. "concise", "professional", "casual")
`;

export function summarizePrompt(text: string): string {
  return `You are a professional editor skilled at distilling text down to its essential points.

Your task is to summarize the text below. Keep the summary clearly shorter than the original, capture only the key ideas, and preserve the original meaning and intent. Do not add opinions, conclusions, or information that is not present in the text — if something is unclear or missing from the source, do not guess or fill in gaps.

Text to summarize:
"""
${text}
"""
${RESPONSE_FORMAT_INSTRUCTIONS}`;
}

export function rewritePrompt(text: string): string {
  return `You are a skilled writing editor who improves clarity and flow without changing meaning.

Your task is to rewrite the text below so it reads more clearly and naturally. Fix awkward phrasing, improve sentence structure, and tighten wording where helpful. Preserve the original meaning, facts, and intent exactly — do not add new information, examples, or claims that are not already present in the text.

Text to rewrite:
"""
${text}
"""
${RESPONSE_FORMAT_INSTRUCTIONS}`;
}

export function professionalPrompt(text: string): string {
  return `You are a professional communications editor who specializes in formal, business-appropriate writing.

Your task is to rewrite the text below in a polished, professional tone suitable for a workplace or formal context. Use precise, respectful language, remove slang or overly casual phrasing, and maintain a confident, neutral voice. Preserve the original meaning and factual content exactly — do not invent details, statistics, or claims that are not in the original text.

Text to rewrite:
"""
${text}
"""
${RESPONSE_FORMAT_INSTRUCTIONS}`;
}

export function friendlyPrompt(text: string): string {
  return `You are a warm, approachable writer who specializes in friendly, conversational communication.

Your task is to rewrite the text below in a warm, casual, and friendly tone, as if explaining it to a friend. Keep the language approachable and natural, while preserving the original meaning and factual content exactly. Do not add information, exaggerate, or invent details that are not already present in the text.

Text to rewrite:
"""
${text}
"""
${RESPONSE_FORMAT_INSTRUCTIONS}`;
}

const PROMPT_BUILDERS: Record<Operation, (text: string) => string> = {
  summarize: summarizePrompt,
  rewrite: rewritePrompt,
  professional: professionalPrompt,
  friendly: friendlyPrompt,
};

export function buildPrompt(operation: Operation, text: string): string {
  return PROMPT_BUILDERS[operation](text);
}
