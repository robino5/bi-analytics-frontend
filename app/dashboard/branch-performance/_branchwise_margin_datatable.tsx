import { cn, numberToMillionsString } from "@/lib/utils";
import { IBranchWiseMargin } from "@/types/branchPerformance";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  records: IBranchWiseMargin[];
}

export default function BranchWiseMarginDataTable({ records }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-blue-500 hover:bg-blue-700">
          <TableHead rowSpan={2} className="border text-white font-bold">
            Branch
          </TableHead>
          <TableHead rowSpan={2} className="border text-white font-bold">
            Margin Used
          </TableHead>
          <TableHead
            className="text-center border text-white font-bold"
            colSpan={4}
          >
            Turnover of Margin Clients
          </TableHead>
        </TableRow>
        <TableRow className="bg-blue-500 hover:bg-blue-700">
          <TableHead className="px-2 text-center border text-white font-bold">
            Daily
          </TableHead>
          <TableHead className="px-2 text-center border text-white font-bold">
            Weekly
          </TableHead>
          <TableHead className="px-2 text-center border text-white font-bold">
            Monthly
          </TableHead>
          <TableHead className="px-2 text-center border text-white font-bold">
            Yearly
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
        {records.map((record, index) => (
          <TableRow
            key={index}
            className={`${
              index % 2 === 0 ? "bg-pink-200" : "bg-yellow-200"
            } hover:bg-green-300 transition-all duration-300`}
          >
            <TableCell className="font-medium py-1">
              {record.branchName}
            </TableCell>
            <TableCell className="py-1 text-right">
              {numberToMillionsString(record.loanUsed)}
            </TableCell>
            <TableCell className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                  }`}>
              {numberToMillionsString(record.turnoverDaily)}
            </TableCell>
            <TableCell className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-green-200" : "bg-green-100"
                  }`}>
              {numberToMillionsString(record.turnoverWeekly)}
            </TableCell>
            <TableCell className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-orange-200" : "bg-orange-100"
                  }`}>
              {numberToMillionsString(record.turnoverMonthly)}
            </TableCell>
            <TableCell  className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-yellow-200" : "bg-yellow-100"
                  }`}>
              {numberToMillionsString(record.turnoverYearly)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
