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

import {
  formatDate,
  numberFormatter,
  numberToMillionsString,
} from "@/lib/utils";
import { BarColors, TOOLTIP_BACKGROUND } from "./ui/utils/constants";
import { Separator } from "./ui/separator";

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
      dy={10}
      fontSize="14"
      fontFamily="sans-serif"
      fontWeight={600}
      fill={"white"}
      textAnchor="top"
    >
      {numberToMillionsString(value)}
    </text>
  );
};


const BarChart: FC<BarChartProps> = ({ data, option }) => {
  const TICK_COLOR = "#C7C7C7";
  const CARTESIAN_GRID_COLOR = "#565656";

  const FILL_COLOR_1 = "#D52941";
  const FILL_COLOR_2 = "#FCD581";

  return (
    <ResponsiveContainer height={option?.height ?? 300} width="100%">
      <RechartsBarChart data={data} >
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
          tick={{
            stroke: TICK_COLOR,
            strokeOpacity: 0.1,
            fontSize: 12,
            fill: "white",
          }}
          tickLine={true}
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
              fill="white"
            />
          }
          tick={{
            stroke: TICK_COLOR,
            strokeOpacity: 0.1,
            fontSize: 12,
            fill: "white",
          }}
          tickFormatter={(value) => numberToMillionsString(value as number)}
        />
        <YAxis
          yAxisId={"right"}
          orientation="right"
          label={
            <Label
              value={"LSBL Turnover"}
              angle={-90}
              dx={23}
              fontSize={12}
              fill="white"
            />
          }
          tick={{
            stroke: TICK_COLOR,
            strokeOpacity: 0.1,
            fontSize: 12,
            fill: "white",
          }}
          tickFormatter={(value) => numberToMillionsString(value as number)}
        />
        <Legend />
        <Tooltip content={<CustomTooltip />} />
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
