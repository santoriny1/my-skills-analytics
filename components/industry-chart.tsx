import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { IndustryDistribution } from "@/lib/analytics";

interface IndustryChartProps {
  data: IndustryDistribution[];
}

const COLORS = ["#0ea5e9", "#8b5cf6", "#ec4899", "#f59e0b"];

export default function IndustryChart({ data }: IndustryChartProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Industry Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground">
          Workforce allocation by sector
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ payload, percent }) => 
                `${payload.industry} ${percent ? (percent * 100).toFixed(0) : 0}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              nameKey="industry"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
