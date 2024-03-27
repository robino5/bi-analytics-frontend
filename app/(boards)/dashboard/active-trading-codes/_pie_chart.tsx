"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarColors,
  LABEL_TICK_FONT_SIZE,
  TICK_COLOR,
} from "@/components/ui/utils/constants";
import { numberToMillionsString } from "@/lib/utils";
import { useState } from "react";
import {
  PieChart as PieChartRechart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [BarColors.red, BarColors.green];

interface IDataType {
  channel: string;
  totalClients: number;
  trades: number;
  totalTurnover: number;
}

type PropType = {
  title: string;
  dataKey: string;
  data: IDataType[];
};

interface IActiveShape {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  payload: IDataType;
  percent: number;
  value: number;
  index: number;
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  }: IActiveShape = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={12}>
        {payload.channel}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize={LABEL_TICK_FONT_SIZE}
      >{`${numberToMillionsString(value)}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={TICK_COLOR}
        fontSize={11}
      >
        {`(${Math.round(percent * 100)}%)`}
      </text>
    </g>
  );
};

const PieChart = ({ title, data, dataKey }: PropType) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  return (
    <Card className="bg-gradient-to-br from-gray-50 to-slate-200 drop-shadow-md">
      <CardHeader>
        <CardTitle className="text-slate-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChartRechart height={100} width={100}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              // labelLine={false}
              // label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey={dataKey}
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChartRechart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PieChart;
