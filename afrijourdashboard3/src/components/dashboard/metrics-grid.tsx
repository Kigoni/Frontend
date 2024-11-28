import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsCard } from "./metrics-card";
import { JournalTable } from "./journal-table";

export function MetricsGrid() {
  const metrics = [
    { title: "Google Scholar", percentage: 50 },
    { title: "Scopus", percentage: 43 },
    { title: "Open Access Journal", percentage: 64 },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {metrics.map((metric) => (
        <div key={metric.title} className="col-span-1 lg:col-span-2">
          <MetricsCard {...metric} />
        </div>
      ))}
      
      <Card className="col-span-1 lg:col-span-6 transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Journals Disciplines Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <JournalTable />
        </CardContent>
      </Card>
    </div>
  );
}