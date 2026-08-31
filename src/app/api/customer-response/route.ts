import { NextRequest, NextResponse } from "next/server";
import { CustomerResponse } from "@/types/types";
import { buildCustomerResponsePrompt } from "@/lib/prompts/customerResponse";
import { isValidCustomerResponse } from "@/lib/validation/customerResponse";
import { getGeminiEndpoint } from "@/lib/config";
import { validateCustomerRequest } from "@/lib/validation/customerRequest";

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    response: { type: "string" },
    tone: { type: "string" },
    category: { type: "string" },
    requiresMoreInformation: { type: "boolean" },
  },
  required: ["response", "tone", "category", "requiresMoreInformation"],
};

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateCustomerRequest(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const message = validation.message;
    if (!message) {
      return NextResponse.json(
        { error: "Missing 'message' field" },
        { status: 400 },
      );
    }

    const finalPrompt = buildCustomerResponsePrompt(message);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing API key" },
        { status: 500 },
      );
    }

    const geminiResponse = await fetch(getGeminiEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: finalPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return NextResponse.json(
        { error: "Gemini API error", details: errorText },
        { status: geminiResponse.status },
      );
    }

    const data = await geminiResponse.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { error: "Empty response from model" },
        { status: 502 },
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { error: "Model returned malformed JSON" },
        { status: 502 },
      );
    }

    if (!isValidCustomerResponse(parsed)) {
      return NextResponse.json(
        { error: "Model response failed validation" },
        { status: 502 },
      );
    }

    return NextResponse.json(parsed satisfies CustomerResponse);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
