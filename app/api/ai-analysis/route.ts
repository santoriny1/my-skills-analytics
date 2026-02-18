import { NextRequest, NextResponse } from "next/server";
import { generateAIAnalysis, generateRiskAlerts, generateStrategicInsights } from "@/lib/openai";
import { AnalyticsResult } from "@/lib/analytics";

/**
 * Handle POST requests to generate AI-driven analysis sections from provided analytics data.
 *
 * Validates the request body (requires `analytics.totalEmployees` to be a number) and an optional
 * `section` parameter which may be `"riskAlerts"` or `"strategicInsights"`. Generates and returns
 * the requested section or both sections when `section` is omitted.
 *
 * On success returns a JSON object containing `success: true` and one or both of `riskAlerts` and
 * `strategicInsights`. Returns status 400 with an error message for invalid input or invalid
 * `section`, and status 500 with error details on internal failure.
 *
 * @returns On success: an object with `success: true` and `riskAlerts` and/or `strategicInsights`.
 *          On validation failure: a 400 response with `{ error: string, success: false }`.
 *          On internal error: a 500 response with `{ error: string, details: string }`.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { analytics, section } = body as {
      analytics: AnalyticsResult;
      section?: "riskAlerts" | "strategicInsights";
    };

    // Validate the request body
    if (!analytics || typeof analytics.totalEmployees !== "number") {
      return NextResponse.json(
        { error: "Invalid analytics data provided" },
        { status: 400 }
      );
    }

    // Validate section parameter
    if (section && section !== "riskAlerts" && section !== "strategicInsights") {
      return NextResponse.json(
        { error: "Invalid section parameter", success: false },
        { status: 400 }
      );
    }

    // Generate specific section or all sections
    if (section === "riskAlerts") {
      const riskAlerts = await generateRiskAlerts(analytics);
      return NextResponse.json({ riskAlerts, success: true });
    } else if (section === "strategicInsights") {
      const strategicInsights = await generateStrategicInsights(analytics);
      return NextResponse.json({ strategicInsights, success: true });
    } else {
      // Generate all sections
      const { riskAlerts, strategicInsights } = await generateAIAnalysis(analytics);
      return NextResponse.json({
        riskAlerts,
        strategicInsights,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error in AI analysis API:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate AI analysis",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}