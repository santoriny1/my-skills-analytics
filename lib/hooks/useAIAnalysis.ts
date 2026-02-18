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

/**
 * React hook that generates AI-driven risk alerts and strategic insights from analytics and exposes the resulting data, loading states, and errors.
 *
 * @returns An object containing:
 * - data: AIAnalysisResult | null — the latest generated `riskAlerts` and `strategicInsights`, or `null` if none.
 * - loadingRiskAlerts: boolean — `true` while risk alerts are being generated.
 * - loadingInsights: boolean — `true` while strategic insights are being generated.
 * - error: string | null — error message when a generation request fails, or `null` when there is no error.
 * - generateRiskAlerts: (analytics: AnalyticsResult) => Promise<void> — trigger generation of risk alerts from the provided analytics.
 * - generateStrategicInsights: (analytics: AnalyticsResult) => Promise<void> — trigger generation of strategic insights from the provided analytics.
 * - generateAll: (analytics: AnalyticsResult) => Promise<void> — trigger generation of both risk alerts and strategic insights from the provided analytics.
 */
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
        let errorMessage = `HTTP ${response.status}: Failed to generate risk alerts`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, try to get text or use status
          try {
            const errorText = await response.text();
            if (errorText) errorMessage = errorText;
          } catch {
            // Use the default message with status
          }
        }
        throw new Error(errorMessage);
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
        let errorMessage = `HTTP ${response.status}: Failed to generate strategic insights`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, try to get text or use status
          try {
            const errorText = await response.text();
            if (errorText) errorMessage = errorText;
          } catch {
            // Use the default message with status
          }
        }
        throw new Error(errorMessage);
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