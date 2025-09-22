import {
  Card,
  CardHeader,
  CardContent,
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
import { IActiveTradingToday } from "../types";

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
      className={cn("overflow-hidden drop-shadow-md", className, "bg-[#033e4a] h-[308px]")}
    >
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2">
        <CardTitle className="text-white text-md text-lg">
          Channel Wise Clients & Trades (Today)
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of todays clients and trades
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-3">
        <Table className="border border-gray-300 rounded-md overflow-hidden mt-8">
          <TableHeader>
            <TableRow className="bg-yellow-200 hover:bg-yellow-200">
              <TableHead className="w-[200px] text-black font-bold py-2">
                Channel
              </TableHead>
              <TableHead className="text-right text-black font-bold py-2">
                Client
              </TableHead>
              <TableHead className="text-right text-black font-bold py-2">
                Trades
              </TableHead>
              <TableHead className="text-right text-black font-bold py-2">
                Turnover
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.channel}
                className={`${index % 2 === 0 ? "bg-yellow-100" : "bg-yellow-50"
                  } hover:bg-yellow-300 transition-all duration-300`}
              >
                <TableCell className="font-medium py-2">
                  {record.channel}
                </TableCell>
                <TableCell className="text-right py-2">
                  {record.totalClients.toLocaleString()}
                </TableCell>
                <TableCell className="text-right py-2">
                  {record.trades.toLocaleString()}
                </TableCell>
                <TableCell className="text-right py-2">
                  {numberToMillionsString(record.totalTurnover)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Red Note Text */}
        {/* <p className="text-red-500 text-lg mt-2 font-semibold">
          * This data is updated every 15 minutes.
        </p> */}
      </CardContent>
    </Card>
  );
}
