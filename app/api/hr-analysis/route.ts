import { NextRequest, NextResponse } from "next/server";
import { generateRiskAlerts, generateHRRecommendations } from "@/lib/openai";
import { AnalyticsResult } from "@/lib/analytics";

/**
 * Handle POST requests to generate HR analysis sections (risk alerts and/or HR recommendations).
 *
 * Accepts a JSON body with an `analytics` object and an optional `section` string to request only one section.
 *
 * @param request - Next.js request whose JSON body must include `analytics` (AnalyticsResult) and optional `section` with value `"riskAlerts"` or `"hrRecommendations"`.
 * @returns A JSON response containing:
 * - On success when `section` is `"riskAlerts"`: `{ riskAlerts, success: true }`
 * - On success when `section` is `"hrRecommendations"`: `{ hrRecommendations, success: true }`
 * - On success with no or other `section`: `{ riskAlerts, hrRecommendations, success: true }`
 * - On invalid input: `{ error: "Invalid analytics data provided" }` with status 400
 * - On internal failure: `{ error: "Failed to generate HR analysis" }` with status 500
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { analytics, section } = body as {
      analytics: AnalyticsResult;
      section?: "riskAlerts" | "hrRecommendations";
    };

    // Validate the request body
    if (!analytics || typeof analytics.totalEmployees !== "number") {
      return NextResponse.json(
        { error: "Invalid analytics data provided" },
        { status: 400 }
      );
    }

    // Generate specific section or all sections
    if (section === "riskAlerts") {
      const riskAlerts = await generateRiskAlerts(analytics);
      return NextResponse.json({ riskAlerts, success: true });
    } else if (section === "hrRecommendations") {
      const hrRecommendations = await generateHRRecommendations(analytics);
      return NextResponse.json({ hrRecommendations, success: true });
    } else {
      // Generate all sections
      const [riskAlerts, hrRecommendations] = await Promise.all([
        generateRiskAlerts(analytics),
        generateHRRecommendations(analytics),
      ]);
      return NextResponse.json({
        riskAlerts,
        hrRecommendations,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error in HR analysis API:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate HR analysis"
      },
      { status: 500 }
    );
  }
}