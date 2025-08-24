"use client";

import { FC, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { numberToMillionsString } from "@/lib/utils";
import { BarColors} from "./ui/utils/constants";

interface BarData {
  tradingDate: string;
  amount: number;
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
  options: BarOption;
}

const BarChartPositiveNegative: FC<BarChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (params: any) => {
            return `${params[0].name}: ${numberToMillionsString(params[0].value)}`;
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: data.map((item) => item.tradingDate),
            axisTick: { alignWithLabel: true },
            axisLabel: {
              rotate: 35, 
              color: "white", 
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: (value: number) => numberToMillionsString(value), 
              color: "white", 
            },
          },
        ],
        series: [
          {
            name: "Amount",
            type: "bar",
            data: data.map((item) => item.amount),
            itemStyle: {
              color: (params: any) => {
                return params.value > 0 ?  "#00BFFF":"#FF7F50"; 
              }, 
            },
            label: {
              show: options.barLabel, 
              position: "top", 
              formatter: (params: any) => {
                return numberToMillionsString(params.value); 
              },
              color: "white", 
            },
          },
        ],
      };
      const negativeSeries = option.series[0];
      negativeSeries.data.forEach((value: number, index: number) => {
        if (value < 0) {
          negativeSeries.label.position = "bottom";
        }
      });
      chart.setOption(option);
    }
    return () => {
      if (chartRef.current) {
        echarts.dispose(chartRef.current);
      }
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default BarChartPositiveNegative;
