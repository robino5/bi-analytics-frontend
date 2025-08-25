import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ClientSegmentation,
  ClientSegmentationDetails,
} from "@/types/customerManagement";
import { numberToMillionsString } from "@/lib/utils";

interface PieChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: ClientSegmentation[];
  details: ClientSegmentationDetails;
  colors: string[];
}

export default function ClientSegmentationChart({
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
      const sortedData = [...data].sort(
        (a, b) => b.totalClients - a.totalClients
      );

      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          orient: "horizontal",
          bottom: 0,
          left: "center",
          textStyle: {
            color: "#ffffff", 
            fontSize: 14,
          },
        },
        series: [
          {
            name: "Client Segmentation",
            type: "pie",
            radius: ['10%', '60%'],
            center: ["50%", "50%"],
            startAngle: 10,
            data: sortedData.map((entry, index) => ({
              value: entry.totalClients,
              name: `${entry.customerCategory}`,
              itemStyle: {
                color: colorMap[entry.customerCategory] || "#cccccc",
                borderWidth: 2,
                borderColor: "#033e4a", 
              },
            })),
            label: {
              formatter: (params: { value: number; name: any; percent: any; }) => {
                const formattedValue = params.value;
                return `${params.name}\n${formattedValue} (${params.percent}%)`;
              },
              color: "#ffffff",
              fontSize: 12,
              lineHeight: 16,
            },
            labelLine: {
              show: true,
              length: 15, 
              length2: 10, 
              lineStyle: {
                width: 2, 
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
          },
        ],
        backgroundColor: "#033e4a", // Match your card's background
        responsive: true,
      };

      // Render the chart with responsive behavior
      const renderChart = () => {
        chart.resize();
        chart.setOption(option);
      };

      renderChart(); // Initial render
      window.addEventListener("resize", renderChart); // Handle responsiveness

      // Cleanup on component unmount
      return () => {
        window.removeEventListener("resize", renderChart);
        chart.dispose();
      };
    }
  }, [data, title, details, colors]);

  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#033e4a]")}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          {title}-{details.sumOfClients}
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
