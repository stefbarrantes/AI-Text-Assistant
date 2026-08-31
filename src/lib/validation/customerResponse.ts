import { CustomerResponse } from "@/types/types";

export function isValidCustomerResponse(
  value: unknown,
): value is CustomerResponse {
  if (typeof value !== "object" || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.response === "string" &&
    obj.response.trim().length > 0 &&
    typeof obj.tone === "string" &&
    obj.tone.trim().length > 0 &&
    typeof obj.category === "string" &&
    obj.category.trim().length > 0 &&
    typeof obj.requiresMoreInformation === "boolean"
  );
}
