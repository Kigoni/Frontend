import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  const data = [
    { discipline: "Medicine", journals: 524, percentage: "26.1%" },
    { discipline: "Engineering", journals: 412, percentage: "20.6%" },
    { discipline: "Agriculture", journals: 389, percentage: "19.4%" },
    { discipline: "Social Sciences", journals: 298, percentage: "14.9%" },
    { discipline: "Arts & Humanities", journals: 245, percentage: "12.2%" },
    { discipline: "Business", journals: 136, percentage: "6.8%" },
  ];
  
  export function JournalTable() {
    return (
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Discipline</TableHead>
              <TableHead className="text-right">Journals</TableHead>
              <TableHead className="text-right">Percentage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.discipline}>
                <TableCell className="font-medium">{row.discipline}</TableCell>
                <TableCell className="text-right">{row.journals}</TableCell>
                <TableCell className="text-right">{row.percentage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }