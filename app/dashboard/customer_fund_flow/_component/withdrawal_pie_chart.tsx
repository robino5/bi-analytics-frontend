"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { numberToMillionsString } from "@/lib/utils";

interface PieChartProps {
  data: any;
}

const WithdrawalPieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // 🟩 Define consistent colors for each label
    const colorMap: Record<string, string> = {
      "Cash ": "#FF9800",
      "Cheque ": "#2196F3",
      "Online ": "#1ef58aff",
      "RTGS": "#c8ff00ff",
      "Pay-Order": "#F44336",
      "Cash-Dividend": "#4CAF50",
      "IPO": "#8BC34A",
    };

    const chartData = [
      { name: "Cash ", value: data.cashWithdrawal },
      { name: "Cheque ", value: data.chequeWithdrawal },
      { name: "Online ", value: data.onlineRequisition },
      { name: "RTGS", value: data.rtgs },
      { name: "Pay-Order", value: data.payOrder },
      { name: "Cash-Dividend", value: data.cashDividendDeduction },
      { name: "IPO", value: data.ipoMode },
    ].filter((d) => d.value > 0);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: (params: any) =>
          `${params.name}<br/>Value: <b>${numberToMillionsString(
            params.value
          )}</b><br/>(${params.percent}%)`,
      },
      color: chartData.map((d) => colorMap[d.name] || "#999999"), // consistent colors
      legend: {
        orient: "horizontal",
        bottom: 0,
        left: "center",
        textStyle: { color: "#ffffff" },
      },
      series: [
        {
          type: "pie",
          radius: ["20%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter: (params: any) =>
              `${params.name}\n${numberToMillionsString(
                params.value
              )}\n(${params.percent}%)`,
            fontSize: 14,
            color: "#000000ff",
            align: "center",
            position: "inside",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 6,
            smooth: true,
          },
          data: chartData,
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
      className="w-full h-[260px] sm:h-[320px] lg:h-[370px] flex items-center justify-center"
    />
  );
};

export default WithdrawalPieChart;
