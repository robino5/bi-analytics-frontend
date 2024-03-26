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
  Cell,
  Rectangle,
} from "recharts";

import { numberFormatter, numberToMillionsString } from "@/lib/utils";
import {
  BarColors,
  CARTESIAN_GRID_COLOR,
  TICK_COLOR,
  TOOLTIP_BACKGROUND,
} from "./ui/utils/constants";
import { Separator } from "./ui/separator";

interface BarData {
  name: string;
  value: number;
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
  value = 0,
}) => {
  return (
    <text
      x={x}
      y={y}
      dy={10}
      fontSize="14"
      fontWeight={600}
      fontFamily="sans-serif"
      fill="#6d6d6d"
      textAnchor="top"
    >
      {numberToMillionsString(value)}
    </text>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadType[];
  label?: number;
}

type PayloadType = {
  value: string | number;
  name: string;
  payload: BarData;
  color: string;
  dataKey: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    return (
      <div
        style={{
          backgroundColor: TOOLTIP_BACKGROUND,
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "1px 2px 10px -2px #7873ffb1",
        }}
      >
        <p>{label}</p>
        <Separator className="border-gray-500" />
        {payload.map((pld: PayloadType) => {
          const innerPayload = pld.payload;
          return (
            <p
              key={pld.name}
              style={{
                borderStyle: "solid 1px",
                fontSize: "13px",
                fontWeight: "600",
                fontFamily: "sans-serif",
                color: pld.color,
              }}
            >
              {`${pld.name} : ${numberFormatter(
                innerPayload[pld.dataKey as keyof BarData] as number
              )}`}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const BarChart: FC<BarChartProps> = ({ data, option }) => {
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
        <CartesianGrid strokeDasharray={"3 3"} stroke={CARTESIAN_GRID_COLOR} />
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
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="#C9C9C9" />
        <Bar
          dataKey={option.valueKey}
          fill={BarColors.green}
          legendType="line"
          barSize={40}
          label={option?.barLabel ? <CustomizedLabel /> : ""}
          activeBar={<Rectangle fill={option.fill} stroke={option.stroke} />}
        >
          {data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry[option.valueKey] < 0 ? BarColors.red : BarColors.green
              }
            />
          ))}
        </Bar>
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
  return data.length ? (
    <BarChart data={data} option={options} />
  ) : (
    "No Data available"
  );
};

export default BarChartPositiveNegative;
