import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getGeminiEmbeddingEndpoint } from "@/lib/config";

export async function POST() {
  try {
    const supabase = createSupabaseServerClient();

    const { data: documents, error } = await supabase
      .from("documents")
      .select("id, content")
      .is("embedding", null);

    if (error) {
      console.error("Supabase error:", error);

      return NextResponse.json(
        { error: "Failed to fetch documents" },
        { status: 500 },
      );
    }

    const embeddings = await Promise.all(
      documents.map(async (document) => {
        const response = await fetch(getGeminiEmbeddingEndpoint(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: {
              parts: [{ text: document.content }],
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
        const embedding = data.embedding.values;

        const { error: updateError } = await supabase
          .from("documents")
          .update({ embedding })
          .eq("id", document.id);

        if (updateError) {
          throw new Error(
            `Failed to update document ${document.id}: ${updateError.message}`,
          );
        }

        return {
          id: document.id,
          content: document.content,
          embedding,
        };
      }),
    );

    return NextResponse.json({ embeddings });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
