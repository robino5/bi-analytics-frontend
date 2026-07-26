"use client";
import React from "react";
import { DateWiseTopTurnoverData } from "../types";
import { numberToMillionsString, cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export default function DateWiseTopTurnoverChart({ datalist }: Props) {
  const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8",
    "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57", "#ffc658"
  ];

  // Find max turnover to scale bars, avoiding division by zero
  const maxTurnover = Math.max(...datalist.map(d => d.turnover), 1);

  return (
    <div className="w-full h-full overflow-x-auto">
      <Table className="min-w-full border-none overflow-hidden text-sm">
        <TableHeader>
          {/* Use the exact same border size and padding as the grid's header but make background and border transparent to match visually while keeping dimensions */}
          <TableRow className="bg-transparent hover:bg-transparent border-b border-transparent">
            <TableHead className="h-8 py-1 border-transparent text-transparent"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datalist.map((data, index) => {
            const currentIsToday = isToday(data.tradeDate);
            const widthPercent = (data.turnover / maxTurnover) * 100;
            const barColor = COLORS[index % COLORS.length];

            return (
              <TableRow
                key={data.tradeDate}
                className="bg-transparent hover:bg-transparent transition-all duration-300 border-transparent"
              >
                <TableCell 
                  className={cn("py-1 px-0 border-transparent", currentIsToday && "text-[17px]")}
                >
                  {/* Invisible text block that perfectly matches the height of the left grid cells */}
                  <div className="w-full flex items-center relative">
                    {/* Render an invisible copy of the grid's text to force the EXACT same computed height */}
                    <span className={cn("invisible pointer-events-none", currentIsToday ? "font-bold text-[17px]" : "font-medium text-center")}>
                      {numberToMillionsString(data.turnover, 2, true)}
                    </span>
                    <div className="absolute inset-0 flex items-center">
                      <div 
                        className="h-[22px] rounded-r-sm transition-all duration-500 shadow-sm" 
                        style={{ width: `${widthPercent}%`, backgroundColor: barColor }}
                      />
                      <span className="ml-2 text-xs text-white font-medium whitespace-nowrap drop-shadow-md">
                        {numberToMillionsString(data.turnover, 2, true)}
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
