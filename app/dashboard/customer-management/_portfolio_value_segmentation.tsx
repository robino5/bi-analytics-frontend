import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import { PortfolioValueSegmentation } from "@/types/customerManagement";
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

  const valueLabel =
    data[index].margin < 0
      ? `-${data[index].formattedTurnover}`
      : data[index].formattedTurnover;

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
    >
      <tspan x={x} dy="0">
        {data[index].customerCategory}
      </tspan>
      <tspan
        x={x}
        dy="1.2em"
      >{`${valueLabel} (${(percent * 100).toFixed(0)}%)`}</tspan>
    </text>
  );
};

const renderCustomizedLabelSecond = ({
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

  const valueLabel = `${data[index].value} (${(percent * 100).toFixed(0)}%)`;

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      <tspan x={x} dy="0">
        {data[index].name}
      </tspan>
      <tspan x={x} dy="1.2em">
        {valueLabel}
      </tspan>
    </text>
  );
};

interface PieChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: PortfolioValueSegmentation[];
  colors: string[];
  colors2: string[];
}

export default function PortfolioValueSegmentationChart({
  title,
  subtitle,
  className,
  data,
  colors,
  colors2,
}: PieChartComponentProps) {
  const processedData = data.map((item) => ({
    ...item,
    formattedTurnover: numberToMillionsString(item.tpvTotal),
  }));

  const totals = data.reduce(
    (acc, item) => {
      acc.lockQty += item.lockQty;
      acc.freeQty += item.freeQty;
      return acc;
    },
    { lockQty: 0, freeQty: 0 }
  );

  const comparisonData = [
    { name: "Free", value: totals.freeQty },
    { name: "Lock", value: totals.lockQty },
  ];

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
              cx="25%"
              cy="50%"
              outerRadius={100}
              labelLine={true}
              label={(props) =>
                renderCustomizedLabel({ ...props, data: processedData })
              }
              paddingAngle={5}
              dataKey="tpvTotal"
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
            <Pie
              data={comparisonData}
              cx="75%"
              cy="50%"
              outerRadius={80}
              labelLine={true}
              label={(props) =>
                renderCustomizedLabelSecond({ ...props, data: comparisonData })
              }
              paddingAngle={5}
              dataKey="value"
            >
              {comparisonData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors2[index % colors2.length]}
                />
              ))}
            </Pie>

            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              payload={comparisonData.map((entry, index) => ({
                value: entry.name,
                type: "circle",
                color: colors2[index % colors2.length],
              }))}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
