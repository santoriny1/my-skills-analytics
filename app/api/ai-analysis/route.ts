import { NextRequest, NextResponse } from "next/server";
import { generateAIAnalysis, generateRiskAlerts, generateStrategicInsights } from "@/lib/openai";
import { AnalyticsResult } from "@/lib/analytics";

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
