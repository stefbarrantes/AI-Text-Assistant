import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getGeminiEmbeddingEndpoint } from "@/lib/config";

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

    // 2. Search the vector database
    const { data: documents, error } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
      filter_category: category ?? null,
    });

    if (error) {
      console.error("Supabase RPC error:", error);

      return NextResponse.json(
        { error: "Failed to search documents" },
        { status: 500 },
      );
    }

    // 3. Return ranked results
    return NextResponse.json({
      query,
      results: documents,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
