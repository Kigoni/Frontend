import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card } from "@/components/ui/card";

const data = [
  { name: "English", value: 1402, color: "hsl(12, 76%, 61%)" },
  { name: "French", value: 302, color: "hsl(173, 58%, 39%)" },
  { name: "Arabic", value: 185, color: "hsl(197, 37%, 24%)" },
  { name: "Portuguese", value: 89, color: "hsl(43, 74%, 66%)" },
  { name: "Swahili", value: 26, color: "hsl(27, 87%, 67%)" },
];

export function LanguagePiechart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
            labelLine={true}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <Card className="p-3 shadow-lg">
                    <div className="grid gap-1">
                      <span className="font-semibold text-lg" style={{ color: data.color }}>
                        {data.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {data.value} journals
                      </span>
                    </div>
                  </Card>
                );
              }
              return null;
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-sm font-medium">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}