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
import {
  BarColors,
  LABEL_TICK_FONT_SIZE,
  TICK_COLOR,
} from "@/components/ui/utils/constants";

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

type Props = {
  x: number;
  y: number;
  stroke: string;
  payload: CustomizedLabelProps;
};

const CustomizedAxisTick = ({ x, y, stroke, payload }: Props) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#999"
        transform="rotate(-35)"
        fontSize={12}
        opacity={1}
      >
        {payload.value}
      </text>
    </g>
  );
};

const customLegendFormatter = (value: string) => {
  return value.toUpperCase();
};

const StackBarChart = ({
  title,
  xDataKey,
  dataKeyA,
  dataKeyB,
  data,
}: StackChartPropType) => {
  return (
    <Card className="bg-gradient-to-tr from-gray-50 to-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-600">{title}</CardTitle>
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
              // @ts-ignore
              tick={<CustomizedAxisTick />}
              tickLine={true}
            />
            <YAxis
              tick={{
                stroke: TICK_COLOR,
                strokeOpacity: 0.1,
                fontSize: LABEL_TICK_FONT_SIZE,
              }}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <Tooltip />
            <Legend formatter={customLegendFormatter} />
            <Bar
              dataKey={dataKeyA}
              stackId="a"
              fill={BarColors.red}
              name={"DT"}
            >
              <LabelList
                fill="#fff"
                dataKey={dataKeyA}
                style={{ fontSize: "12px" }}
                position="insideStart"
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
            <Bar
              dataKey={dataKeyB}
              stackId="a"
              fill={BarColors.green}
              name={"INTERNET"}
            >
              <LabelList
                fill="#fff"
                style={{ fontSize: "12px" }}
                dataKey={dataKeyB}
                position="insideStart"
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StackBarChart;
