import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillGap } from "@/lib/analytics";

interface RiskAlertsProps {
  skillGaps: SkillGap[];
  aiAlerts?: string[];
  loading?: boolean;
  onRefresh?: () => void;
}

export default function RiskAlerts({ skillGaps, aiAlerts, loading, onRefresh }: RiskAlertsProps) {
  const hasAIAlerts = aiAlerts && aiAlerts.length > 0;
  
  return (
    <Card className="rounded-2xl shadow-sm border-orange-200 bg-orange-50/50 dark:bg-orange-950/10 dark:border-orange-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-orange-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Risk & Gap Alerts
              {hasAIAlerts && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                  AI
                </span>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {hasAIAlerts ? 'AI-powered risk analysis' : 'Critical skill shortages requiring attention'}
            </p>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-orange-700 dark:text-orange-300 bg-white dark:bg-gray-800 border border-orange-300 dark:border-orange-700 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate new AI alerts"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              {loading ? 'Generating...' : 'Refresh'}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="mb-4 p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-orange-800 dark:text-orange-200 flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating AI-powered risk analysis...
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {hasAIAlerts ? (
            aiAlerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-900"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{alert}</p>
                </div>
              </div>
            ))
          ) : skillGaps.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              No critical skill gaps detected. All core technologies have sufficient coverage.
            </div>
          ) : (
            skillGaps.map((gap) => (
              <div
                key={gap.skill}
                className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-900"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Limited {gap.skill} expertise
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Only {gap.count} employee{gap.count !== 1 ? "s" : ""} with this skill.
                    Single point of failure risk.
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
