import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillGap } from "@/lib/analytics";

interface RiskAlertsProps {
  skillGaps: SkillGap[];
}

export default function RiskAlerts({ skillGaps }: RiskAlertsProps) {
  return (
    <Card className="rounded-2xl shadow-sm border-orange-200 bg-orange-50/50 dark:bg-orange-950/10 dark:border-orange-900">
      <CardHeader>
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
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Critical skill shortages requiring attention
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {skillGaps.length === 0 ? (
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
