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
        <TableRow className="bg-blue-500 hover:bg-blue-700">
          <TableHead rowSpan={2} className="border text-white font-bold">
            Branch
          </TableHead>
          <TableHead colSpan={2} className="border text-white font-bold">
            Green
          </TableHead>
          <TableHead colSpan={2} className="border text-white font-bold">
            Yellow
          </TableHead>
          <TableHead colSpan={2} className="border text-white font-bold">
            Red
          </TableHead>
        </TableRow>
        <TableRow className="bg-blue-500 hover:bg-blue-700">
          <TableHead className="px-2 text-center border text-white font-bold">
            No. of code
          </TableHead>
          <TableHead className="px-2 text-center border text-white font-bold">
            % ratio
          </TableHead>
          <TableHead className="px-2 text-center border text-white font-bold">
            No. of code
          </TableHead>
          <TableHead className="px-2 text-center border text-white font-bold">
            % ratio
          </TableHead>
          <TableHead className="px-2 text-center border text-white font-bold">
            No. of code
          </TableHead>
          <TableHead className="px-2 text-center border text-white font-bold">
            % ratio
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
