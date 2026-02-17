import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StrategicInsightsProps {
  insights: string[];
  loading?: boolean;
  onRefresh?: () => void;
  isAIPowered?: boolean;
}

export default function StrategicInsights({ insights, loading, onRefresh, isAIPowered }: StrategicInsightsProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-blue-200 bg-blue-50/50 dark:bg-blue-950/10 dark:border-blue-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              {isAIPowered ? "AI Strategic Insights" : "Strategic Insights"}
              {isAIPowered && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  AI
                </span>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {isAIPowered ? 'AI-generated strategic recommendations' : 'Data-driven recommendations for workforce planning'}
            </p>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate new AI insights"
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
          <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating AI-powered insights...
            </p>
          </div>
        )}
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-900"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {index + 1}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed">{insight}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
