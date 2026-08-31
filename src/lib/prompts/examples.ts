import { CustomerResponse } from "@/types/types";

interface CustomerResponseExample {
  customerMessage: string;
  response: CustomerResponse;
}

// examples of the behavior I want the LLM to reproduce
export const CUSTOMER_RESPONSE_EXAMPLES: CustomerResponseExample[] = [
  {
    customerMessage:
      "My order hasn't arrived yet and it's been over a week. This is really frustrating.",
    response: {
      response:
        "I'm sorry to hear your order hasn't arrived yet — a week's wait is longer than it should be, and I understand the frustration. Could you share your order number so I can look into exactly where it is and get this resolved for you?",
      tone: "empathetic",
      category: "shipping_delay",
      requiresMoreInformation: true,
    },
  },
  {
    customerMessage: "Do you offer international shipping to Canada?",
    response: {
      response:
        "Yes, we do ship to Canada. Delivery typically takes 7-10 business days, and any applicable customs fees are the customer's responsibility. Let me know if you'd like help placing an order.",
      tone: "informative",
      category: "shipping_inquiry",
      requiresMoreInformation: false,
    },
  },
  {
    customerMessage:
      "This product is garbage and completely broke after two days. I want my money back NOW.",
    response: {
      response:
        "I'm really sorry to hear the product broke so quickly — that's not the experience we want you to have, and I understand the frustration. I'd like to get this sorted with a refund or replacement right away. Could you confirm your order number so I can process this for you?",
      tone: "apologetic",
      category: "product_defect",
      requiresMoreInformation: true,
    },
  },
  {
    customerMessage:
      "Just wanted to say your customer support team was super helpful yesterday, thank you!",
    response: {
      response:
        "Thank you so much for the kind words — I'll be sure to pass this along to the team. We're glad we could help, and please don't hesitate to reach out if you need anything else!",
      tone: "friendly",
      category: "positive_feedback",
      requiresMoreInformation: false,
    },
  },
];
