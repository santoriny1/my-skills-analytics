import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StrategicInsightsProps {
  insights: string[];
}

export default function StrategicInsights({ insights }: StrategicInsightsProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-blue-200 bg-blue-50/50 dark:bg-blue-950/10 dark:border-blue-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
          AI Strategic Insights
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Data-driven recommendations for workforce planning
        </p>
      </CardHeader>
      <CardContent>
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
