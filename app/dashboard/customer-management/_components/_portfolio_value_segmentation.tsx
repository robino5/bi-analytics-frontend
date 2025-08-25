import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  PortfolioValueSegmentation,
  PortfolioValueSegmentationDetails,
} from "@/types/customerManagement";
import { numberToMillionsString } from "@/lib/utils";
import * as echarts from "echarts";

interface PieChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: PortfolioValueSegmentation[];
  details: PortfolioValueSegmentationDetails;
  colors: string[];
  colors2: string[];
}

export default function PortfolioValueSegmentationChart({
  title,
  subtitle,
  className,
  data,
  details,
  colors,
  colors2,
}: PieChartComponentProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.EChartsType | null>(null);

  const colorMap: Record<string, string> = {
    Retail: "#ff6b6b",
    Omnibus: "#1e90ff",
    "Busi. Aggregator": "#ffd166",
    Company:"#1dd1a1",
    Foreign: "#c200fb"
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const processedData = data.map((item) => ({
      ...item,
      formattedTurnover: numberToMillionsString(item.tpvTotal),
    }));

    const totals = data.reduce(
      (acc, item) => {
        acc.tpvLockQtyPercentage += item.tpvLockQtyPercentage;
        acc.tpvFreeQtyPercentage += item.tpvFreeQtyPercentage;
        return acc;
      },
      { tpvLockQtyPercentage: 0, tpvFreeQtyPercentage: 0 }
    );

    const comparisonData = [
      { name: "Free", value: totals.tpvFreeQtyPercentage },
      { name: "Lock", value: totals.tpvLockQtyPercentage },
    ];

    // Initialize ECharts instance
    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;

    const option = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      legend: [
        {
          orient: "horizontal",
          bottom: 0,
          left: "center",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
          },
          data: processedData.map((item) => item.customerCategory),
        },
        {
          orient: "horizontal",
          top: "30%",
          right: "9%",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
          },
          data: comparisonData.map((item) => item.name),
        },
      ],
      series: [
        {
          name: "Portfolio Segmentation",
          type: "pie",
          radius: ["10%", "60%"], 
          center: ["50%", "60%"], 
          data: processedData.map((item, index) => ({
            value: item.tpvTotal,
            name: item.customerCategory,
            itemStyle: {
              color: colorMap[item.customerCategory] || "#cccccc",
            },
          })),
          label: {
            formatter: (params: { value: number; name: any; percent: any }) =>
              `${params.name}\n${numberToMillionsString(params.value)} (${params.percent}%)`,
            color: "#ffffff",
            fontSize: 12,
            lineHeight: 16,
          },
          itemStyle: {
            borderRadius: 8, 
            borderColor: "#033e4a", 
            borderWidth: 2,
          },
        },
        {
          name: "Comparison",
          type: "pie",
          radius: ["10%", "20%"],
          center: ["80%", "25%"],
          startAngle: 180,
          endAngle: 360,
          data: comparisonData.map((item, index) => ({
            value: item.value,
            name: item.name,
            itemStyle: {
              color: colors2[index % colors2.length],
            },
          })),
          label: {
            position: "outside",
            formatter: (params: { value: number; name: any; percent: any }) =>
              `${params.name}\n${numberToMillionsString(params.value)} \n(${params.percent}%)`,
            color: "#ffffff",
            fontSize: 12,
            lineHeight: 16,
          },
        },
      ],
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chartInstance.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, colors, colors2]);

  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#033e4a]")}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          {title}-{numberToMillionsString(details.sumOfTpvTotal)}
        </CardTitle>
      </CardHeader>
      <CardContent style={{ height: "500px" }}>
        <div
          ref={chartRef}
          style={{ width: "100%", height: "100%" }}
        ></div>
      </CardContent>
    </Card>
  );
}
