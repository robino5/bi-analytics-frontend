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
    <Card className={cn("overflow-auto", className, "bg-[#033e4a]")}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Margin Loan Allocation & Usage
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of the margin loan allocation & usage
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-3">
        <Table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700">
              <TableHead className="text-left py-3 px-4 text-white font-semibold tracking-wide border-r border-blue-500">
                Particular
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-white font-semibold tracking-wide">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.perticular}
                className={`transition-colors duration-300 hover:bg-teal-100 ${index % 2 === 0
                  ? "bg-teal-300 "
                  : "bg-teal-200"
                  }`}
              >
                <TableCell className="py-2 px-4 font-medium text-black border-b border-gray-200">
                  {record.perticular}
                </TableCell>
                <TableCell
                  className={`py-2 px-4 text-right font-semibold border-b border-gray-200 ${record.amount < 0 ? "text-red-500" : "text-black"
                    }`}
                >
                  {/\d/.test(record.perticular) && /user/i.test(record.perticular)
                    ? record.amount
                    : numberToMillionsString(record.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>

      </CardContent>
    </Card>
  );
}
