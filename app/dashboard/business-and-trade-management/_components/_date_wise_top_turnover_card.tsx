import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateWiseTopTurnoverData } from "../types";
import DateWiseTopTurnoverGrid from "./_date_wise_top_turnover_grid";
import DateWiseTopTurnoverChart from "./_date_wise_top_turnover_chart";

interface Props {
  title: string;
  datalist: DateWiseTopTurnoverData[];
}

export default function DateWiseTopTurnoverCard({ title, datalist }: Props) {
  // Assuming we don't have pushDate in this API, we just show the title.
  // If there's pushDate, it can be added similarly to BoardWiseTurnover.

  return (
    <Card className="col-span-3 overflow-hidden bg-[#033e4a]">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-1">
            <DateWiseTopTurnoverGrid datalist={datalist} />
          </div>
          <div className="col-span-1 border-l border-gray-200 pl-3">
            <DateWiseTopTurnoverChart datalist={datalist} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
