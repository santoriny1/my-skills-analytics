import { NextRequest, NextResponse } from "next/server";
import { 
  generateStrongVerticalsInsights, 
  generateWeakVerticalsOpportunities,
  generateMarketingRecommendations 
} from "@/lib/openai";
import { AnalyticsResult } from "@/lib/analytics";

/**
 * Handle POST requests that generate marketing insights and recommendations from analytics and verticals data.
 *
 * Validates the request body, then generates either a specific section (strongVerticals, weakVerticals,
 * or marketingRecommendations) or all sections in parallel and returns the generated content.
 *
 * @param request - Incoming NextRequest with a JSON body containing `analytics`, `strongVerticals`, `weakVerticals`, and optional `section`.
 * @returns A JSON NextResponse containing the generated insights for the requested section(s) and a `success` flag; returns a 400 JSON response when `analytics` is missing or invalid, and a 500 JSON response on server error.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { analytics, strongVerticals, weakVerticals, section } = body as {
      analytics: AnalyticsResult;
      strongVerticals: Array<{ industry: string; count: number }>;
      weakVerticals: Array<{ industry: string; count: number }>;
      section?: "strongVerticals" | "weakVerticals" | "marketingRecommendations";
    };

    // Validate the request body
    if (!analytics || typeof analytics.totalEmployees !== "number") {
      return NextResponse.json(
        { error: "Invalid analytics data provided" },
        { status: 400 }
      );
    }

    // Generate specific section or all sections
    if (section === "strongVerticals") {
      const strongVerticalsInsights = await generateStrongVerticalsInsights(
        analytics, 
        strongVerticals || []
      );
      return NextResponse.json({ strongVerticalsInsights, success: true });
    } else if (section === "weakVerticals") {
      const weakVerticalsOpportunities = await generateWeakVerticalsOpportunities(
        analytics, 
        weakVerticals || []
      );
      return NextResponse.json({ weakVerticalsOpportunities, success: true });
    } else if (section === "marketingRecommendations") {
      const marketingRecommendations = await generateMarketingRecommendations(
        analytics, 
        strongVerticals || [], 
        weakVerticals || []
      );
      return NextResponse.json({ marketingRecommendations, success: true });
    } else {
      // Generate all sections
      const [strongVerticalsInsights, weakVerticalsOpportunities, marketingRecommendations] = await Promise.all([
        generateStrongVerticalsInsights(analytics, strongVerticals || []),
        generateWeakVerticalsOpportunities(analytics, weakVerticals || []),
        generateMarketingRecommendations(analytics, strongVerticals || [], weakVerticals || []),
      ]);

      return NextResponse.json({
        strongVerticalsInsights,
        weakVerticalsOpportunities,
        marketingRecommendations,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error in marketing analysis API:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate marketing analysis"
      },
      { status: 500 }
    );
  }
}