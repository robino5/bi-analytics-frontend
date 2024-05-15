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
import { IActiveTradingToday } from "@/types/activeTradingCodes";

interface Props {
  records: IActiveTradingToday[];
  className?: string;
}

export default function ClientTradesDataTable({ records, className }: Props) {
  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // ===========================================
  return (
    <Card className={cn("overflow-auto drop-shadow-md", className)}>
      <CardHeader>
        <CardTitle className="">
          Channel Wise Clients & Trades (Today)
        </CardTitle>
        <CardDescription>
          short summary of todays clients and trades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Channel</TableHead>
              <TableHead>Total Client</TableHead>
              <TableHead>Trades</TableHead>
              <TableHead className="text-right">Turnover</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.channel}
                className="odd:bg-muted even:bg-gradient"
              >
                <TableCell className="font-medium py-1">
                  {record.channel}
                </TableCell>
                <TableCell className="py-1">
                  {numberToMillionsString(record.totalClients)}
                </TableCell>
                <TableCell className="py-1">
                  {numberToMillionsString(record.trades)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(record.totalTurnover)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
