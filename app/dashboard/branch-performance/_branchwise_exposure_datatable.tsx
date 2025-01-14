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
    <Table className="border border-gray-300 rounded-md overflow-hidden">
      <TableHeader>
        <TableRow className="text-center bg-table-header hover:bg-table-header text-black font-bold">
          <TableHead rowSpan={2} className="border text-black font-bold">
            Branch
          </TableHead>
          <TableHead colSpan={2} className="border text-black font-bold">
            Green
          </TableHead>
          <TableHead colSpan={2} className="border text-black font-bold">
            Yellow
          </TableHead>
          <TableHead colSpan={2} className="border text-black font-bold">
            Red
          </TableHead>
        </TableRow>
        <TableRow className="text-center bg-table-header hover:bg-table-header text-black font-bold">
          <TableHead className="px-2 text-center border text-black font-bold">
            No. of code
          </TableHead>
          <TableHead className="px-2 text-center border text-black font-bold">
            % ratio
          </TableHead>
          <TableHead className="px-2 text-center border text-black font-bold">
            No. of code
          </TableHead>
          <TableHead className="px-2 text-center border text-black font-bold">
            % ratio
          </TableHead>
          <TableHead className="px-2 text-center border text-black font-bold">
            No. of code
          </TableHead>
          <TableHead className="px-2 text-center border text-black font-bold">
            % ratio
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border">
        {records.map((record, index) => (
          <TableRow
            key={index}
            className={`${
              index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
            } hover:bg-table-even-row-hover transition-all duration-300`}
          >
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
