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
} from "recharts";
import { DetailsMarketShareLBSL } from "@/types/customerManagement";
import { cn } from "@/lib/utils";
import { detailsMarketShareLBSL } from "./columns";
import { DialogDataTable } from "./data-table";

interface ChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: DetailsMarketShareLBSL[];
}

export default function DetailsMarketShareLBSLChart({
  title,
  subtitle,
  className,
  data,
}: ChartComponentProps) {
  return (
    <Card className={cn("w-full shadow-md", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
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
            <XAxis dataKey="month" axisLine={true} tickLine={true} />
            <XAxis
              dataKey="year"
              axisLine={true}
              tickLine={true}
              xAxisId="year"
              orientation="bottom"
              height={50}
              tick={{ fontSize: 12 }}
              label={{ value: "Year", position: "insideBottom", offset: -10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="turnoverDse" fill="#8884d8" />
            <Bar dataKey="turnoverLbsl" fill="#82ca9d" />
            <Brush dataKey="month" height={30} stroke="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
