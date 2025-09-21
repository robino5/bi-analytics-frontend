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
    <Card
      className={cn("overflow-auto drop-shadow-md", className, "bg-[#0e5e6f]")}
    >
      <CardHeader>
        <CardTitle className="text-white">
          Channel Wise Clients & Trades (Today)
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of todays clients and trades
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Table className="border border-gray-300 rounded-md overflow-hidden">
          <TableHeader>
            <TableRow className="bg-blue-500 hover:bg-blue-700">
              <TableHead className="w-[200px] text-white font-bold py-2">
                Channel
              </TableHead>
              <TableHead className="text-white font-bold py-2">
                Total Client
              </TableHead>
              <TableHead className="text-white font-bold py-2">
                Trades
              </TableHead>
              <TableHead className="text-right text-white font-bold py-2">
                Turnover
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.channel}
                className={`${
                  index % 2 === 0 ? "bg-pink-200" : "bg-yellow-200"
                } hover:bg-green-300 transition-all duration-300`}
              >
                <TableCell className="font-medium py-2">
                  {record.channel}
                </TableCell>
                <TableCell className="py-2">
                  {numberToMillionsString(record.totalClients)}
                </TableCell>
                <TableCell className="py-2">
                  {numberToMillionsString(record.trades)}
                </TableCell>
                <TableCell className="text-right py-2">
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
