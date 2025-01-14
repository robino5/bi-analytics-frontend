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
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface BarData {
  tradingDate: string;
  activeClients: string | number;
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




interface BarCharHorizonalProps {
  data: BarData[];
  options: BarOption;
}

const BarChartBiAxis: FC<BarCharHorizonalProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (params: any) => {
            let tooltipHtml = `<strong>${params[0].axisValue}</strong><br/>`;
            params.forEach((item: any) => {
              const value =
                item.seriesName === "Turnover"
                  ? numberToMillionsString(item.data)
                  : item.data;
              tooltipHtml += `${item.marker} ${item.seriesName}: ${value}<br/>`;
            });
            return tooltipHtml;
          },
        },
        legend: {
          data: ["Active Clients", "Turnover"],
          textStyle: { color: "white" },
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.tradingDate),
          axisLabel: {
            color: "white",
            rotate: 35,
          },
        },
        yAxis: [
          {
            type: "value",
            name: "Active Clients",
            nameTextStyle: {
              color: "white",
            },
            axisLabel: {
              color: "white",
              formatter: numberToMillionsString,
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "Turnover",
            nameTextStyle: {
              color: "white",
            },
            axisLabel: {
              color: "white",
              formatter: numberToMillionsString,
            },
          },
        ],
        series: [
          {
            name: "Active Clients",
            type: "bar",
            data: data.map((item) => item.activeClients),
            label: {
              show: true,
              position: "top",
              color: "white",
            },
          },
          {
            name: "Turnover",
            type: "bar",
            data: data.map((item) => item.turnover),
            yAxisIndex: 1,
            label: {
              show: true,
              position: "top",
              color: "white",
              formatter: (params: any) =>
                numberToMillionsString(params.value, true),
            },
          },
        ],
      };
      chartInstance.setOption(option);
      return () => {
        chartInstance.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default BarChartBiAxis;



