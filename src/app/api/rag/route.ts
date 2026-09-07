import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getGeminiEmbeddingEndpoint, getGeminiEndpoint } from "@/lib/config";

type RetrievedDocument = {
  id: number;
  content: string;
  category: string;
  similarity: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { query, matchCount = 3, matchThreshold = 0.3, category } = body;

    if (typeof query !== "string" || query.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'query' field" },
        { status: 400 },
      );
    }

    const supabase = createSupabaseServerClient();

    // 1. Generate embedding for the user's query
    const response = await fetch(getGeminiEmbeddingEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: {
          parts: [{ text: query }],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Embedding API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const queryEmbedding = data.embedding.values;

    // 2. Retrieve relevant documents from the vector database
    const { data: documents, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
      filter_category: category ?? null,
    });

    if (error) {
      console.error("Supabase RPC error:", error);

      return NextResponse.json(
        { error: "Failed to retrieve documents" },
        { status: 500 },
      );
    }

    const context = (documents ?? [])
      .map((document: RetrievedDocument) => document.content)
      .join("\n\n");

    // 4. Send context + question to Gemini
    const prompt = `
Answer the user's question using only the provided context.

If the context does not contain enough information to answer the question,
say that you don't have enough information.

Context:
${context}

User question:
${query}
`;

    const generationResponse = await fetch(getGeminiEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!generationResponse.ok) {
      const errorText = await generationResponse.text();

      throw new Error(
        `Gemini API error: ${generationResponse.status} ${errorText}`,
      );
    }

    const generationData = await generationResponse.json();

    const answer = generationData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (typeof answer !== "string" || answer.trim().length === 0) {
      throw new Error("Gemini returned an empty answer");
    }

    // 5. Return the RAG response
    return NextResponse.json({
      query,
      answer,
      sources: documents,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
