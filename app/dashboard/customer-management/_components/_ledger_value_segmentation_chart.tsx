import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  LedgerValueSegmentation,
  LedgerValueSegmentationDetails,
} from "@/types/customerManagement";
import { numberToMillionsString } from "@/lib/utils";

interface PieChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: LedgerValueSegmentation[];
  details: LedgerValueSegmentationDetails;
  colors: string[];
}

export default function LedgerValueSegmentationChart({
  title,
  subtitle,
  className,
  data,
  details,
  colors,
}: PieChartComponentProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  const colorMap: Record<string, string> = {
    Retail: "#ff6b6b",
    Omnibus: "#1e90ff",
    "Busi. Aggregator": "#ffd166",
    Company:"#1dd1a1",
    Foreign: "#c200fb"
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const processedData = data.map((item, index) => ({
        value: item.margin < 0 ? Math.abs(item.margin) : item.margin,
        name: `${item.customerCategory}`,
        formattedTurnover: numberToMillionsString(item.margin),
        itemStyle: {
          color: colorMap[item.customerCategory] || "#cccccc",
        },
        normalizedMargin: Math.abs(item.margin),
      }));

      const option = {
        tooltip: {
          trigger: "item",
          formatter: (params: { value: number; name: any; percent: any; }) =>
            `${params.name}<br/>-${numberToMillionsString(params.value)} (${params.percent}%)`,
        },
        legend: {
          orient: "horizontal",
          bottom: 0,
          left: "center",
          textStyle: {
            color: "#ffffff", 
            fontSize: 14,
          }
        },
        series: [
          {
            name: "Ledger Value Segmentation",
            type: "pie",
            radius: ["10%", "60%"],
            center: ["50%", "50%"],
            data: processedData,
            label: {
              formatter: (params: { value: number; name: any; percent: any; }) =>
                `${params.name}\n-${numberToMillionsString(params.value)} (${params.percent}%)`,
              color: "#ffffff",
              fontSize: 12,
              lineHeight: 16,
            },
            labelLine: {
              lineStyle: {
                color: "#ffffff",
              },
            },
            itemStyle: {
              borderRadius: 8, 
              borderColor: "#033e4a",
              borderWidth: 2,
            },
            emphasis: {
              scale: true,
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            paddingAngle: 5, // Padding between sections
          },
        ],
        backgroundColor: "#033e4a", // Match your card's background
      };

      chart.setOption(option);
      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chart.dispose();
      };
    }
  }, [data, colors]);

  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#033e4a]")}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          {title} - ({numberToMillionsString(details.sumOfMargin)})
        </CardTitle>
      </CardHeader>
      <CardContent style={{ height: "500px" }}>
        <div
          ref={chartRef}
          style={{ width: "100%", height: "100%", backgroundColor: "#033e4a" }}
        />
      </CardContent>
    </Card>
  );
}
