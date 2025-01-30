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
} from "recharts";
import { BranchWiseClintsNumber } from "@/types/customerManagement";

interface ComposedChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: BranchWiseClintsNumber[];
}

export default function ComposedChartComponent({
  title,
  subtitle,
  className,
  data,
}: ComposedChartComponentProps) {
  return (
    <Card className={cn("w-full shadow-md", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent style={{ height: "500px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
            <XAxis dataKey="branchName" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />

            <Tooltip />
            <Legend />
            <Brush
              dataKey="branchName"
              height={30}
              stroke="#8884d8"
              travellerWidth={10}
            />
            <Bar yAxisId="left" dataKey="totalClients" fill="#413ea0" />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalClientPercentage"
              stroke="#ff7300"
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
