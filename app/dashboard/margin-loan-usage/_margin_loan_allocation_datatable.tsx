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
import { IMarginLoanAllocation } from "@/types/marginLoanUsage";

interface Props {
  records: IMarginLoanAllocation[];
  className?: string;
}

export default function MarginLoanAllocationDataTable({
  records,
  className,
}: Props) {
  return (
    <Card className={cn("overflow-auto", className, "bg-[#0e5e6f]")}>
      <CardHeader>
        <CardTitle className="text-white">
          Margin Loan Allocation & Usage
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of the margin loan allocation & usage
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Table className="border border-gray-300 rounded-md overflow-hidden">
          <TableHeader >
            <TableRow className="text-center bg-table-header hover:bg-table-header text-black font-bold">
              <TableHead className="text-left py-1 border border-gray-300 text-black">
                Particular
              </TableHead>
              <TableHead className="text-right py-1 border border-gray-300 text-black">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.perticular}
                className={`${
                  index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                } hover:bg-table-even-row-hover transition-all duration-300`}
              >
                <TableCell className="font-medium py-1">
                  {record.perticular}
                </TableCell>
                <TableCell className="py-1 text-right">
                  {numberToMillionsString(record.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
