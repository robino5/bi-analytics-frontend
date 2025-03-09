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
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Margin Loan Allocation & Usage
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of the margin loan allocation & usage
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-3">
        <Table className="border border-gray-300 rounded-md overflow-hidden">
          <TableHeader >
            <TableRow className="bg-blue-500 hover:bg-blue-700">
              <TableHead className="text-left py-1 border border-gray-300 text-white font-bold">
                Particular
              </TableHead>
              <TableHead className="text-right py-1 border border-gray-300 text-white font-bold">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.perticular}
                className={`${
                  index % 2 === 0 ? "bg-blue-300" : "bg-blue-200"
                } hover:bg-blue-100 transition-all duration-300`}
              >
                <TableCell className="font-medium py-1">
                  {record.perticular}
                </TableCell>
                <TableCell className={`py-1 text-right ${record.amount < 0 ? "text-red-500" : "text-black"}`}>
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
