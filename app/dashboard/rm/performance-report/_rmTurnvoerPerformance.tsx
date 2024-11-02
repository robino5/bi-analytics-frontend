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

interface TurnoverPerformanceData {
  name: string;
  daily: number;
  weekly: number;
  forthnightly: number;
  monthly: number;
}

interface Props {
  records: TurnoverPerformanceData[];
}

export default function RMTurnoverPerformance({ records }: Props) {
  return (
    <Card className="col-span-6 overflow-auto rounded-md shadow-md bg-[#0e5e6f]">
      <CardHeader>
        <CardTitle className="text-white">Turnover Performance</CardTitle>
        <CardDescription className="text-white">
          short summary of RM Turnover Performance
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
                className={index % 2 === 0 ? "bg-opacity-90" : "bg-opacity-70"}
              >
                <TableCell
                  className={`font-medium py-1 ${
                    index % 2 === 0 ? "bg-purple-200" : "bg-purple-100"
                  }`}
                >
                  {record.name}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                  }`}
                >
                  {numberToMillionsString(record.daily)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-green-200" : "bg-green-100"
                  }`}
                >
                  {numberToMillionsString(record.weekly)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-orange-200" : "bg-orange-100"
                  }`}
                >
                  {numberToMillionsString(record.forthnightly)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-yellow-200" : "bg-yellow-100"
                  }`}
                >
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
