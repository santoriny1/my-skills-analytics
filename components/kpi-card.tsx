import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export default function KPICard({ title, value, description, icon }: KPICardProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
