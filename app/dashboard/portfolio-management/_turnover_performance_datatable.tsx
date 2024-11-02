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
    <Card className="col-span-6 row-start-2 overflow-auto bg-[#0e5e6f]">
      <CardHeader>
        <CardTitle className="text-slate-600 text-white">
          Turnover Performance
        </CardTitle>
        <CardDescription className="text-white">
          short summary of the portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-500 hover:bg-blue-700">
              <TableHead className="w-[200px] text-white font-bold">
                Particular
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Daily
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Weekly
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Forthnightly
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Monthly
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.name}
                className={`${
                  index % 2 === 0 ? "bg-pink-200" : "bg-yellow-200"
                } hover:bg-green-300 transition-all duration-300`}
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
