import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  DetailsMarketShareLBSL,
  DetailsMarketShareLBSLDetails,
} from "@/types/customerManagement";
import { cn } from "@/lib/utils";
import { detailsMarketShareLBSL } from "./columns";
import { DialogDataTable } from "./data-table";

interface ChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: DetailsMarketShareLBSL[];
  details: DetailsMarketShareLBSLDetails;
}

export default function DetailsMarketShareLBSLChart({
  title,
  subtitle,
  className,
  data,
  details,
}: ChartComponentProps) {
  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#0e5e6f]")}>
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <p className="text-sm text-muted-foreground text-white">{subtitle}</p>
        <div className="text-end">
          <DialogDataTable
            columns={detailsMarketShareLBSL}
            data={data}
            datafiltering={false}
            title={"Details Market Share of LBSL (Foreign) Data Table"}
            subtitle={
              "Showing data for details  market share of LBSL ( Foreign ) data table"
            }
          />
        </div>
      </CardHeader>
      <CardContent style={{ height: "500px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              axisLine={true}
              tickLine={true}
              tick={{ fill: "white" }}
            />
            <XAxis
              dataKey="year"
              axisLine={true}
              tickLine={true}
              xAxisId="year"
              orientation="bottom"
              height={50}
              tick={{ fontSize: 12, fill: "white" }}
              label={{ value: "Year", position: "insideBottom", offset: -10 }}
            />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="turnoverDse" fill="orange">
              <LabelList
                dataKey="turnoverDse"
                position="top"
                angle={-90}
                style={{ fill: "yellow", fontSize: 12 }}
              />
            </Bar>
            <Bar dataKey="turnoverLbsl" fill="Pink">
              <LabelList
                dataKey="turnoverLbsl"
                position="top"
                angle={-90}
                style={{ fill: "red", fontSize: 12 }}
              />
            </Bar>
            <Brush dataKey="month" height={30} stroke="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
