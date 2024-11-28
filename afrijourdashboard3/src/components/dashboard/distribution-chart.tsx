import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { country: "Nigeria", journals: 412 },
  { country: "South Africa", journals: 385 },
  { country: "Egypt", journals: 356 },
  { country: "Kenya", journals: 289 },
  { country: "Ghana", journals: 245 },
  { country: "Ethiopia", journals: 198 },
  { country: "Uganda", journals: 119 },
];

export function DistributionChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis 
            dataKey="country" 
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-2">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium">{payload[0].payload.country}:</span>
                      <span className="font-bold">{payload[0].value}</span>
                    </div>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="journals"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}