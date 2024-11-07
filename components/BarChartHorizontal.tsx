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
  LabelList,
} from "recharts";

import { numberToMillionsString } from "@/lib/utils";
import {
  LABEL_COLOR,
  LABEL_TICK_FONT_SIZE,
  TOOLTIP_BACKGROUND,
} from "./ui/utils/constants";
import { Separator } from "./ui/separator";
import { AiTwotoneAlert } from "react-icons/ai";

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

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadType[];
  label?: number;
  totalAmount?: number;
}

type PayloadType = {
  value: string | number;
  name: string;
  payload: BarData;
  color: string;
  dataKey: string;
};

const findRatio = (
  value: string,
  totalAmount: number,
  precision: number = 2
) => {
  return ((parseFloat(value) / totalAmount) * 100).toFixed(precision);
};

const CustomTooltip = ({
  active,
  payload,
  label,
  totalAmount,
}: CustomTooltipProps) => {
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
        <p className="text-white">{label}</p>
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
              {`${pld.name} : ${findRatio(
                innerPayload.value as string,
                totalAmount ?? 1
              )}`}
              %
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const BarChart: FC<BarChartProps> = ({ data, option }) => {
  const TICK_COLOR = "#C7C7C7";
  const CARTESIAN_GRID_COLOR = "#565656";
  const totalAmount = data.reduce(
    (acc, obj) => acc + parseFloat(obj.value as string),
    0
  );
  return (
    <ResponsiveContainer height={option?.height ?? 300} width="100%">
      <RechartsBarChart
        barCategoryGap={1}
        layout="vertical"
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 65,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray={"3 3"}
          stroke={CARTESIAN_GRID_COLOR}
          horizontal={false}
          opacity={0.3}
        />
        <XAxis
          type="number"
          tick={{
            stroke: TICK_COLOR,
            strokeOpacity: 0.1,
            fontSize: 12,
            fill: "white",
          }}
          tickLine={false}
          tickFormatter={(value) => `${findRatio(value, totalAmount, 0)}%`}
        />
        <YAxis
          type="category"
          minTickGap={1}
          dataKey={option.dataKey}
          tick={{
            stroke: TICK_COLOR,
            strokeOpacity: 0.1,
            fontSize: 12,
            fill: "white",
          }}
        />
        {option?.legendName ?? <Legend name={option.legendName} />}
        <Tooltip content={<CustomTooltip totalAmount={totalAmount} />} />
        <Bar
          dataKey={option.valueKey}
          fill={option.fill}
          legendType="line"
          barSize={12}
          activeBar={<Rectangle fill={option.fill} stroke={option.stroke} />}
        >
          {option?.barLabel ? (
            <LabelList
              position="right"
              dataKey={option.valueKey}
              fill={LABEL_COLOR}
              fontSize={LABEL_TICK_FONT_SIZE}
              offset={1}
              formatter={(value: number) =>
                `${numberToMillionsString(value, true)}`
              }
            />
          ) : (
            ""
          )}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface BarCharHorizonalProps {
  data: BarData[];
  options: BarOption;
}

const BarChartHorizontal: FC<BarCharHorizonalProps> = ({ data, options }) => {
  return data.length ? (
    <BarChart data={data} option={options} />
  ) : (
    <div className="font-semibold text-lg text-gray-600 flex justify-center items-center">
      <AiTwotoneAlert className="mr-2 h-6 w-5" /> No data available
    </div>
  );
};

export default BarChartHorizontal;
