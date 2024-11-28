import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface MetricsCardProps {
  title: string;
  percentage: number;
}

const getColor = (percentage: number) => {
  if (percentage >= 70) return "stroke-emerald-500";
  if (percentage >= 40) return "stroke-amber-500";
  return "stroke-rose-500";
};

export function MetricsCard({ title, percentage }: MetricsCardProps) {
  const strokeColor = getColor(percentage);

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                className="stroke-muted"
                cx="50"
                cy="50"
                r="40"
                strokeWidth="10"
                fill="none"
              />
              <motion.circle
                className={strokeColor}
                cx="50"
                cy="50"
                r="40"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: percentage / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                  transformOrigin: "center",
                  transform: "rotate(-90deg)",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{percentage}%</span>
            </div>
          </div>
          <Progress value={percentage} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
}