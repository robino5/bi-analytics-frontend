"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import * as echarts from "echarts";
import { ChannelTradingRecord } from "../types";

const COLORS = ["#FF7F50", "#00BFFF", "#32CD32", "#BA55D3", "#FFD700"];

const REGION_COLORS: { [key: string]: string } = {
  "ctg_main": "#FF7F50",
  "dhk_main": "#00BFFF",
  "dhk_north": "#32CD32",
  "dhk_south": "#BA55D3",
  "ft": "#FFD700",
};

const getRegionColor = (regionName: string, index: number): string => {
  const normalized = regionName?.trim().toLowerCase();
  if (normalized && REGION_COLORS[normalized]) return REGION_COLORS[normalized];
  return COLORS[index % COLORS.length];
};

interface Props { data: ChannelTradingRecord[]; }

const RegionDetailChart: React.FC<{ region: string; data: ChannelTradingRecord[] }> = ({ region, data }) => {
  const detailChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailChartRef.current) return;
    const chart = echarts.init(detailChartRef.current);

    // 🛠️ FILTER OUT ZERO VALUES FOR THE INNER DIALOG CHART TOO
    const regionData = data.filter(
      (item) =>
        item.region_Name?.trim() === region.trim() &&
        (item.channel?.trim() === "DT" || item.channel?.trim() === "INTERNET") &&
        (item.totalClients || 0) > 0
    );

    const dataForChart = regionData.map((item) => ({
      value: item.totalClients,
      name: item.channel?.trim() || "Unknown",
      itemStyle: { color: item.channel?.trim() === "DT" ? "#FF7F50" : "#00BFFF" },
    }));

    const option = {
      tooltip: {
        trigger: "item",
        formatter: (params: any) => `${params.name}-${params.value.toLocaleString()}(${params.percent.toFixed(0)}%)`,
      },
      legend: { orient: 'vertical', left: 'left', top: 'top', textStyle: { color: '#ffffff' } },
      series: [{
        type: "pie",
        radius: ['20%', '80%'],
        center: ['55%', '55%'],
        minAngle: 15,
        label: {
          show: true,
          position: "inside",
          color: "black",
          fontSize: 14,
          formatter: (params: any) => `${params.value.toLocaleString()}\n(${params.percent.toFixed(0)}%)`,
        },
        data: dataForChart,
      }],
    };

    chart.setOption(option);
    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(detailChartRef.current);
    return () => { resizeObserver.disconnect(); chart.dispose(); };
  }, [region, data]);

  return <div ref={detailChartRef} style={{ width: "100%", height: "300px" }} />;
};

const RegionWiseClientChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;
    const chart = echarts.init(chartRef.current!);

    // 🛠️ FILTER OUT ZERO VALUES HERE
    const filteredData = data.filter(
      (item) => item.channel?.trim() === "TOTAL (DT+INTERNET)" && (item.totalClients || 0) > 0
    );

    const dataForChart = filteredData.map((item, index) => {
      const regionName = item.region_Name || "Unknown";
      return {
        value: item.totalClients,
        name: regionName,
        itemStyle: { color: getRegionColor(regionName, index) },
      };
    });

    const option = {
      tooltip: {
        trigger: "item",
        formatter: (params: any) => `${params.name}-${params.value.toLocaleString()}(${params.percent.toFixed(0)}%)`,
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
          formatter: (params: any) => `${params.value.toLocaleString()}\n(${params.percent.toFixed(0)}%)`,
        },
        data: dataForChart,
      }],
    };

    chart.setOption(option);
    chart.on("click", (params: any) => { if (params.name) setSelectedRegion(params.name); });
    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(chartRef.current!);
    return () => { resizeObserver.disconnect(); chart.dispose(); };
  }, [data]);

  const totalClient = data
    ? data
        .filter((item) => item.channel?.trim() === "TOTAL (DT+INTERNET)")
        .reduce((sum, item) => sum + (item.totalClients || 0), 0)
    : 0;

  return (
    <>
      <Card className="drop-shadow-md bg-[#033e4a] h-full flex flex-col justify-between cursor-pointer">
        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
          <CardTitle className="text-white text-md text-lg">
            Region Wise Client Participation - {totalClient.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-2 flex-grow flex items-center justify-center">
          <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
        </CardContent>
      </Card>

      <Dialog open={selectedRegion !== null} onOpenChange={() => setSelectedRegion(null)}>
        <DialogContent className="bg-[#033e4a] text-white border-teal-800 max-w-md p-0 overflow-hidden rounded-lg">
          <div className="p-6 flex items-center justify-center">
            {selectedRegion && <RegionDetailChart region={selectedRegion} data={data} />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegionWiseClientChart;