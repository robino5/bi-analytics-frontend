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

interface Props {
  records: any[];
  className?: string;
}

export default function ClientTradesDataTable({
  records,
  className,
}: Props) {
  // ===========================================
  // Suppress recharts defaultProps warning
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // ===========================================

  const rows = records ?? [];

  /* -------------------------------------------------
     STEP 1: Remove duplicate rows
     (branchCode + channel is unique)
  -------------------------------------------------- */
  const uniqueRows = Array.from(
    new Map(
      rows.map((row) => [
        `${row.branchCode}-${row.channel}`,
        row,
      ])
    ).values()
  );

  /* -------------------------------------------------
     STEP 2: Aggregate channel-wise
  -------------------------------------------------- */
  const summary = uniqueRows.reduce(
    (acc: any, row: any) => {
      const channel = row.channel?.toUpperCase();

      if (!acc[channel]) {
        acc[channel] = {
          totalClients: 0,
          totalTrades: 0,
          totalTurnover: 0,
        };
      }

      acc[channel].totalClients += Number(row.totalClients || 0);
      acc[channel].totalTrades += Number(row.totalTrades || 0);
      acc[channel].totalTurnover += Number(row.totalTurnover || 0);

      return acc;
    },
    {}
  );

  /* -------------------------------------------------
     STEP 3: Channel totals
  -------------------------------------------------- */
  const dt = summary["DT"] || {
    totalClients: 0,
    totalTrades: 0,
    totalTurnover: 0,
  };

  const internet = summary["INTERNET"] || {
    totalClients: 0,
    totalTrades: 0,
    totalTurnover: 0,
  };

  const grandTotal = {
    totalClients: dt.totalClients + internet.totalClients,
    totalTrades: dt.totalTrades + internet.totalTrades,
    totalTurnover: dt.totalTurnover + internet.totalTurnover,
  };

  // ===========================================
  return (
    <Card
      className={cn(
        "overflow-hidden drop-shadow-md bg-[#033e4a] h-[308px]",
        className
      )}
    >
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2">
        <CardTitle className="text-white text-lg">
          Channel Wise Clients & Trades
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-3">
        <Table className="border border-gray-300 rounded-md overflow-hidden mt-8">
          <TableHeader>
            <TableRow className="bg-yellow-200">
              <TableHead className="w-[200px] text-black font-bold">
                Channel
              </TableHead>
              <TableHead className="text-right text-black font-bold">
                Client
              </TableHead>
              <TableHead className="text-right text-black font-bold">
                Trades
              </TableHead>
              <TableHead className="text-right text-black font-bold">
                Turnover
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* DT */}
            <TableRow className="bg-yellow-100 hover:bg-yellow-300">
              <TableCell className="font-medium">DT</TableCell>
              <TableCell className="text-right">
                {dt.totalClients.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {dt.totalTrades.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {numberToMillionsString(dt.totalTurnover)}
              </TableCell>
            </TableRow>

            {/* Internet */}
            <TableRow className="bg-yellow-50 hover:bg-yellow-200">
              <TableCell className="font-medium">Internet</TableCell>
              <TableCell className="text-right">
                {internet.totalClients.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {internet.totalTrades.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {numberToMillionsString(internet.totalTurnover)}
              </TableCell>
            </TableRow>

            {/* TOTAL */}
            <TableRow className="bg-yellow-200 font-bold">
              <TableCell>Total</TableCell>
              <TableCell className="text-right">
                {grandTotal.totalClients.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {grandTotal.totalTrades.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                {numberToMillionsString(grandTotal.totalTurnover)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
