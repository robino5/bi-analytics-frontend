import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Data {
  board: string;
  turnover: number;
  dsePercentage: number;
  lbslTurnover: number;
  lbslPercentage: number;
  pushDate: string;
}

interface Props {
  datalist: Data[];
}

const numberToMillionsString = (num: number) => {
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function BoardWiseTurnover({ datalist }: Props) {
  const totalTurnover = datalist?.reduce((acc, data) => acc + data.turnover, 0);
  const totalDsePercentage = datalist?.reduce(
    (acc, data) => acc + data.dsePercentage,
    0
  );
  const totalLbslTurnover = datalist?.reduce(
    (acc, data) => acc + data.lbslTurnover,
    0
  );
  const totalLbslPercentage = datalist?.reduce(
    (acc, data) => acc + data.lbslPercentage,
    0
  );

  const pushDate = datalist.length > 0 ? datalist[0]?.pushDate : "";
  const pushTime = pushDate.split(" ")[1] + " " + pushDate.split(" ")[2];

  const isWithinTimeRange = () => {
    const timeParts = pushTime.match(/(\d{2}):(\d{2}):(\d{2}) (AM|PM)/);
    if (!timeParts) return false;

    let hours = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[2]);
    const seconds = parseInt(timeParts[3]);
    const period = timeParts[4];

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    const pushTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    const startTimeInSeconds = 10 * 3600;
    const endTimeInSeconds = 15 * 3600;

    return pushTimeInSeconds >= startTimeInSeconds && pushTimeInSeconds <= endTimeInSeconds;
  };

  return (
    <Card className="col-span-3 overflow-auto bg-[#0e5e6f]">
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          DSE Board Wise Turnover As On {pushDate}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2">
        <Table className="min-w-[453px] border border-gray-300 rounded-md overflow-hidden">
          <TableHeader>
            <TableRow className="bg-table-header hover:bg-table-header">
              <TableHead className="text-black font-bold">Board Type</TableHead>
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
                className={`${
                  index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                } hover:bg-table-even-row-hover transition-all duration-300`}
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
          </TableBody>
          <TableFooter>
            <TableRow className="bg-table-footer hover:bg-table-footer transition-all duration-300">
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
        {/* {isWithinTimeRange() && (
          <p className="text-destructive">Note: G-SEC Data is not Available</p>
        )} */}
      </CardContent>
    </Card>
  );
}
