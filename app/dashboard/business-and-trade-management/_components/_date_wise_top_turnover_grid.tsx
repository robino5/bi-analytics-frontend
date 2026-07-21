import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { numberToMillionsString, formatDate, cn } from "@/lib/utils";
import { DateWiseTopTurnoverData } from "../types";

interface Props {
  datalist: DateWiseTopTurnoverData[];
}

const isToday = (dateString: string) => {
  const today = new Date();
  const date = new Date(dateString);
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

export default function DateWiseTopTurnoverGrid({ datalist }: Props) {
  return (
    <div className="w-full h-full overflow-x-auto">
      <Table className="min-w-full border border-gray-300 rounded-md overflow-hidden text-sm">
        <TableHeader>
          <TableRow className="bg-table-header hover:bg-table-header">
            <TableHead className="text-black font-bold h-8 py-1 text-right">Turnover</TableHead>
            <TableHead className="text-center text-black font-bold h-8 py-1">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datalist.map((data, index) => {
            const currentIsToday = isToday(data.tradeDate);
            return (
              <TableRow
                key={data.tradeDate}
                className={cn(
                  index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row",
                  "hover:bg-table-even-row-hover transition-all duration-300"
                )}
              >
                <TableCell className={cn("text-right py-1", currentIsToday && "font-bold text-green-700 text-[17px]")}>
                  {numberToMillionsString(data.turnover, 2, true)}
                </TableCell>
                 <TableCell className={cn("py-1", currentIsToday ? "font-bold text-green-700 text-[17px]" : "font-medium text-center")}>
                  {formatDate(new Date(data.tradeDate))}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
