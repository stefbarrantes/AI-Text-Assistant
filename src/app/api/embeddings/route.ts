import { NextRequest, NextResponse } from "next/server";
import { getGeminiEmbeddingEndpoint } from "@/lib/config";
import { cosineSimilarity } from "./cosineSimilarity";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { texts } = body;

    if (
      !Array.isArray(texts) ||
      texts.length === 0 ||
      texts.some((text) => typeof text !== "string" || text.trim().length === 0)
    ) {
      return NextResponse.json(
        { error: "Missing or invalid 'texts' field" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing API key" },
        { status: 500 },
      );
    }

    const embeddings = await Promise.all(
      texts.map(async (text) => {
        const response = await fetch(getGeminiEmbeddingEndpoint(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: {
              parts: [{ text }],
            },
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();

          throw new Error(
            `Embedding API error: ${response.status} ${errorText}`,
          );
        }

        const data = await response.json();

        return {
          text,
          embedding: data.embedding.values,
        };
      }),
    );

    const queryEmbedding = embeddings[0].embedding;

    const results = embeddings.slice(1).map((item) => ({
      text: item.text,
      similarity: cosineSimilarity(queryEmbedding, item.embedding),
    }));

    results.sort((a, b) => b.similarity - a.similarity);

    return NextResponse.json({ query: embeddings[0].text, results });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
