import { IBranchWiseExposure } from "@/types/branchPerformance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  records: IBranchWiseExposure[];
}

export default function BranchWiseExposureDataTable({ records }: Props) {
  return (
    <Card className="col-span-1  shadow-md lg:col-span-2 bg-[#033e4a] overflow-auto">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Branch Wise Exposure Status
        </CardTitle>
        {/* <CardDescription className="text-white">
              shows the grid for exposure status
            </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-16">
        <Table  wrapperClassName="max-h-[720px] overflow-y-auto rounded-md">
          <TableHeader className="sticky top-0 z-10">
            <TableRow className="text-center bg-table-header hover:bg-table-header text-black font-bold">
              <TableHead rowSpan={2} className="border text-black font-bold">
                Branch
              </TableHead>
              <TableHead colSpan={2} className="border text-black font-bold bg-green-300">
                Green
              </TableHead>
              <TableHead colSpan={2} className="border text-black font-bold bg-yellow-300">
                Yellow
              </TableHead>
              <TableHead colSpan={2} className="border text-black font-bold bg-red-300">
                Red
              </TableHead>
            </TableRow>
            <TableRow className="text-center bg-table-header hover:bg-table-header text-black font-bold">
              <TableHead className="px-2 text-center border text-black font-bold bg-green-300">
                No. of code
              </TableHead>
              <TableHead className="px-2 text-center border text-black font-bold bg-green-300">
                % ratio
              </TableHead>
              <TableHead className="px-2 text-center border text-black font-bold bg-yellow-300">
                No. of code
              </TableHead>
              <TableHead className="px-2 text-center border text-black font-bold bg-yellow-300">
                % ratio
              </TableHead>
              <TableHead className="px-2 text-center border text-black font-bold bg-red-300">
                No. of code
              </TableHead>
              <TableHead className="px-2 text-center border text-black font-bold bg-red-300">
                % ratio
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

                {/* ✅ Green columns with background */}
                <TableCell className={`py-1 text-right  text-black font-semibold ${index % 2 === 0 ? "bg-green-200" : "bg-green-100"
                  }`}>
                  {record.exposures.green?.investorsCount ?? 0}
                </TableCell>
                <TableCell className={`py-1 text-right  text-black font-semibold ${index % 2 === 0 ? "bg-green-200" : "bg-green-100"
                  }`}>
                  {record.exposures.green?.exposureRatio ?? 0}
                </TableCell>

                {/* ✅ Yellow columns with background */}
                <TableCell className={`py-1 text-right  text-black font-semibold ${index % 2 === 0 ? "bg-yellow-200" : "bg-yellow-100"
                  }`}>
                  {record.exposures.yellow?.investorsCount ?? 0}
                </TableCell>
                <TableCell className={`py-1 text-right  text-black font-semibold ${index % 2 === 0 ? "bg-yellow-200" : "bg-yellow-100"
                  }`}>
                  {record.exposures.yellow?.exposureRatio ?? 0}
                </TableCell>

                {/* ✅ Red columns with background */}
                <TableCell className={`py-1 text-right  text-black font-semibold ${index % 2 === 0 ? "bg-red-200" : "bg-red-100"
                  }`}>
                  {record.exposures.red?.investorsCount ?? 0}
                </TableCell>
                <TableCell className={`py-1 text-right  text-black font-semibold ${index % 2 === 0 ? "bg-red-200" : "bg-red-100"
                  }`}>
                  {record.exposures.red?.exposureRatio ?? 0}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>


        </Table>
      </CardContent>
    </Card>
  );
}
