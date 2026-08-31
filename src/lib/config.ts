export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

export function getGeminiEndpoint(streaming = false): string {
  const method = streaming ? "streamGenerateContent" : "generateContent";
  const sse = streaming ? "&alt=sse" : "";
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:${method}?key=${process.env.GEMINI_API_KEY}${sse}`;
}
