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
        <TableRow>
          <TableHead rowSpan={2} className="border">
            Branch
          </TableHead>
          <TableHead rowSpan={2} className="border">
            Margin Used
          </TableHead>
          <TableHead className="text-center border" colSpan={4}>
            Turnover of Margin Clients
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="px-2 text-center border">Daily</TableHead>
          <TableHead className="px-2 text-center border">Weekly</TableHead>
          <TableHead className="px-2 text-center border">Monthly</TableHead>
          <TableHead className="px-2 text-center border">Yearly</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
        {records.map((record, index) => (
          <TableRow key={index} className="odd:bg-muted even:bg-gradient">
            <TableCell className="font-medium py-1">
              {record.branchName}
            </TableCell>
            <TableCell className="py-1 text-right">
              {numberToMillionsString(record.loanUsed)}
            </TableCell>
            <TableCell className="py-1 text-right">
              {numberToMillionsString(record.turnoverDaily)}
            </TableCell>
            <TableCell className="py-1 text-right">
              {numberToMillionsString(record.turnoverWeekly)}
            </TableCell>
            <TableCell className="py-1 text-right">
              {numberToMillionsString(record.turnoverMonthly)}
            </TableCell>
            <TableCell className="py-1 text-right">
              {numberToMillionsString(record.turnoverYearly)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
