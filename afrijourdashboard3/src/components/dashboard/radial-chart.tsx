import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { subject: "Medicine", value: 85, fullMark: 100 },
  { subject: "Engineering", value: 65, fullMark: 100 },
  { subject: "Agriculture", value: 75, fullMark: 100 },
  { subject: "Social Sciences", value: 55, fullMark: 100 },
  { subject: "Arts & Humanities", value: 45, fullMark: 100 },
  { subject: "Business", value: 60, fullMark: 100 },
];

const COLORS = {
  grid: "hsl(var(--muted-foreground))",
  stroke: "hsl(12, 76%, 61%)",
  fill: "hsla(12, 76%, 61%, 0.3)",
};

export function RadialChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke={COLORS.grid} strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickCount={6}
            stroke={COLORS.grid}
          />
          <Radar
            name="Distribution"
            dataKey="value"
            stroke={COLORS.stroke}
            fill={COLORS.fill}
            strokeWidth={2}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <Card className="p-3 shadow-lg">
                    <div className="grid gap-1">
                      <span className="font-semibold text-lg">{data.subject}</span>
                      <span className="text-sm text-muted-foreground">
                        Score: {data.value}%
                      </span>
                    </div>
                  </Card>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}