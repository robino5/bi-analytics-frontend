"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as echarts from "echarts";
import { ChannelTradingRecord } from "../types";

// Dynamic fallback colors in case of unexpected regions
const COLORS = [
  "#FF7F50", // Coral (matches pieChart.tsx)
  "#00BFFF", // Deep Sky Blue (matches pieChart.tsx)
  "#32CD32", // Lime Green
  "#BA55D3", // Medium Orchid
];

// ==========================================
// 🎨 DEFINE 4 FIXED COLORS FOR 4 REGIONS HERE
// ==========================================
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
  data: ChannelTradingRecord[];
}

// A dedicated helper sub-component to render the DT vs INTERNET ECharts pie chart inside the dialog
const RegionDetailChart: React.FC<{ region: string; data: ChannelTradingRecord[] }> = ({ region, data }) => {
  const detailChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailChartRef.current) return;

    const chart = echarts.init(detailChartRef.current);

    // Filter for the clicked region, and channel must be "DT" or "INTERNET"
    const regionData = data.filter(
      (item) =>
        item.region_Name?.trim() === region.trim() &&
        (item.channel?.trim() === "DT" || item.channel?.trim() === "INTERNET")
    );

    const dataForChart = regionData.map((item) => ({
      value: item.totalClients,
      name: item.channel?.trim() || "Unknown",
      itemStyle: {
        color: item.channel?.trim() === "DT" ? "#FF7F50" : "#00BFFF", // Matches pieChart.tsx COLORS
      },
    }));

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
          return `${params.name}-${params.value.toLocaleString()}(${(params.percent).toFixed(0)}%)`;
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
          name: "Channel Distribution",
          type: "pie",
          radius: ['20%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            color: "black",
            fontSize: 14,   
            formatter: (params: any) => {
              return `${params.value.toLocaleString()}\n(${(params.percent).toFixed(0)}%)`;
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

    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });

    resizeObserver.observe(detailChartRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [region, data]);

  return <div ref={detailChartRef} style={{ width: "100%", height: "300px" }} />;
};

const RegionWiseClientChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const chart = echarts.init(chartRef.current!);

    // Filter for channel "TOTAL (DT+INTERNET)"
    const filteredData = data.filter(
      (item) => item.channel?.trim() === "TOTAL (DT+INTERNET)"
    );

    const dataForChart = filteredData.map((item, index) => {
      const regionName = item.region_Name || "Unknown";
      return {
        value: item.totalClients,
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
          return `${params.name}-${params.value.toLocaleString()}(${(params.percent).toFixed(0)}%)`;
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
          name: "Region Wise Clients",
          type: "pie",
          radius: ['20%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            color: "black",
            fontSize: 14,   
            formatter: (params: any) => {
              return `${params.value.toLocaleString()}\n(${(params.percent).toFixed(0)}%)`;
            },
          },
          emphasis: {
            itemStyle: {
              cursor: "pointer",
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
    
    // Add Click listener on ECharts slices
    chart.on("click", (params: any) => {
      if (params.name) {
        setSelectedRegion(params.name);
      }
    });
    
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

  return (
    <>
      <Card className="drop-shadow-md bg-[#033e4a] h-full flex flex-col justify-between cursor-pointer">
        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
          <CardTitle className="text-white text-md text-lg">Region Wise Client Participation</CardTitle>
        </CardHeader>
        <CardContent className="mt-2 flex-grow flex items-center justify-center">
          <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
        </CardContent>
      </Card>

      {/* Interactive Modal Popup */}
      <Dialog open={selectedRegion !== null} onOpenChange={() => setSelectedRegion(null)}>
        <DialogContent className="bg-[#033e4a] text-white border-teal-800 max-w-md p-0 overflow-hidden rounded-lg">
          <DialogHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-4">
            <DialogTitle className="text-white text-md text-lg text-center font-bold">
              {selectedRegion} - DT vs INTERNET Client
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 flex items-center justify-center">
            {selectedRegion && (
              <RegionDetailChart region={selectedRegion} data={data} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegionWiseClientChart;