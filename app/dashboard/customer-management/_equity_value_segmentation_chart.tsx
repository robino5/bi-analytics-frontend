import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { EquityValueSegmentation } from "@/types/customerManagement";
import { numberToMillionsString } from "@/lib/utils";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  data,
}: any) => {
  const radius = outerRadius + 20;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={16}
    >
      <tspan x={x} dy="0">
        {data[index].customerCategory}
      </tspan>
      <tspan
        x={x}
        dy="1.2em"
      >{`${data[index].formattedTurnover} (${(percent * 100).toFixed(0)}%)`}</tspan>
    </text>
  );
};

interface PieChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: EquityValueSegmentation[];
  colors: string[];
}

export default function EquityValueSegmentationChart({
  title,
  subtitle,
  className,
  data,
  colors,
}: PieChartComponentProps) {
  const processedData = data.map((item) => ({
    ...item,
    formattedTurnover: numberToMillionsString(item.equity),
  }));

  return (
    <Card className={cn("w-full shadow-md", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent style={{ height: "500px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={(props) =>
                renderCustomizedLabel({ ...props, data: processedData })
              }
              outerRadius={150}
              paddingAngle={5}
              dataKey="equity"
            >
              {processedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              payload={processedData.map((entry, index) => ({
                value: entry.customerCategory,
                type: "circle",
                color: colors[index % colors.length],
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
