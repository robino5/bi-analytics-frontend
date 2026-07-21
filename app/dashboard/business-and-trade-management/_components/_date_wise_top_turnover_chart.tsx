"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { DateWiseTopTurnoverData } from "../types";
import { formatDate, numberToMillionsString } from "@/lib/utils";

interface Props {
  datalist: DateWiseTopTurnoverData[];
}

export default function DateWiseTopTurnoverChart({ datalist }: Props) {
  const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8",
    "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57", "#ffc658"
  ];

  const chartData = datalist.map((item) => ({
    name: formatDate(new Date(item.tradeDate)),
    turnover: item.turnover,
  }));

  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#ffffff44" />
          <XAxis 
            type="number"
            tick={{ fontSize: 12, fill: "#ffffff" }}
            tickFormatter={(value) => numberToMillionsString(value, 0, false)}
          />
          <YAxis 
            dataKey="name" 
            type="category"
            tick={{ fontSize: 12, fill: "#ffffff" }}
            width={100}
          />
          <Tooltip 
            formatter={(value: number) => [numberToMillionsString(value, 2, true), "Turnover"]}
            labelStyle={{ color: "black" }}
            itemStyle={{ color: "black" }}
            cursor={{ fill: "transparent" }}
          />
          <Bar dataKey="turnover" radius={[0, 4, 4, 0]} barSize={20}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <LabelList 
              dataKey="turnover" 
              position="right" 
              formatter={(val: number) => numberToMillionsString(val, 2, true)} 
              fill="#ffffff" 
              fontSize={12} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
