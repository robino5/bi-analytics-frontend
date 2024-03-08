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
  TOOLTIP_BACKGROUND,
} from "@/components/ui/utils/constants";
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

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadType[];
  label?: number;
}

type PayloadType = {
  value: string | number;
  name: string;
  payload: DataType;
  color: string;
  dataKey: string;
};

type DataType = {
  tradingDate: string;
  dt: number;
  internet: number;
  dtRatio?: number;
  internetRatio?: number;
};

const RATIO_TO_DATA_MAP: Record<string, string> = {
  dtRatio: "dt",
  internetRatio: "internet",
};

const CustomTooltip = ({ active, payload, ...rest }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    console.log(rest);
    return (
      <div
        style={{
          backgroundColor: TOOLTIP_BACKGROUND,
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "1px 2px 10px -2px #7873ffb1",
        }}
      >
        <p>{rest.label}</p>
        {payload.map((pld: PayloadType) => {
          const innerPayload = pld.payload;
          const tooltipPayloadKey = RATIO_TO_DATA_MAP[pld.dataKey];
          return (
            <>
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
                {`${pld.name} : ${numberToMillionsString(
                  innerPayload[tooltipPayloadKey as keyof DataType] as number
                )}`}
              </p>
            </>
          );
        })}
      </div>
    );
  }
  return null;
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
            <Tooltip content={<CustomTooltip />} />
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
