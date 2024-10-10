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

interface BoardWiseTurnoverBreakdownData {
  tradingDate: string;
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
    <Card className="col-span-3 overflow-auto">
      <CardHeader>
        <CardTitle className="">Board Wise Turnover Breakdown </CardTitle>
        <CardDescription>
          short summary of the board wise turnover breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="min-w-[453px]">
          <TableHeader>
            <TableRow>
              <TableHead className="">Main Board</TableHead>
              <TableHead className="text-right">DSE Turn Over(Mn)</TableHead>
              <TableHead className="text-right">DSE(%)</TableHead>
              <TableHead className="text-right">LBSL Turn Over(Mn)</TableHead>
              <TableHead className="text-right">LBSL(%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datalist.map((data) => (
              <TableRow
                key={data.board}
                className="odd:bg-muted even:bg-gradient"
              >
                <TableCell className="font-medium py-1">{data.board}</TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(data.turnover)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(data.dsePercentage)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(data.lbslTurnover)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(data.lbslPercentage)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-medium py-2">Total</TableCell>
              <TableCell className="text-right py-2">
                {numberToMillionsString(totalTurnover)}
              </TableCell>
              <TableCell className="text-right py-2">
                {numberToMillionsString(totalDsePercentage)}
              </TableCell>
              <TableCell className="text-right py-2">
                {numberToMillionsString(totalLbslTurnover)}
              </TableCell>
              <TableCell className="text-right py-2">
                {numberToMillionsString(totalLbslPercentage)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
