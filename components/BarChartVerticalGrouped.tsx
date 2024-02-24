"use client";
import { FC } from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Rectangle,
} from "recharts";

import { numberToMillionsString } from "@/lib/utils";

interface BarData {
  xLabel: string;
  [key: string]: number | string;
}

interface BarOption {
  name: string;
  dataKey: string;
  fill: string;
  stroke: string;
  barLabel?: boolean;
}

interface BarChartProps {
  data: BarData[];
  options: BarOption[];
}

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

const BarChart: FC<BarChartProps> = ({ data, options }) => {
  const TICK_COLOR = "#C7C7C7";
  const CARTESIAN_GRID_COLOR = "#565656";
  return (
    <ResponsiveContainer height={300} width="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 25,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray={"5 5"}
          stroke={CARTESIAN_GRID_COLOR}
          vertical={false}
        />
        <XAxis
          dataKey={"xLabel"}
          angle={-30}
          textAnchor="end"
          height={70}
          tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(value) => numberToMillionsString(value as number)}
          tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
        />
        <Legend verticalAlign="top" height={46} />
        <Tooltip />
        {options.map((option, index) => (
          <Bar
            key={index}
            name={option.name}
            legendType="line"
            dataKey={option.dataKey}
            label={option?.barLabel ? <CustomizedLabel /> : undefined}
            fill={option.fill}
            activeBar={<Rectangle fill={option.fill} stroke={option.stroke} />}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface BarChartVerticalGroupedProps {
  data: BarData[];
  options: BarOption[];
}

const BarChartVerticalGrouped: FC<BarChartVerticalGroupedProps> = ({
  data,
  options,
}) => {
  return <BarChart data={data} options={options} />;
};

export default BarChartVerticalGrouped;
