import { NextRequest, NextResponse } from "next/server";
import { generateRiskAlerts, generateHRRecommendations } from "@/lib/openai";
import { AnalyticsResult } from "@/lib/analytics";

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
        error: "Failed to generate HR analysis",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
