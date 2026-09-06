import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase
      .from("documents")
      .select("id, content, category, created_at");

    if (error) {
      console.error("Supabase error:", error);

      return NextResponse.json(
        { error: "Failed to fetch documents" },
        { status: 500 },
      );
    }

    return NextResponse.json({ documents: data });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
