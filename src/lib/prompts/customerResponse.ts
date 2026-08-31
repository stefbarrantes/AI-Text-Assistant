import { CUSTOMER_RESPONSE_EXAMPLES } from "./examples";

const BUSINESS_INSTRUCTIONS = `You are a customer support assistant for an e-commerce company. Your job is to draft a reply to the customer's message below.

Guidelines:
- Be empathetic and professional. Acknowledge the customer's situation before addressing it.
- Keep responses concise — 2-4 sentences is typical.
- If you need more details to actually resolve the issue (e.g. an order number, account email, product name), ask for them clearly and set requiresMoreInformation to true.
- Never make promises about refunds, compensation, or timelines that you cannot actually guarantee — offer to look into it or escalate instead.
- Do not invent order details, policies, or information the customer did not provide.
- Categorize the message using a short, lowercase, underscore-separated label (e.g. "shipping_delay", "product_defect", "billing_question", "positive_feedback", "general_inquiry").
- Choose a tone label that reflects the reply's tone (e.g. "empathetic", "apologetic", "friendly", "informative", "professional").`;

function formatExamples(): string {
  return CUSTOMER_RESPONSE_EXAMPLES.map((ex, i) => {
    return `Example ${i + 1}:
Customer message: "${ex.customerMessage}"
Response:
${JSON.stringify(ex.response, null, 2)}`;
  }).join("\n\n");
}

export function buildCustomerResponsePrompt(customerMessage: string): string {
  return `${BUSINESS_INSTRUCTIONS}

Here are some examples of well-formed responses:

${formatExamples()}

Now generate a response for this customer message:
"""
${customerMessage}
"""`;
}
