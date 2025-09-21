import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { ClientSegmentation } from "@/types/customerManagement";

const RADIAN = Math.PI / 180;

// Customized label function to show value with a label line and black text
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
  const radius = outerRadius + 20; // Position the label slightly outside the slice
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black" // Black color for the text
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12} // Font size for better readability
    >
      {`${data[index].totalClients} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

interface PieChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: ClientSegmentation[];
  colors: string[];
}

export default function PieChartComponent({
  title,
  subtitle,
  className,
  data,
  colors,
}: PieChartComponentProps) {
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
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true} // Enable label lines
              label={(props) => renderCustomizedLabel({ ...props, data })} // Use custom label
              outerRadius={150}
              paddingAngle={5}
              dataKey="totalClients"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]} // Apply color from the palette
                />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              payload={data.map((entry, index) => ({
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
