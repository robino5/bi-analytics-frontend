"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { numberToMillionsString } from "@/lib/utils";

type MonthlyData = {
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
};

interface LineChartProps {
  monthlyWise: any;
}

const MonthlyLineChart: React.FC<LineChartProps> = ({ monthlyWise }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const values = months.map(
      (m) => monthlyWise[m.toLowerCase() as keyof MonthlyData]
    );

    const option: echarts.EChartsOption = {
      backgroundColor: "#033e4a", 
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          const data = params[0];
          return `
            <div style="padding: 6px 10px;">
              <strong>${data.name}</strong><br/>
              Value: <b>${numberToMillionsString(data.value)}</b>
            </div>
          `;
        },
      },
      // ✅ Tight grid with no padding around chart
      grid: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: months,
        axisLabel: {
          rotate: 45,
          fontSize: 14,
          color: "#ffffffff",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#9ca3af",
            width: 1.5,
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: {
            color: "#ffffffff",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#c2bfbfff",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (value) => `${numberToMillionsString(value)}`,
          color: "#ffffffff",
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#9ca3af",
            width: 1.5,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#c2bfbfff",
          },
        },
      },
      series: [
        {
          name: "Total Deposit",
          data: values,
          type: "line",
          smooth: true,
          lineStyle: { width: 3, color: "#0cf058ff" },
          itemStyle: { color: "#e71708ff" },
          label: {
            show: true,
            position: "top",
            formatter: (params: any) => numberToMillionsString(params.value),
            fontSize: 12,
            color: "#ffffffff",
            fontWeight: 600,
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [monthlyWise]);

  return (
    <div
      ref={chartRef}
      className="w-full h-[360px] sm:h-[300px] lg:h-[420px] bg-white rounded-2xl shadow-sm"
    />
  );
};

export default MonthlyLineChart;
