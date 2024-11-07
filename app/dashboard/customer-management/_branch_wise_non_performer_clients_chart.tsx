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
  BranchWiseNonPerformerClints,
  BranchWiseNonPerformerClintsDetails,
} from "@/types/customerManagement";
import { numberToMillionsString } from "@/lib/utils";
import { branchWiseNonPerformerClints } from "./columns";
import { DialogDataTable } from "./data-table";

interface ComposedChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: BranchWiseNonPerformerClints[];
  details: BranchWiseNonPerformerClintsDetails;
}

export default function BranchWiseNonPerformerClientsChart({
  title,
  subtitle,
  className,
  data,
  details,
}: ComposedChartComponentProps) {
  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#0e5e6f]")}>
      <CardHeader>
        <CardTitle className="text-white">{title}-{details.sumOfClients.toLocaleString()}</CardTitle>
        {/* <p className="text-sm text-muted-foreground text-white">{subtitle}</p> */}
        <div className="text-end">
          <DialogDataTable
            columns={branchWiseNonPerformerClints}
            data={data}
            datafiltering={true}
            title={"Non Performer Clients As on Data Table"}
            subtitle={"Showing data for non performer clients as on data table"}
          />
        </div>
      </CardHeader>
      {/* <div className="text-center text-white text-lg">
        <h5>Non-Performer Clients as on 2018-Nos{details.sumOfClients.toLocaleString()}</h5>
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
            <Bar yAxisId="left" dataKey="totalClients" fill="#1ac1d6">
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
              stroke="red"
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
