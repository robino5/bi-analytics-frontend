"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { numberToMillionsString } from "@/lib/utils";

interface BarData {
  label: string;
  generated: number | string;
  target: number | string;
}

interface BarOption {
  name: string;
  dataKey: string;
  fill: string;
  barLabel?: boolean;
}

interface BarChartProps {
  data: BarData[];
  options: BarOption[];
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chartInstance = echarts.init(chartRef.current);
    const seriesData = options.map((option) => ({
      name: option.name,
      type: "bar",
      data: data.map((item) => Number(item[option.dataKey as keyof BarData])),
      itemStyle: { color: option.fill },
      label: {
        show: option.barLabel ?? true,
        position: "top",
        formatter: (params: { value: number }) => `${numberToMillionsString(params.value)}`,
        color: "#fff",
      },
    }));
    const chartOptions = {
      tooltip: {
        trigger: "item",
        borderRadius: 10,
        padding: 10,
        formatter: (params: any) => {
          const { seriesName, value } = params;
          return `${seriesName}: ${numberToMillionsString(value)}`;
        },
      },
      legend: {
        data: options.map((option) => option.name),
        top: "5%",
        textStyle: { color: "#fff" },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item.label),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: "#fff",
          fontSize: 12,
          formatter: (value: number) => numberToMillionsString(value),
        },
      },
      series: seriesData,
    };
    chartInstance.setOption(chartOptions);
    const handleResize = () => {
      chartInstance.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      chartInstance.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, options]);
  return <div ref={chartRef} style={{ width: "100%", height: 300 }} />;
};
export default BarChart;
