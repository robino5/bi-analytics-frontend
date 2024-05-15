import { IBranchWiseExposure } from "@/types/branchPerformance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  records: IBranchWiseExposure[];
}

export default function BranchWiseExposureDataTable({ records }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead rowSpan={2} className="border">
            Branch
          </TableHead>
          <TableHead colSpan={2} className="border">
            Green
          </TableHead>
          <TableHead colSpan={2} className="border">
            Yellow
          </TableHead>
          <TableHead colSpan={2} className="border">
            Red
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead className="px-2 text-center border">No. of code</TableHead>
          <TableHead className="px-2 text-center border">% ratio</TableHead>
          <TableHead className="px-2 text-center border">No. of code</TableHead>
          <TableHead className="px-2 text-center border">% ratio</TableHead>
          <TableHead className="px-2 text-center border">No. of code</TableHead>
          <TableHead className="px-2 text-center border">% ratio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
        {records.map((record, index) => (
          <TableRow key={index} className="odd:bg-muted even:bg-gradient">
            <TableCell className="font-medium py-1">
              {record.branchName}
            </TableCell>
            <TableCell className="py-1 text-right">
              {record.exposures.green?.investorsCount ?? 0}
            </TableCell>
            <TableCell className="py-1 text-right">
              {record.exposures.green?.exposureRatio ?? 0}
            </TableCell>
            <TableCell className="py-1 text-right">
              {record.exposures.yellow?.investorsCount ?? 0}
            </TableCell>
            <TableCell className="py-1 text-right">
              {record.exposures.yellow?.exposureRatio ?? 0}
            </TableCell>
            <TableCell className="py-1 text-right">
              {record.exposures.red?.investorsCount ?? 0}
            </TableCell>
            <TableCell className="py-1 text-right">
              {record.exposures.red?.exposureRatio ?? 0}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
