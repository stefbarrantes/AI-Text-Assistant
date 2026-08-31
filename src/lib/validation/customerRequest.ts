interface ValidationResult {
  valid: boolean;
  error?: string;
  message?: string;
}

export function validateCustomerRequest(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Request body must be a JSON object" };
  }

  const parsed = body as Record<string, unknown>;
  const directMessage = parsed.message;
  const messages = parsed.messages;

  let customerMessage: unknown = directMessage;

  if (customerMessage === undefined && Array.isArray(messages)) {
    const lastUserMessage = [...messages]
      .reverse()
      .find(
        (entry): entry is { role?: string; content?: unknown } =>
          typeof entry === "object" &&
          entry !== null &&
          (entry as { role?: unknown }).role === "user" &&
          typeof (entry as { content?: unknown }).content === "string",
      );

    customerMessage = lastUserMessage?.content;
  }

  if (customerMessage === undefined || customerMessage === null) {
    return { valid: false, error: "Missing 'message' field" };
  }

  if (typeof customerMessage !== "string") {
    return { valid: false, error: "'message' must be a string" };
  }

  if (customerMessage.trim().length === 0) {
    return { valid: false, error: "'message' cannot be empty" };
  }

  return { valid: true, message: customerMessage };
}
