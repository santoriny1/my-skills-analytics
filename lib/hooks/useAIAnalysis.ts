import { useState, useCallback } from "react";
import { AnalyticsResult } from "@/lib/analytics";

interface AIAnalysisResult {
  riskAlerts: string[];
  strategicInsights: string[];
}

interface UseAIAnalysisReturn {
  data: AIAnalysisResult | null;
  loadingRiskAlerts: boolean;
  loadingInsights: boolean;
  error: string | null;
  generateRiskAlerts: (analytics: AnalyticsResult) => Promise<void>;
  generateStrategicInsights: (analytics: AnalyticsResult) => Promise<void>;
  generateAll: (analytics: AnalyticsResult) => Promise<void>;
}

export function useAIAnalysis(): UseAIAnalysisReturn {
  const [data, setData] = useState<AIAnalysisResult | null>(null);
  const [loadingRiskAlerts, setLoadingRiskAlerts] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRiskAlerts = useCallback(async (analytics: AnalyticsResult) => {
    setLoadingRiskAlerts(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ analytics, section: "riskAlerts" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate risk alerts");
      }

      const result = await response.json();
      setData(prev => ({
        riskAlerts: result.riskAlerts,
        strategicInsights: prev?.strategicInsights || [],
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error generating risk alerts:", err);
    } finally {
      setLoadingRiskAlerts(false);
    }
  }, []);

  const generateStrategicInsights = useCallback(async (analytics: AnalyticsResult) => {
    setLoadingInsights(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ analytics, section: "strategicInsights" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate strategic insights");
      }

      const result = await response.json();
      setData(prev => ({
        riskAlerts: prev?.riskAlerts || [],
        strategicInsights: result.strategicInsights,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error generating strategic insights:", err);
    } finally {
      setLoadingInsights(false);
    }
  }, []);

  const generateAll = useCallback(async (analytics: AnalyticsResult) => {
    setLoadingRiskAlerts(true);
    setLoadingInsights(true);
    setError(null);

    try {
      const response = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ analytics }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate AI analysis");
      }

      const result = await response.json();
      setData({
        riskAlerts: result.riskAlerts,
        strategicInsights: result.strategicInsights,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error generating AI analysis:", err);
    } finally {
      setLoadingRiskAlerts(false);
      setLoadingInsights(false);
    }
  }, []);

  return {
    data,
    loadingRiskAlerts,
    loadingInsights,
    error,
    generateRiskAlerts,
    generateStrategicInsights,
    generateAll,
  };
}
