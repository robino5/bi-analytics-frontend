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
  Brush,
  Bar,
  Rectangle,
  Label,
} from "recharts";

import { formatDate, numberToMillionsString } from "@/lib/utils";
import { BarColors } from "./ui/utils/constants";

interface BarData {
  date: string;
  client: string | number;
  turnover: string | number;
}

interface BarOption {
  dataKey: string;
  valueKeyA: string;
  valueKeyB: string;
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

const tickDateFormatter = (date: string) => {
  return formatDate(new Date(date));
};

const BarChart: FC<BarChartProps> = ({ data, option }) => {
  const TICK_COLOR = "#C7C7C7";
  const CARTESIAN_GRID_COLOR = "#565656";

  const FILL_COLOR_1 = "#D52941";
  const FILL_COLOR_2 = "#FCD581";

  return (
    <ResponsiveContainer height={option?.height ?? 300} width="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid
          strokeDasharray={"1 3"}
          stroke={CARTESIAN_GRID_COLOR}
          vertical={false}
        />
        <XAxis
          dataKey={option.dataKey}
          angle={-30}
          textAnchor="end"
          height={70}
          tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
          tickLine={true}
          tickFormatter={tickDateFormatter}
        />
        <YAxis
          yAxisId={"left"}
          orientation="left"
          label={
            <Label
              value={"Number Of Clients Traded"}
              angle={-90}
              dx={-23}
              fontSize={12}
            />
          }
          tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
          tickFormatter={(value) => numberToMillionsString(value as number)}
        />
        <YAxis
          yAxisId={"right"}
          orientation="right"
          label={
            <Label value={"LSBL Turnover"} angle={-90} dx={23} fontSize={12} />
          }
          tick={{ stroke: TICK_COLOR, strokeOpacity: 0.1, fontSize: 12 }}
          tickFormatter={(value) => numberToMillionsString(value as number)}
        />
        <Legend />
        <Tooltip />
        <Brush dataKey={option.valueKeyA} height={30} stroke="#8884d8" />
        <Bar
          name="Clients"
          dataKey={option.valueKeyA}
          yAxisId={"left"}
          fill={BarColors.red}
          legendType="line"
          label={option?.barLabel ? <CustomizedLabel /> : ""}
          activeBar={<Rectangle fill={FILL_COLOR_1} stroke={option.stroke} />}
        />
        <Bar
          name="Turnover"
          dataKey={option.valueKeyB}
          yAxisId={"right"}
          fill={BarColors.green}
          legendType="line"
          label={option?.barLabel ? <CustomizedLabel /> : ""}
          activeBar={<Rectangle fill={FILL_COLOR_2} stroke={option.stroke} />}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface BarCharHorizonalProps {
  data: BarData[];
  options: BarOption;
}

const BarChartBiAxis: FC<BarCharHorizonalProps> = ({ data, options }) => {
  return <BarChart data={data} option={options} />;
};

export default BarChartBiAxis;
