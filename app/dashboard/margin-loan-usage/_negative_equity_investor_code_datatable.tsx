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
import { IMarkedClient } from "@/types/marginLoanUsage";

interface Props {
  records: IMarkedClient[];
  className?: string;
}

export default function NegativeEquityInvestorCodeDataTable({
  records,
  className,
}: Props) {
  // Calculate sum of ledgerBalance
  const totalLedgerBalance = records.reduce((sum, record) => sum + record.ledgerBalance, 0);

  return (
    <Card className={cn("overflow-auto max-h-[815px]", className, "bg-[#033e4a]")}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Negative Equity Investor Code
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-3">
        <Table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700">
              <TableHead className="w-auto text-white font-bold">Code</TableHead>
              <TableHead className="text-left text-white font-bold">Investor Name</TableHead>
              <TableHead className="text-right text-white font-bold">Ledger Balance</TableHead>
              <TableHead className="text-center text-white font-bold">RM</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.investorCode}
                className={`${
                  index % 2 === 0 ? "bg-teal-300" : "bg-teal-200"
                } hover:bg-teal-100 transition-all duration-300`}
              >
                <TableCell className="font-medium py-1">
                  {record.investorCode}
                </TableCell>
                <TableCell className="py-1 text-left">
                  {record.investorName}
                </TableCell>
                <TableCell className="py-1 text-right text-red-500">
                  {numberToMillionsString(record.ledgerBalance)}
                </TableCell>
                <TableCell className="py-1 text-left">{record.rmName}</TableCell>
              </TableRow>
            ))}

            {/* Footer row for sum */}
            <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <TableCell colSpan={2} className="text-right text-white">
                Total:
              </TableCell>
              <TableCell className="text-right text-red-500">
                {numberToMillionsString(totalLedgerBalance)}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
