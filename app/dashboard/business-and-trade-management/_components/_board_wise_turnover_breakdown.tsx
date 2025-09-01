import PushDateTime from "@/components/push-date-time";
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
  TableFooter,
} from "@/components/ui/table";
import { numberToMillionsString } from "@/lib/utils";
import { Clock } from "lucide-react";

interface BoardWiseTurnoverBreakdownData {
  pushDate: string;
  board: string;
  turnover: number;
  dsePercentage: number;
  lbslTurnover: number;
  lbslPercentage: number;
}

interface Props {
  datalist: BoardWiseTurnoverBreakdownData[];
}
export default function BoardWiseTurnoverBreakdown({ datalist }: Props) {
  const totalTurnover = datalist.reduce((acc, data) => acc + data.turnover, 0);
  const totalDsePercentage = datalist.reduce(
    (acc, data) => acc + data.dsePercentage,
    0
  );
  const totalLbslTurnover = datalist.reduce(
    (acc, data) => acc + data.lbslTurnover,
    0
  );
  const totalLbslPercentage = datalist.reduce(
    (acc, data) => acc + data.lbslPercentage,
    0
  );
  return (
    <Card className="col-span-3 overflow-auto bg-[#033e4a]">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg flex items-center gap-2">
          <span>DSE Board Wise Turnover As On</span>
          <PushDateTime pushdate={datalist.length > 0 ? datalist[0]?.pushDate : ""} />
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of the board wise turnover breakdown
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-2">
        <Table className="min-w-[453px] border border-gray-300 rounded-md overflow-hidden">
          <TableHeader>
            <TableRow className="bg-table-header hover:bg-table-header">
              <TableHead className="text-black font-bold">Main Board</TableHead>
              <TableHead className="text-right text-black font-bold">
                DSE Turn Over(Mn)
              </TableHead>
              <TableHead className="text-right text-black font-bold">
                DSE(%)
              </TableHead>
              <TableHead className="text-right text-black font-bold">
                LBSL Turn Over(Mn)
              </TableHead>
              <TableHead className="text-right text-black font-bold">
                LBSL(%)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datalist.map((data, index) => (
              <TableRow
                key={data.board}
                className={`${index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                  } hover:bg-table-even-row-hover transition-all duration-300`}
              >
                <TableCell className="font-medium py-1 ">
                  {data.board}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(data.turnover,2)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(data.dsePercentage,2)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(data.lbslTurnover,2)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(data.lbslPercentage,2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-table-footer hover:bg-table-footer transition-all duration-300">
              <TableCell className="font-medium py-2">Total</TableCell>
              <TableCell className="text-right py-2">
                {numberToMillionsString(totalTurnover,2)}
              </TableCell>
              <TableCell className="text-right py-2">
                {numberToMillionsString(totalDsePercentage,2)}
              </TableCell>
              <TableCell className="text-right py-2">
                {numberToMillionsString(totalLbslTurnover,2)}
              </TableCell>
              <TableCell className="text-right py-2">
                {numberToMillionsString(totalLbslPercentage,2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
