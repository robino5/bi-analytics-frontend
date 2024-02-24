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
      fontSize="16"
      fontFamily="sans-serif"
      fill={fill}
      textAnchor="start"
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
        barCategoryGap={1}
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 120,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray={"3 4"} stroke={CARTESIAN_GRID_COLOR} />
        <XAxis
          type="number"
          tick={{ stroke: TICK_COLOR }}
          tickLine={false}
          tickFormatter={(value) => numberToMillionsString(value as number)}
        />
        <YAxis
          type="category"
          minTickGap={1}
          dataKey={option.dataKey}
          tick={{ stroke: TICK_COLOR }}
        />
        {option?.legendName ?? <Legend name={option.legendName}/>}
        <Tooltip />
        <Bar
          dataKey={option.valueKey}
          fill={option.fill}
          legendType="line"
          barSize={12}
          // radius={[0, 5, 5, 0]}
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

const BarChartHorizontal: FC<BarCharHorizonalProps> = ({ data, options }) => {
  return <BarChart data={data} option={options} />;
};

export default BarChartHorizontal;
