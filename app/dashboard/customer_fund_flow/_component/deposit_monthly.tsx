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
  DepositmonthlyWise: any;
  withdrawalmonthlyWise?: any;
}

const MonthlyLineChart: React.FC<LineChartProps> = ({
  DepositmonthlyWise,
  withdrawalmonthlyWise,
}) => {
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

    const depositValues = months.map(
      (m) => DepositmonthlyWise[m.toLowerCase() as keyof MonthlyData],
    );

    const withdrawalValues = months.map(
      (m) => withdrawalmonthlyWise?.[m.toLowerCase() as keyof MonthlyData] ?? 0,
    );

    const option: echarts.EChartsOption = {
      backgroundColor: "#033e4a",
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          let tooltipHtml = `
      <div style="padding: 6px 10px;">
        <strong>${params[0].name}</strong><br/>
      `;
          params.forEach((item: any) => {
            tooltipHtml += `
          ${item.marker} ${item.seriesName}: 
          <b>${numberToMillionsString(item.value)}</b><br/>
        `;
          });
          tooltipHtml += `</div>`;
          return tooltipHtml;
        },
      },

      legend: {
        show: true,
        bottom: 0, // places legend at the bottom
        left: "center", // centers the legend horizontally
        textStyle: {
          color: "#ffffff",
          fontSize: 14,
        },
        itemGap: 20, // spacing between legend items
      },

      grid: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 50, // give some space for the legend
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
        axisLine: { lineStyle: { color: "#9ca3af", width: 1.5 } },
        axisTick: {
          show: true,
          alignWithLabel: true,
          lineStyle: { color: "#ffffffff" },
        },
        splitLine: { show: true, lineStyle: { color: "#c2bfbfff" } },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (value) => `${numberToMillionsString(value)}`,
          color: "#ffffffff",
        },
        axisLine: { lineStyle: { color: "#9ca3af", width: 1.5 } },
        splitLine: { lineStyle: { color: "#c2bfbfff" } },
      },

      series: [
        {
          name: "Deposit",
          data: depositValues,
          type: "bar",
          barWidth: "40%",
          itemStyle: {
            color: "#0cf058ff",
            borderRadius: [6, 6, 0, 0],
          },
          label: {
            show: true,
            position: "top",
            color: "#ffffff",
            fontSize: 10,
            formatter: (params: any) => numberToMillionsString(params.value),
          },
        },
        {
          name: "Withdrawal",
          data: withdrawalValues,
          type: "bar",
          barWidth: "40%",
          itemStyle: {
            color: "#ff9800",
            borderRadius: [6, 6, 0, 0],
          },
          label: {
            show: true,
            position: "top",
            color: "#ffffff",
            fontSize: 10,
            formatter: (params: any) => numberToMillionsString(params.value),
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
  }, [DepositmonthlyWise, withdrawalmonthlyWise]);

  return (
    <div
      ref={chartRef}
      className="w-full h-96 sm:h-80 lg:h-96 rounded-2xl shadow-sm"
    />
  );
};

export default MonthlyLineChart;
