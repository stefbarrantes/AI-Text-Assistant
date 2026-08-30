import { Operation } from "@/app/types";

const VALID_OPERATIONS: Operation[] = [
  "summarize",
  "rewrite",
  "professional",
  "friendly",
];

export function isOperation(value: unknown): value is Operation {
  return (
    typeof value === "string" && VALID_OPERATIONS.includes(value as Operation)
  );
}

interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateGenerateRequest(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Request body must be a JSON object" };
  }

  const { text, operation } = body as Record<string, unknown>;

  if (text === undefined || text === null) {
    return { valid: false, error: "Missing 'text' field" };
  }

  if (typeof text !== "string") {
    return { valid: false, error: "'text' must be a string" };
  }

  if (text.trim().length === 0) {
    return { valid: false, error: "'text' cannot be empty" };
  }

  if (operation === undefined || operation === null) {
    return { valid: false, error: "Missing 'operation' field" };
  }

  if (!isOperation(operation)) {
    return {
      valid: false,
      error: `'operation' must be one of: ${VALID_OPERATIONS.join(", ")}`,
    };
  }

  return { valid: true };
}
