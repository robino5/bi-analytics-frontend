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

interface PerticularTypes {
  perticular: string;
  amount: number;
}

interface Props {
  records: PerticularTypes[];
}

export default function PortfolioManagementStatusDataTable({ records }: Props) {
  return (
    <Card className="col-span-3 overflow-auto bg-[#033e4a]">
      <CardHeader  className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Portfolio Management Status
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of the portfolio
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-3">
        <Table className="border border-gray-300 rounded-md overflow-hidden">
          <TableHeader>
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
                  {record.perticular.toLowerCase().includes('client')?record.amount:numberToMillionsString(record.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
