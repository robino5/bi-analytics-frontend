import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PerticularTypes {
  name: string;
  daily: number;
  weekly: number;
  forthnightly: number;
  monthly: number;
}

interface Props {
  records: PerticularTypes[];
}

export default function TurnoverPerformanceDataTable({ records }: Props) {
  return (
    <Card className="col-span-6 row-start-2 overflow-auto">
      <CardHeader>
        <CardTitle className="text-slate-600">Turnover Performance</CardTitle>
        <CardDescription>short summary of the portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Particular</TableHead>
              <TableHead className="text-right">Daily</TableHead>
              <TableHead className="text-right">Weekly</TableHead>
              <TableHead className="text-right">Forthnightly</TableHead>
              <TableHead className="text-right">Monthly</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.name}
                className="odd:bg-muted even:bg-gradient"
              >
                <TableCell className="font-medium py-1">
                  {record.name}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(record.daily)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(record.weekly)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(record.forthnightly)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(record.monthly)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
