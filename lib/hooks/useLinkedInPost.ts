import { useCallback, useState } from "react";

interface UseLinkedInPostReturn {
  postDraft: string;
  loading: boolean;
  error: string | null;
  generatePost: (insightText: string, sectionName?: string) => Promise<void>;
  reset: () => void;
}

export function useLinkedInPost(): UseLinkedInPostReturn {
  const [postDraft, setPostDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePost = useCallback(async (insightText: string, sectionName?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/linkedin-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ insightText, sectionName }),
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: Failed to generate LinkedIn post`;

        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          try {
            const errorText = await response.text();
            if (errorText) errorMessage = errorText;
          } catch {
            // Keep default error message
          }
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();
      setPostDraft(result.postDraft || "");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error generating LinkedIn post:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setPostDraft("");
    setError(null);
    setLoading(false);
  }, []);

  return {
    postDraft,
    loading,
    error,
    generatePost,
    reset,
  };
}
