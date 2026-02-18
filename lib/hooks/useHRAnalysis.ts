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

/**
 * Manages HR analysis state and provides operations to generate risk alerts and HR recommendations from analytics.
 *
 * @returns An object containing:
 * - `data`: The current HR analysis result or `null` if not available (`riskAlerts` and `hrRecommendations` arrays).
 * - `loadingRiskAlerts`: `true` while risk alerts are being generated, `false` otherwise.
 * - `loadingRecommendations`: `true` while HR recommendations are being generated, `false` otherwise.
 * - `error`: Error message string if the last request failed, or `null` if no error.
 * - `generateRiskAlerts(analytics)`: Generates risk alerts from the provided analytics and updates `data.riskAlerts` while preserving existing `hrRecommendations`.
 * - `generateHRRecommendations(analytics)`: Generates HR recommendations from the provided analytics and updates `data.hrRecommendations` while preserving existing `riskAlerts`.
 * - `generateAll(analytics)`: Generates both risk alerts and HR recommendations from the provided analytics and replaces `data` with the combined result.
 */
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
        let errorMessage = `HTTP ${response.status}: Failed to generate HR recommendations`;
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
        let errorMessage = `HTTP ${response.status}: Failed to generate HR analysis`;
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