"use client";

import { FC } from "react";
import {
  formatDate,
  numberFormatter,
  numberToMillionsString,
} from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { saveAs } from "file-saver";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface BarData {
  tradingDate: string;
  activeClients: string | number;
  turnover: string | number;
}

interface BarOption {
  dataKey: string;
  valueKeyA: string;
  valueKeyB: string;
  fill: string;
  fill2: string;
  stroke: string;
  height?: number;
  barLabel?: boolean;
  legendName?: string;
  rotate?: number;
  title?: string;
  cardColor?: string;
}

interface BarCharHorizonalProps {
  data: BarData[];
  options: BarOption;
}

const BarChartBiAxis: FC<BarCharHorizonalProps> = ({ data, options }) => {
  const activeClientsChartRef = useRef<HTMLDivElement>(null);
  const turnoverChartRef = useRef<HTMLDivElement>(null);
  const activeClientsChartInstanceRef = useRef<echarts.ECharts | null>(null);
  const turnoverChartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (activeClientsChartRef.current) {
      const chartInstance = echarts.init(activeClientsChartRef.current);
      activeClientsChartInstanceRef.current = chartInstance;

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (params: any) => {
            let tooltipHtml = `<strong>${params[0].axisValue}</strong><br/>`;
            params.forEach((item: any) => {
              tooltipHtml += `${item.marker} ${item.seriesName}: ${item.data.toLocaleString()}<br/>`;
            });
            return tooltipHtml;
          },
        },
        legend: {
          data: ["Active Clients"],
          textStyle: { color: "white" },
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.tradingDate),
          axisLabel: {
            color: "white",
            rotate: 35,
          },
        },
        yAxis: {
          type: "value",
          name: "Turnover",
          nameTextStyle: {
            color: "white",
          },
          axisLabel: {
            color: "white",
            formatter: function (value: number) {
              let formatted = numberToMillionsString(value, 0);
              if (typeof formatted === "string") {
                formatted = formatted.replace(/\.0+$/, "");
              }
              return formatted;
            },
          },
          splitLine: {
            show: true,
          },
        },
        series: [
          {
            name: "Active Clients",
            type: "bar",
            data: data.map((item) => item.activeClients),
            itemStyle: {
              color: options.fill,
            },
            label: {
              show: true,
              fontSize: 14,
              position: "top",
              color: "white",
              formatter: (params: any) => {
                return params.value.toLocaleString(); // 👈 format here
              },
            },
          },
        ],
      };
      chartInstance.setOption(option);
    }

    if (turnoverChartRef.current) {
      const chartInstance = echarts.init(turnoverChartRef.current);
      turnoverChartInstanceRef.current = chartInstance;

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (params: any) => {
            let tooltipHtml = `<strong>${params[0].axisValue}</strong><br/>`;
            params.forEach((item: any) => {
              tooltipHtml += `${item.marker} ${item.seriesName}: ${numberToMillionsString(
                item.data
              )}<br/>`;
            });
            return tooltipHtml;
          },
        },
        legend: {
          data: ["Turnover"],
          textStyle: { color: "white" },
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.tradingDate),
          axisLabel: {
            color: "white",
            rotate: 35,
          },
        },
        yAxis: {
          type: "value",
          name: "Turnover",
          nameTextStyle: {
            color: "white",
          },
          axisLabel: {
            color: "white",
            formatter: function (value: number) {
              let formatted = numberToMillionsString(value, 0);
              if (typeof formatted === "string") {
                formatted = formatted.replace(/\.0+$/, "");
              }
              return formatted;
            },
          },
          splitLine: {
            show: true,
          },
        },
        series: [
          {
            name: "Turnover",
            type: "bar",
            data: data.map((item) => item.turnover),
            itemStyle: {
              color: options.fill2,
            },
            label: {
              show: true,
              position: "top",
              color: "white",
              fontSize: 14,
              formatter: (params: any) =>
                numberToMillionsString(params.value),
            },
          },
        ],
      };
      chartInstance.setOption(option);
    }

    return () => {
      if (activeClientsChartInstanceRef.current) {
        activeClientsChartInstanceRef.current.dispose();
      }
      if (turnoverChartInstanceRef.current) {
        turnoverChartInstanceRef.current.dispose();
      }
    };
  }, [data, options]);

  const handleDownloadChart = (format: "png" | "svg", chartRef: React.RefObject<echarts.ECharts | null>) => {
    if (chartRef.current) {
      const dataURL = chartRef.current.getDataURL({
        type: format,
        backgroundColor: "#000", // Adjust background color if needed
        pixelRatio: 2, // Optional: Increase resolution for PNG
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `chart.${format}`;
      link.click();
    }
  };

  const handleDownloadCSV = () => {
    const csvRows = [
      ["Trading Date", "Active Clients", "Turnover"], // Header row
      ...data.map((item) => [
        item.tradingDate,
        item.activeClients,
        item.turnover,
      ]),
    ];

    const csvContent = csvRows
      .map((row) => row.map(String).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chart_data.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className={`col-span-3 overflow-auto ${options?.cardColor}`}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg grid grid-cols-2 items-center">
        <div className="text-white text-lg font-semibold">{options?.title}</div>
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-transparent text-white px-2 py-0 rounded-md border-teal-500 hover:bg-transparent hover:border-teal-500 transition-all focus:outline-none focus:ring-0"
              >
                <Download className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDownloadChart("png", activeClientsChartInstanceRef)}>
                Download Active Clients PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadChart("svg", activeClientsChartInstanceRef)}>
                Download Active Clients SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadChart("png", turnoverChartInstanceRef)}>
                Download Turnover PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadChart("svg", turnoverChartInstanceRef)}>
                Download Turnover SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadCSV}>
                Download CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={activeClientsChartRef} style={{ width: "100%", height: "250px" }} />
        <div ref={turnoverChartRef} style={{ width: "100%", height: "250px" }} />
      </CardContent>
    </Card>
  );
};

export default BarChartBiAxis;