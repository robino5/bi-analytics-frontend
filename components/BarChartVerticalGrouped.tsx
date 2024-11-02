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

import {
  LABEL_COLOR,
  TICK_COLOR,
  CARTESIAN_GRID_COLOR,
  LABEL_TICK_FONT_SIZE,
  TOOLTIP_BACKGROUND,
} from "./ui/utils/constants";

import { numberFormatter, numberToMillionsString } from "@/lib/utils";
import { Separator } from "./ui/separator";

interface BarData {
  label: string;
  generated: number | string;
  target: number | string;
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
  fill = LABEL_COLOR,
  value = 0,
}) => {
  return (
    <text
      x={x}
      y={y}
      dy={-4}
      fontSize={LABEL_TICK_FONT_SIZE}
      fontFamily="sans-serif"
      fill={"white"}
      textAnchor="middle"
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
                fontSize: "12px",
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

const BarChart: FC<BarChartProps> = ({ data, options }) => {
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
          strokeDasharray={"3 3"}
          stroke={CARTESIAN_GRID_COLOR}
          vertical={false}
        />
        <XAxis
          dataKey={"label"}
          angle={-30}
          textAnchor="end"
          height={70}
          tick={{
            stroke: TICK_COLOR,
            strokeOpacity: 0.1,
            fontSize: LABEL_TICK_FONT_SIZE,
            fill: "white",
          }}
        />
        <YAxis
          tickFormatter={(value) => numberToMillionsString(value as number)}
          tick={{
            stroke: TICK_COLOR,
            strokeOpacity: 0.1,
            fontSize: LABEL_TICK_FONT_SIZE,
            fill: "white",
          }}
        />
        <Legend verticalAlign="top" height={46} />
        <Tooltip content={<CustomTooltip />} />
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
