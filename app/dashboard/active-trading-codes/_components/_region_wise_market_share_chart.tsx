"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as echarts from "echarts";
import { TradingRecord } from "../types";

const COLORS = ["#FF7F50", "#00BFFF", "#32CD32", "#BA55D3", "#FFD700"];

const REGION_COLORS: { [key: string]: string } = {
  ctg_main: "#FF7F50",
  dhk_main: "#00BFFF",
  dhk_north: "#32CD32",
  dhk_south: "#BA55D3",
  ft: "#FFD700",
};

const getRegionColor = (regionName: string, index: number): string => {
  const normalized = regionName?.trim().toLowerCase();
  if (normalized && REGION_COLORS[normalized]) return REGION_COLORS[normalized];
  return COLORS[index % COLORS.length];
};

interface Props {
  data: TradingRecord[];
}

const RegionWiseMarketShareChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    const chart = echarts.init(chartRef.current);

    // ✅ Filter valid data
    const filteredData = data.filter((item) => (item.lbslMarketAll || 0) > 0);

    // ✅ Total calculation (important for %)
    const totalMarketShare = filteredData.reduce((acc, item) => {
      return acc + Number(item.lbslMarketAll || 0);
    }, 0);

    // ✅ Prepare chart data with percentage
    const dataForChart = filteredData.map((item, index) => {
      const regionName = item.region_Name || "Unknown";
      const value = Number(item.lbslMarketAll || 0);
      const percent = totalMarketShare ? (value / totalMarketShare) * 100 : 0;

      return {
        value,
        name: regionName,
        percent,
        itemStyle: { color: getRegionColor(regionName, index) },
      };
    });

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const value = Number(params.value || 0).toFixed(3);
          const percent = Number(params.data?.percent || 0).toFixed(2);
          return `${params.name}<br/>${value} (${percent}%)`;
        },
      },

      legend: {
        orient: "vertical",
        left: "left",
        top: "top",
        textStyle: { color: "#ffffff" },
      },

      series: [
        {
          type: "pie",
          radius: ["20%", "80%"],
          center: ["55%", "55%"],
          avoidLabelOverlap: true,
          minAngle: 15,

          label: {
            show: true,
            position: "inside",
            color: "black",
            fontSize: 14,

            // ✅ VALUE + PERCENT ON NEXT LINE
            formatter: (params: any) => {
              const value = Number(params.value || 0).toFixed(3);
              const percent = Number(params.data?.percent || 0).toFixed(2);
              return `${value}\n(${percent}%)`;
            },
          },

          data: dataForChart,
        },
      ],
    };

    chart.setOption(option);

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [data]);

  // ✅ Total for header display
  const filteredData = data.filter((item) => (item.lbslMarketAll || 0) > 0);

  const totalMarketShare = filteredData.reduce((acc, item) => {
    return acc + Number(item.lbslMarketAll || 0);
  }, 0);

  return (
    <Card className="drop-shadow-md bg-[#033e4a] h-full flex flex-col justify-between">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Region Wise LBSL Market Share (DSE+CSE) -{" "}
          {totalMarketShare.toFixed(2)}%
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-2 flex-grow flex items-center justify-center">
        <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
      </CardContent>
    </Card>
  );
};

export default RegionWiseMarketShareChart;