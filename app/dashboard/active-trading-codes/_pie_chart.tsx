"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarColors } from "@/components/ui/utils/constants";
import {
  PieChart as PieChartRechart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { numberToMillionsString } from "@/lib/utils";

const COLORS = [BarColors.red, BarColors.green];

interface IDataType {
  channel: string;
  totalClients: number;
  trades: number;
  totalTurnover: number;
}

type PropType = {
  title: string;
  dataKey: string;
  data: IDataType[];
};

interface IActiveShape {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  payload: IDataType;
  percent: number;
  value: number;
  index: number;
}

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
  dataKey
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

if(dataKey=="totalClients"){
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${data[index].channel} - ${data[index].totalClients} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
}else if(dataKey=="trades"){
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${data[index].channel} - ${data[index].trades} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
}else if(dataKey=="totalTurnover"){
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${data[index].channel} - ${numberToMillionsString(data[index].totalTurnover)} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
}
 
};

const PieChart = ({ title, data, dataKey }: PropType) => {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // ===========================================

  return (
    <Card className="drop-shadow-md bg-[#0e5e6f]">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChartRechart height={400} width={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              fill="#8884d8"
              labelLine={false}
              dataKey={dataKey}
              label={(props) => renderCustomizedLabel({ ...props, data,dataKey })} 
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              payload={data.map((entry, index) => ({
                value: entry.channel,
                type: "circle",
                color: COLORS[index % COLORS.length],
              }))}
            />
          </PieChartRechart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PieChart;
