"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { numberToMillionsString } from "@/lib/utils";

interface PieChartProps {
  data: any;
}

const DepositPieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    // ✅ Define color mapping by type
    const colorMap: Record<string, string> = {
      "Cash ": "#FF9800",           // Green
      "Cheque ": "#2196F3",         // Blue
      "SCB ": "#00ffd5ff",            // Orange
      "Pay-Order": "#d863ecff",       // Purple
      "Cash-Dividend": "#4CAF50",   // Red
      "IPO": "#8BC34A",             // Cyan
    };

    const chartData = [
      { name: "Cash ", value: data.cashDeposit },
      { name: "Cheque ", value: data.chequeDeposit },
      { name: "SCB ", value: data.scbDeposit },
      { name: "Pay-Order", value: data.payOrder },
      { name: "Cash-Dividend", value: data.cashDividend },
      { name: "IPO", value: data.ipoMode },
    ];

    const validData = chartData.filter((d) => d.value > 0);

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: (params: any) =>
          `${params.name}<br/>Value: <b>${numberToMillionsString(
            params.value
          )}</b><br/>(${params.percent}%)`,
      },
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
              position: "inside",
            color: "#000000ff",
            align: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 13,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 5,
            smooth: true,
          },
          // ✅ Apply color per item
          data: validData.map((item) => ({
            ...item,
            itemStyle: { color: colorMap[item.name] || "#999999" }, // fallback color
          })),
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

  return <div ref={chartRef} className="w-full h-[260px] sm:h-[320px] lg:h-[370px] flex items-center justify-center" />;
};

export default DepositPieChart;
