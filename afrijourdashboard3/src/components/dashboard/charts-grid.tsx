import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DistributionChart } from "./distribution-chart";
import { LanguagePiechart } from "./language-piechart";
import { RadialChart } from "./radial-chart";

export function ChartsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
      <Card className="col-span-1 lg:col-span-3 transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Journals Distribution</CardTitle>
          <CardDescription>Distribution per Country</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <DistributionChart />
        </CardContent>
      </Card>
      
      <Card className="col-span-1 lg:col-span-2 transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Language Distribution</CardTitle>
          <CardDescription>Languages</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <LanguagePiechart />
        </CardContent>
      </Card>
      
      <Card className="col-span-1 lg:col-span-2 transition-all hover:shadow-lg">
        <CardHeader>
          <CardTitle>Journals Disciplines</CardTitle>
          <CardDescription>Distribution by Field</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <RadialChart />
        </CardContent>
      </Card>
    </div>
  );
}