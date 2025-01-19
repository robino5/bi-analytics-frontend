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
  stroke: string;
  height?: number;
  barLabel?: boolean;
  legendName?: string;
  rotate?: number;
  title?:string
}

interface BarChartProps {
  data: BarData[];
  option: BarOption;
}

interface BarCharHorizonalProps {
  data: BarData[];
  options: BarOption;
}

const BarChartBiAxis: FC<BarCharHorizonalProps> = ({ data, options }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      chartInstanceRef.current = chartInstance;

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (params: any) => {
            let tooltipHtml = `<strong>${params[0].axisValue}</strong><br/>`;
            params.forEach((item: any) => {
              const value =
                item.seriesName === "Turnover"
                  ? numberToMillionsString(item.data)
                  : item.data;
              tooltipHtml += `${item.marker} ${item.seriesName}: ${value}<br/>`;
            });
            return tooltipHtml;
          },
        },
        legend: {
          data: ["Active Clients", "Turnover"],
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
        yAxis: [
          {
            type: "value",
            name: "Active Clients",
            nameTextStyle: {
              color: "white",
            },
            axisLabel: {
              color: "white",
              formatter: numberToMillionsString,
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "Turnover",
            nameTextStyle: {
              color: "white",
            },
            axisLabel: {
              color: "white",
              formatter: numberToMillionsString,
            },
          },
        ],
        series: [
          {
            name: "Active Clients",
            type: "bar",
            data: data.map((item) => item.activeClients),
            label: {
              show: true,
              rotate: options?.rotate,
              position: "top",
              color: "white",
            },
          },
          {
            name: "Turnover",
            type: "bar",
            data: data.map((item) => item.turnover),
            yAxisIndex: 1,
            label: {
              show: true,
              position: "top",
              color: "white",
              rotate: options?.rotate,
              formatter: (params: any) =>
                numberToMillionsString(params.value, true),
            },
          },
        ],
      };
      chartInstance.setOption(option);
      return () => {
        chartInstance.dispose();
      };
    }
  }, [data, options]);

  const handleDownloadChart = (format: "png" | "svg") => {
    if (chartInstanceRef.current) {
      const dataURL = chartInstanceRef.current.getDataURL({
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
      <Card className=" col-span-3 overflow-auto bg-[#0e5e6f]">
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg grid grid-cols-2 items-center">
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
              <DropdownMenuItem onClick={() => handleDownloadChart("png")}>
                Download PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadChart("svg")}>
                Download SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownloadCSV}>
                Download CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
      <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
      </CardContent>
      </Card>
  );
};

export default BarChartBiAxis;
