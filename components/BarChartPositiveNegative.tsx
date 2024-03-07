"use client";

import { FC } from "react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  Bar,
  Rectangle,
} from "recharts";

import { numberToMillionsString } from "@/lib/utils";

interface BarData {
  name: string;
  value: string | number;
}

interface BarOption {
  dataKey: string;
  valueKey: string;
  fill: string;
  stroke: string;
  height?: number;
  barLabel?: boolean;
  legendName?: string;
}

interface BarChartProps {
  data: BarData[];
  option: BarOption;
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

const BarChart: FC<BarChartProps> = ({ data, option }) => {
  const TICK_COLOR = "#C7C7C7";
  const CARTESIAN_GRID_COLOR = "#565656";
  return (
    <ResponsiveContainer height={option?.height ?? 300} width="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray={"1 3"} stroke={CARTESIAN_GRID_COLOR} />
        <XAxis
          dataKey={option.dataKey}
          angle={-30}
          textAnchor="end"
          height={70}
          tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
          tickLine={true}
        />
        <YAxis
          dataKey={option.valueKey}
          tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
          tickFormatter={(value) => numberToMillionsString(value as number)}
        />
        <Tooltip />
        <ReferenceLine y={0} stroke="#C9C9C9" />
        <Bar
          dataKey={option.valueKey}
          fill={option.fill}
          legendType="line"
          barSize={15}
          label={option?.barLabel ? <CustomizedLabel /> : ""}
          activeBar={<Rectangle fill={option.fill} stroke={option.stroke} />}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface BarCharHorizonalProps {
  data: BarData[];
  options: BarOption;
}

const BarChartPositiveNegative: FC<BarCharHorizonalProps> = ({
  data,
  options,
}) => {
  return <BarChart data={data} option={options} />;
};

export default BarChartPositiveNegative;
