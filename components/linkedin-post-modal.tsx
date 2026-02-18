"use client";

import { useEffect, useState } from "react";
import { useLinkedInPost } from "@/lib/hooks/useLinkedInPost";

interface LinkedInPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  insightText: string;
  sectionName?: string;
}

export default function LinkedInPostModal({
  isOpen,
  onClose,
  insightText,
  sectionName,
}: LinkedInPostModalProps) {
  const { postDraft, loading, error, generatePost, reset } = useLinkedInPost();
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<string | null>(null);

  const handlePublish = async () => {
    if (!postDraft.trim() || publishing) return;

    setPublishing(true);
    setPublishStatus(null);

    try {
      await navigator.clipboard.writeText(postDraft);
      window.open("https://www.linkedin.com/feed/", "_blank", "noopener,noreferrer");
      setPublishStatus("Draft copied to clipboard. LinkedIn opened in a new tab.");
    } catch {
      setPublishStatus("Could not copy automatically. You can still copy manually and post on LinkedIn.");
    } finally {
      setPublishing(false);
    }
  };

  useEffect(() => {
    if (isOpen && insightText) {
      generatePost(insightText, sectionName);
    }

    if (!isOpen) {
      reset();
      setPublishStatus(null);
    }
  }, [isOpen, insightText, sectionName, generatePost, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h3 className="text-lg font-semibold">LinkedIn Post Preview</h3>
            <p className="text-xs text-muted-foreground">
              {sectionName ? `Generated from ${sectionName}` : "Generated from AI insight"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Source Insight</p>
            <p className="text-sm">{insightText}</p>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">AI</div>
              <div>
                <p className="text-sm font-semibold">My Skills Analytics</p>
                <p className="text-xs text-muted-foreground">LinkedIn draft</p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Generating post preview...
              </div>
            ) : error ? (
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            ) : (
              <p className="text-sm whitespace-pre-line leading-relaxed">{postDraft}</p>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2">
          <div className="text-xs text-muted-foreground min-h-[1rem]">
            {publishStatus}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => generatePost(insightText, sectionName)}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              disabled={loading}
              title="Regenerate"
              aria-label="Regenerate"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              onClick={handlePublish}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading || !postDraft || publishing}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554V14.87c0-1.33-.027-3.04-1.852-3.04-1.854 0-2.138 1.446-2.138 2.942v5.68H9.35V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.115 20.452H3.558V9h3.557v11.452z" />
              </svg>
              {publishing ? "Posting..." : "Post on LinkedIn"}
            </button>

            <button
              onClick={onClose}
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
