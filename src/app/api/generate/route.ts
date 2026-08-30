import { NextRequest, NextResponse } from "next/server";
import { AIResponse, Operation } from "@/app/types";
import { buildPrompt } from "@/app/lib/prompts";
import { validateGenerateRequest } from "@/app/lib/validation";
import { isValidAIResponse } from "@/app/lib/validateAIResponse";

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    result: { type: "string" },
    summary: { type: "string" },
    tone: { type: "string" },
  },
  required: ["result", "summary", "tone"],
};

export async function POST(req: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateGenerateRequest(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { text, operation } = body as { text: string; operation: Operation };
    const finalPrompt = buildPrompt(operation, text);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing API key" },
        { status: 500 },
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "Gemini API error", details: errorText },
        { status: response.status },
      );
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        { error: "Empty response from model" },
        { status: 502 },
      );
    }

    // validate the response
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { error: "Model returned malformed JSON" },
        { status: 502 },
      );
    }

    if (!isValidAIResponse(parsed)) {
      return NextResponse.json(
        { error: "Model response failed validation" },
        { status: 502 },
      );
    }

    // parsed is now safely typed as AIResponse
    return NextResponse.json(parsed satisfies AIResponse);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
