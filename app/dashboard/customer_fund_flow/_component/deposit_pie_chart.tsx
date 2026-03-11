"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { numberToMillionsString } from "@/lib/utils";

interface PieChartProps {
  data: any;
}

const DepositBarChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const colorMap: Record<string, string> = {
      Cash: "#FF9800",
      Cheque: "#2196F3",
      SCB: "#00ffd5ff",
      "Pay-Order": "#d863ecff",
      "Cash-Dividend": "#4CAF50",
      IPO: "#8BC34A",
      Transfer: "#FF5722",
      Online: "#9C27B0",
    };

    const chartData = [
      { name: "Cash", value: data.cashDeposit },
      { name: "Cheque", value: data.chequeDeposit },
      { name: "SCB", value: data.scbDeposit },
      { name: "Pay-Order", value: data.payOrder },
      { name: "Cash-Dividend", value: data.cashDividend },
      { name: "IPO", value: data.ipoMode },
      { name: "Transfer", value: data.transferDeposit },
      { name: "Online", value: data.onlineReceive },
    ];

    const validData = chartData.filter((d) => d.value > 0);

    const total = validData.reduce((sum, item) => sum + item.value, 0);

    const option: echarts.EChartsOption = {
      grid: {
        left: "5%",
        right: "4%",
        top: "10%",
        bottom: "5%",
        containLabel: true,
      },

      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (params: any) => {
          const p = params[0];
          const percent = ((p.value / total) * 100).toFixed(2);

          return `
            ${p.name}<br/>
            Value: <b>${numberToMillionsString(p.value)}</b><br/>
            Percentage: <b>${percent}%</b>
          `;
        },
      },

      xAxis: {
        type: "category",
        data: validData.map((d) => d.name),
        axisLabel: {
          color: "#ffffff",
          rotate: 60,
          interval: 0,
          margin: 15,
        },
        axisLine: {
          lineStyle: { color: "#ffffff" },
        },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          color: "#ffffff",
          formatter: (value: number) => numberToMillionsString(value),
        },
        axisLine: {
          lineStyle: { color: "#ffffff" },
        },
        splitLine: {
          lineStyle: { color: "#ffffff30" },
        },
      },

      series: [
        {
          name: "Deposit",
          type: "bar",
          barWidth: "70%",
          data: validData.map((item) => ({
            value: item.value,
            itemStyle: {
              color: colorMap[item.name] || "#999999",
            },
          })),
          label: {
            show: true,
            position: "top",
            formatter: (params: any) => {
              const percent = ((params.value / total) * 100).toFixed(1);
              return `${numberToMillionsString(params.value)}\n(${percent}%)`;
            },
            color: "#ffffff",
            fontSize: 12,
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
  }, [data]);

  return (
    <div
      ref={chartRef}
      className="w-full h-[260px] sm:h-[320px] lg:h-[370px]"
    />
  );
};

export default DepositBarChart;