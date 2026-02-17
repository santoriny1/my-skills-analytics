import { useState, useCallback } from "react";
import { AnalyticsResult } from "@/lib/analytics";

interface HRAnalysisResult {
  riskAlerts: string[];
  hrRecommendations: string[];
}

interface UseHRAnalysisReturn {
  data: HRAnalysisResult | null;
  loadingRiskAlerts: boolean;
  loadingRecommendations: boolean;
  error: string | null;
  generateRiskAlerts: (analytics: AnalyticsResult) => Promise<void>;
  generateHRRecommendations: (analytics: AnalyticsResult) => Promise<void>;
  generateAll: (analytics: AnalyticsResult) => Promise<void>;
}

export function useHRAnalysis(): UseHRAnalysisReturn {
  const [data, setData] = useState<HRAnalysisResult | null>(null);
  const [loadingRiskAlerts, setLoadingRiskAlerts] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRiskAlerts = useCallback(async (analytics: AnalyticsResult) => {
    setLoadingRiskAlerts(true);
    setError(null);

    try {
      const response = await fetch("/api/hr-analysis", {
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
        hrRecommendations: prev?.hrRecommendations || [],
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error generating risk alerts:", err);
    } finally {
      setLoadingRiskAlerts(false);
    }
  }, []);

  const generateHRRecommendations = useCallback(async (analytics: AnalyticsResult) => {
    setLoadingRecommendations(true);
    setError(null);

    try {
      const response = await fetch("/api/hr-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ analytics, section: "hrRecommendations" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate HR recommendations");
      }

      const result = await response.json();
      setData(prev => ({
        riskAlerts: prev?.riskAlerts || [],
        hrRecommendations: result.hrRecommendations,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error generating HR recommendations:", err);
    } finally {
      setLoadingRecommendations(false);
    }
  }, []);

  const generateAll = useCallback(async (analytics: AnalyticsResult) => {
    setLoadingRiskAlerts(true);
    setLoadingRecommendations(true);
    setError(null);

    try {
      const response = await fetch("/api/hr-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ analytics }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate HR analysis");
      }

      const result = await response.json();
      setData({
        riskAlerts: result.riskAlerts,
        hrRecommendations: result.hrRecommendations,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error generating HR analysis:", err);
    } finally {
      setLoadingRiskAlerts(false);
      setLoadingRecommendations(false);
    }
  }, []);

  return {
    data,
    loadingRiskAlerts,
    loadingRecommendations,
    error,
    generateRiskAlerts,
    generateHRRecommendations,
    generateAll,
  };
}
