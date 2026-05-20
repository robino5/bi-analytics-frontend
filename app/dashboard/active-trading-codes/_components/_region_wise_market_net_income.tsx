"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as echarts from "echarts";
import { TradingRecord } from "../types";
import { numberToMillionsString } from "@/lib/utils";

// Dynamic fallback colors in case of unexpected regions
const COLORS = [
  "#FF7F50", // Coral (matches pieChart.tsx)
  "#00BFFF", // Deep Sky Blue (matches pieChart.tsx)
  "#32CD32", // Lime Green
  "#BA55D3", // Medium Orchid
];

// Defined fixed color mapping region-wise for visual consistency
const REGION_COLORS: { [key: string]: string } = {
  "ctg_main": "#FF7F50",   // CTG_MAIN: Coral Red
  "dhk_main": "#00BFFF",   // DHK_MAIN: Deep Sky Blue
  "dhk_north": "#32CD32",  // DHK_NORTH: Lime Green
  "dhk_south": "#BA55D3",  // DHK_SOUTH: Purple/Orchid
};

const getRegionColor = (regionName: string, index: number): string => {
  const normalized = regionName?.trim().toLowerCase();
  if (normalized && REGION_COLORS[normalized]) {
    return REGION_COLORS[normalized];
  }
  return COLORS[index % COLORS.length];
};

interface Props {
  data: TradingRecord[];
}

const RegionWiseMarketNetIncome: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const totalNetIncome = data.reduce((acc, item) => acc + (item.netIncome || 0), 0);
    if (!chartRef.current || !data || data.length === 0 || totalNetIncome === 0) return;

    const chart = echarts.init(chartRef.current!);

    const dataForChart = data.map((item, index) => {
      const regionName = item.region_Name || "Unknown";
      return {
        value: item.netIncome,
        name: regionName,
        itemStyle: {
          color: getRegionColor(regionName, index),
        },
      };
    });

    const option = {
      title: {
        left: "center",
        textStyle: {
          color: "black",
          fontSize: 18,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const val = typeof params.value === "number" ? params.value : Number(params.value || 0);
          return `${params.name}-${numberToMillionsString(val,2)} (${params.percent.toFixed(0)}%)`;
        },
      },
      legend: {
        orient: 'horizontal',  
        bottom: 0,             
        left: 'center',
        textStyle: {
          color: '#ffffff'  
        }      
      },
      series: [
        {
          name: "Region Wise Market Net Income",
          type: "pie",
          radius: ['20%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            color: "black",
            fontSize: 14,   
            formatter: (params: any) => {
              const val = typeof params.value === "number" ? params.value : Number(params.value || 0);
              return `${numberToMillionsString(val,2)}\n(${params.percent.toFixed(0)}%)`;
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: dataForChart,
        },
      ],
    };

    chart.setOption(option);
    
    // Use ResizeObserver to ensure the ECharts chart dynamically fits the parent container size
    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
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