"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";
import { numberToMillionsString } from "@/lib/utils";

type StackChartPropType = {
  title: string;
  xDataKey: string;
  dataKeyA: string;
  dataKeyB: string;
  data: any[];
};

interface CustomizedLabelProps {
  x?: number;
  y?: number;
  fill?: string;
  value?: number;
}

const CustomizedLabel: FC<CustomizedLabelProps> = ({
  x = 0,
  y = 0,
  fill = "#C6C6C6",
  value = 0,
}) => {
  return (
    <text
      x={x}
      y={y}
      dy={-4}
      fontSize="16"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="middle"
    >
      {numberToMillionsString(value)}
    </text>
  );
};

type Props = {
  x: number;
  y: number;
  stroke: string;
  payload: CustomizedLabelProps
}

const CustomizedAxisTick = ({ x, y, stroke, payload }: Props) => {

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        fontSize={12}
      >
        {payload.value}
      </text>
    </g>
  );
};

const customLegendFormatter = (value: string) => {
  return value.toUpperCase()
}

const StackBarChart = ({
  title,
  xDataKey,
  dataKeyA,
  dataKeyB,
  data,
}: StackChartPropType) => {
  const TICK_COLOR = "#C7C7C7";
  return (
    <Card className="bg-gradient-to-tl from-gray-50 to-slate-100">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={xDataKey}
              angle={-30}
              textAnchor="end"
              height={70}
              tick={<CustomizedAxisTick />}
              tickLine={true}
            />
            <YAxis
              tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
              tickLine={true}
              type="number"
            />
            <Tooltip />
            <Legend formatter={customLegendFormatter}/>
            <Bar dataKey={dataKeyA} stackId="a" fill="#8884d8">
              <LabelList dataKey={dataKeyA} position="insideStart" />
            </Bar>
            <Bar dataKey={dataKeyB} stackId="a" fill="#82ca9d">
              <LabelList dataKey={dataKeyB} position="insideTop" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StackBarChart;
