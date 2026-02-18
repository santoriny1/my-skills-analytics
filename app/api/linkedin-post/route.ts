import { NextRequest, NextResponse } from "next/server";
import { generateLinkedInPostDraft } from "@/lib/openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { insightText, sectionName } = body as {
      insightText?: string;
      sectionName?: string;
    };

    if (!insightText || typeof insightText !== "string") {
      return NextResponse.json(
        { error: "insightText is required" },
        { status: 400 }
      );
    }

    const postDraft = await generateLinkedInPostDraft({
      insightText,
      sectionName,
    });

    return NextResponse.json({ postDraft, success: true });
  } catch (error) {
    console.error("Error in LinkedIn post API:", error);
    return NextResponse.json(
      { error: "Failed to generate LinkedIn post" },
      { status: 500 }
    );
  }
}
