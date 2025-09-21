import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  LabelList,
} from "recharts";
import {
  BranchWiseClintsNumber,
  BranchWiseClintsNumberDetails,
} from "@/types/customerManagement";
import { branchWiseClintsNumber } from "./columns";
import { DialogDataTable } from "./data-table";

interface ComposedChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: BranchWiseClintsNumber[];
  details: BranchWiseClintsNumberDetails;
}

export default function BranchWiseClientsNumberChart({
  title,
  subtitle,
  className,
  data,
  details,
}: ComposedChartComponentProps) {
  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#0e5e6f]")}>
      <CardHeader>
        <CardTitle className="text-white">{title}-{details.sumOfClients.toLocaleString()}mn</CardTitle>
        {/* <p className="text-sm text-muted-foreground text-white">{subtitle}</p> */}
        <div className="text-end">
          <DialogDataTable
            columns={branchWiseClintsNumber}
            data={data}
            datafiltering={true}
            title={"Branch Wise Clients Number Data Table"}
            subtitle={"Showing data for branch wise clients number data table"}
          />
        </div>
      </CardHeader>
      {/* <div className="text-center text-white text-lg">
        <h5>Branch Wise Client-{details.sumOfClients}%</h5>
      </div> */}
      <CardContent style={{ height: "500px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
            <XAxis dataKey="branchName" tick={{ fill: "white" }} />
            <YAxis yAxisId="left" tick={{ fill: "white" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "white" }}
            />

            <Tooltip />
            <Legend />
            <Brush
              dataKey="branchName"
              height={30}
              stroke="#8884d8"
              travellerWidth={10}
            />
            <Bar yAxisId="left" dataKey="totalClients" fill="#f27373">
              <LabelList
                dataKey="totalClients"
                position="top"
                angle={-90}
                style={{ fill: "white", fontSize: 16 }}
              />
            </Bar>

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalClientPercentage"
              stroke="#1ac1d6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
