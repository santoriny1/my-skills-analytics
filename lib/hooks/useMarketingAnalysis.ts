import { useState, useCallback } from "react";
import { AnalyticsResult } from "@/lib/analytics";

interface MarketingAnalysisResult {
  strongVerticalsInsights: Array<{ industry: string; insight: string }>;
  weakVerticalsOpportunities: Array<{ industry: string; opportunity: string }>;
  marketingRecommendations: string[];
}

interface UseMarketingAnalysisReturn {
  data: MarketingAnalysisResult | null;
  loadingStrongVerticals: boolean;
  loadingWeakVerticals: boolean;
  loadingRecommendations: boolean;
  error: string | null;
  generateStrongVerticals: (
    analytics: AnalyticsResult,
    strongVerticals: Array<{ industry: string; count: number }>
  ) => Promise<void>;
  generateWeakVerticals: (
    analytics: AnalyticsResult,
    weakVerticals: Array<{ industry: string; count: number }>
  ) => Promise<void>;
  generateMarketingRecommendations: (
    analytics: AnalyticsResult,
    strongVerticals: Array<{ industry: string; count: number }>,
    weakVerticals: Array<{ industry: string; count: number }>
  ) => Promise<void>;
  generateAll: (
    analytics: AnalyticsResult,
    strongVerticals: Array<{ industry: string; count: number }>,
    weakVerticals: Array<{ industry: string; count: number }>
  ) => Promise<void>;
}

/**
 * Hook that manages generation and incremental state for marketing analysis results.
 *
 * Exposes async operations to generate strong-vertical insights, weak-vertical opportunities,
 * marketing recommendations, or all sections together, while tracking per-section loading
 * states and a single error string. The hook preserves previously fetched sections when
 * updating individual sections.
 *
 * @returns An object with the current `data` (or `null`), boolean loading flags `loadingStrongVerticals`, `loadingWeakVerticals`, and `loadingRecommendations`, an `error` string or `null`, and async action functions: `generateStrongVerticals`, `generateWeakVerticals`, `generateMarketingRecommendations`, and `generateAll`.
 */
export function useMarketingAnalysis(): UseMarketingAnalysisReturn {
  const [data, setData] = useState<MarketingAnalysisResult | null>(null);
  const [loadingStrongVerticals, setLoadingStrongVerticals] = useState(false);
  const [loadingWeakVerticals, setLoadingWeakVerticals] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStrongVerticals = useCallback(
    async (
      analytics: AnalyticsResult,
      strongVerticals: Array<{ industry: string; count: number }>
    ) => {
      setLoadingStrongVerticals(true);
      setError(null);

      try {
        const response = await fetch("/api/marketing-analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            analytics,
            strongVerticals,
            weakVerticals: [],
            section: "strongVerticals",
          }),
        });

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: Failed to generate strong verticals insights`;
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
          strongVerticalsInsights: result.strongVerticalsInsights,
          weakVerticalsOpportunities: prev?.weakVerticalsOpportunities || [],
          marketingRecommendations: prev?.marketingRecommendations || [],
        }));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Error generating strong verticals insights:", err);
      } finally {
        setLoadingStrongVerticals(false);
      }
    },
    []
  );

  const generateWeakVerticals = useCallback(
    async (
      analytics: AnalyticsResult,
      weakVerticals: Array<{ industry: string; count: number }>
    ) => {
      setLoadingWeakVerticals(true);
      setError(null);

      try {
        const response = await fetch("/api/marketing-analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            analytics,
            strongVerticals: [],
            weakVerticals,
            section: "weakVerticals",
          }),
        });

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: Failed to generate weak verticals opportunities`;
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
          strongVerticalsInsights: prev?.strongVerticalsInsights || [],
          weakVerticalsOpportunities: result.weakVerticalsOpportunities,
          marketingRecommendations: prev?.marketingRecommendations || [],
        }));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Error generating weak verticals opportunities:", err);
      } finally {
        setLoadingWeakVerticals(false);
      }
    },
    []
  );

  const generateMarketingRecommendations = useCallback(
    async (
      analytics: AnalyticsResult,
      strongVerticals: Array<{ industry: string; count: number }>,
      weakVerticals: Array<{ industry: string; count: number }>
    ) => {
      setLoadingRecommendations(true);
      setError(null);

      try {
        const response = await fetch("/api/marketing-analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            analytics,
            strongVerticals,
            weakVerticals,
            section: "marketingRecommendations",
          }),
        });

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: Failed to generate marketing recommendations`;
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
          strongVerticalsInsights: prev?.strongVerticalsInsights || [],
          weakVerticalsOpportunities: prev?.weakVerticalsOpportunities || [],
          marketingRecommendations: result.marketingRecommendations,
        }));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Error generating marketing recommendations:", err);
      } finally {
        setLoadingRecommendations(false);
      }
    },
    []
  );

  const generateAll = useCallback(
    async (
      analytics: AnalyticsResult,
      strongVerticals: Array<{ industry: string; count: number }>,
      weakVerticals: Array<{ industry: string; count: number }>
    ) => {
      setLoadingStrongVerticals(true);
      setLoadingWeakVerticals(true);
      setLoadingRecommendations(true);
      setError(null);

      try {
        const response = await fetch("/api/marketing-analysis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            analytics,
            strongVerticals,
            weakVerticals,
          }),
        });

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: Failed to generate marketing analysis`;
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
          strongVerticalsInsights: result.strongVerticalsInsights,
          weakVerticalsOpportunities: result.weakVerticalsOpportunities,
          marketingRecommendations: result.marketingRecommendations,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        console.error("Error generating marketing analysis:", err);
      } finally {
        setLoadingStrongVerticals(false);
        setLoadingWeakVerticals(false);
        setLoadingRecommendations(false);
      }
    },
    []
  );

  return {
    data,
    loadingStrongVerticals,
    loadingWeakVerticals,
    loadingRecommendations,
    error,
    generateStrongVerticals,
    generateWeakVerticals,
    generateMarketingRecommendations,
    generateAll,
  };
}