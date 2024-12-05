"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { saveAs } from "file-saver";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  BarColors,
  LABEL_TICK_FONT_SIZE,
  TICK_COLOR,
  TOOLTIP_BACKGROUND,
} from "@/components/ui/utils/constants";
import { numberToMillionsString } from "@/lib/utils";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type StackChartPropType = {
  title: string;
  xDataKey: string;
  dataKeyA: string;
  dataKeyB: string;
  data: any[];
};

interface CustomTooltipProps {
  formatter: (params: any) => string;
}

const CustomTooltip = ({ formatter }: CustomTooltipProps) => {
  return {
    trigger: "item",
    formatter: (params: any) => {
      return params.seriesName + " : " + numberToMillionsString(params.value);
    },
  };
};

const StackBarChart = ({
  title,
  xDataKey,
  dataKeyA,
  dataKeyB,
  data,
}: StackChartPropType) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const exportChart = (format: "png" | "svg") => {
    if (chartRef.current) {
      const chartInstance = echarts.getInstanceByDom(chartRef.current);
      if (chartInstance) {
        const url = chartInstance.getDataURL({
          type: format,
          backgroundColor: "#0e5e6f",
        });
        const link = document.createElement("a");
        link.href = url;
        link.download = `chart.${format}`;
        link.click();
      }
    }
  };

  const exportCSV = () => {
    const csvRows = [];
    csvRows.push("Category,DT,INTERNET");
    data.forEach((item) => {
      csvRows.push(
        `${item[xDataKey]},${item[dataKeyA]},${item[dataKeyB]}`
      );
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "chart-data.csv");
  };

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current as HTMLDivElement);

    const chartOptions = {
      title: {
        textStyle: {
          color: "white",
          fontSize: 16,
        },
      },
      tooltip: CustomTooltip({
        formatter: (params) => `${params.name}: ${params.value}%`,
      }),
      legend: {
        data: ["DT", "INTERNET"],
        textStyle: {
          color: "white",
        },
        orient: "horizontal",
        bottom: 0,
        itemGap: 30,
        itemWidth: 20,
        itemHeight: 10,
      },
      xAxis: {
        type: "category",
        data: data.map((item) => item[xDataKey]),
        axisLabel: {
          color: "white",
          rotate: 35,
          fontSize: 12,
        },
        axisLine: {
          lineStyle: {
            color: TICK_COLOR,
          },
        },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        axisLabel: {
          formatter: "{value}%",
          color: "white",
          fontSize: LABEL_TICK_FONT_SIZE,
        },
        axisLine: {
          lineStyle: {
            color: TICK_COLOR,
          },
        },
      },
      series: [
        {
          name: "DT",
          type: "bar",
          stack: "total",
          data: data.map((item) => item[dataKeyA]),
          itemStyle: {
            color: BarColors.purple,
          },
          label: {
            show: true,
            position: "inside",
            formatter: "{c}%",
            color: "white",
            align: "center",
            verticalAlign: "middle",
          },
        },
        {
          name: "INTERNET",
          type: "bar",
          stack: "total",
          data: data.map((item) => item[dataKeyB]),
          itemStyle: {
            color: BarColors.light_blue,
          },
          label: {
            show: true,
            position: "inside",
            formatter: "{c}%",
            color: "white",
            align: "center",
            verticalAlign: "middle",
          },
        },
      ],
    };

    chartInstance.setOption(chartOptions);
    window.addEventListener("resize", () => chartInstance.resize());

    return () => {
      window.removeEventListener("resize", () => chartInstance.resize());
      chartInstance.dispose();
    };
  }, [data, title, xDataKey, dataKeyA, dataKeyB]);

  return (
    <Card className="bg-[#0e5e6f]">
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg grid grid-cols-2 items-center">
        <div className="text-white text-lg font-semibold">{title}</div>
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
              <DropdownMenuItem onClick={() => exportChart("png")}>
                Download PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportChart("svg")}>
                Download SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportCSV}>
                Download CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>


      <CardContent>
        <div ref={chartRef} style={{ width: "100%", height: 330 }} />
      </CardContent>
    </Card>


  );
};

export default StackBarChart;
