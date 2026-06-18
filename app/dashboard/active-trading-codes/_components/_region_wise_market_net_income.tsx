"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as echarts from "echarts";
import { TradingRecord } from "../types";
import { numberToMillionsString } from "@/lib/utils";

const COLORS = ["#FF7F50", "#00BFFF", "#32CD32", "#BA55D3", "#FFD700"];
const REGION_COLORS: { [key: string]: string } = {
  "ctg_main": "#FF7F50", "dhk_main": "#00BFFF", "dhk_north": "#32CD32", "dhk_south": "#BA55D3", "ft": "#FFD700"
};

const getRegionColor = (regionName: string, index: number): string => {
  const normalized = regionName?.trim().toLowerCase();
  if (normalized && REGION_COLORS[normalized]) return REGION_COLORS[normalized];
  return COLORS[index % COLORS.length];
};

interface Props { data: TradingRecord[]; }

const RegionWiseMarketNetIncome: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalNetIncome = data.reduce((acc, item) => acc + (item.netIncome || 0), 0);
    if (!chartRef.current || !data || data.length === 0 || totalNetIncome === 0) return;

    const chart = echarts.init(chartRef.current!);

    // 🛠️ FILTER OUT ZERO VALUES HERE
    const filteredData = data.filter(item => (item.netIncome || 0) > 0);

    const dataForChart = filteredData.map((item, index) => {
      const regionName = item.region_Name || "Unknown";
      return {
        value: item.netIncome,
        name: regionName,
        itemStyle: { color: getRegionColor(regionName, index) },
      };
    });

    const option = {
      tooltip: {
        trigger: "item",
        // 🔄 Changed params.percent.toFixed(0) to .toFixed(2)
        formatter: (params: any) => `${params.name}-${numberToMillionsString(params.value, 2)} (${params.percent.toFixed(2)}%)`,
      },
      legend: { orient: 'vertical', left: 'left', top: 'top', textStyle: { color: '#ffffff' } },
      series: [{
        type: "pie",
        radius: ['20%', '80%'],
        center: ['55%', '55%'],
        avoidLabelOverlap: true,
        minAngle: 15,
        label: {
          show: true,
          position: "inside",
          color: "black",
          fontSize: 14,
          // 🔄 Changed params.percent.toFixed(0) to .toFixed(2)
          formatter: (params: any) => `${numberToMillionsString(params.value, 2)}\n(${params.percent.toFixed(2)}%)`,
        },
        data: dataForChart,
      }],
    };

    chart.setOption(option);
    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(chartRef.current!);
    return () => { resizeObserver.disconnect(); chart.dispose(); };
  }, [data]);

  const totalNetIncome = data ? data.reduce((acc, item) => acc + (item.netIncome || 0), 0) : 0;

  return (
    <Card className="drop-shadow-md bg-[#033e4a] h-full flex flex-col justify-between">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Region Wise Net Income - {numberToMillionsString(totalNetIncome, 2)}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2 flex-grow flex items-center justify-center min-h-[300px]">
        {totalNetIncome === 0 ? (
          <div className="text-center px-4 py-8">
            <p className="text-red-600 text-lg font-semibold leading-relaxed max-w-[280px] mx-auto">
              Net Income will show after upload Trade file to Back office application
            </p>
          </div>
        ) : (
          <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
        )}
      </CardContent>
    </Card>
  );
};

export default RegionWiseMarketNetIncome;