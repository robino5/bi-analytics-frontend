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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BranchWiseMarginDataTable({ records }: Props) {
  return (
    <Card className="col-span-1  lg:col-span-2 shadow-md bg-[#033e4a] max-h-[807px] overflow-auto">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Branch Wise Margin Status
        </CardTitle>
        {/* <CardDescription className="text-white">
                  shows the grid for margin status
                </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-3">
      <Table className="">
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
              className={`${index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                } hover:bg-table-even-row-hover transition-all duration-300`}
            >
              <TableCell className="font-medium py-1">
                {record.branchName}
              </TableCell>
              <TableCell className="py-1 text-right">
                {numberToMillionsString(record.loanUsed)}
              </TableCell>
              <TableCell className={`text-right py-1 ${index % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                }`}>
                {numberToMillionsString(record.turnoverDaily)}
              </TableCell>
              <TableCell className={`text-right py-1 ${index % 2 === 0 ? "bg-green-200" : "bg-green-100"
                }`}>
                {numberToMillionsString(record.turnoverWeekly)}
              </TableCell>
              <TableCell className={`text-right py-1 ${index % 2 === 0 ? "bg-orange-200" : "bg-orange-100"
                }`}>
                {numberToMillionsString(record.turnoverMonthly)}
              </TableCell>
              <TableCell className={`text-right py-1 ${index % 2 === 0 ? "bg-yellow-200" : "bg-yellow-100"
                }`}>
                {numberToMillionsString(record.turnoverYearly)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
              </Card >
      );
}
