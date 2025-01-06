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
                color: colors[index % colors.length],
                borderWidth: 2,
                borderColor: "#0e5e6f", 
              },
            })),
            label: {
              formatter: (params: { value: number; name: any; percent: any; }) => {
                const formattedValue = numberToMillionsString(params.value as number);
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
              borderColor: "#0e5e6f", 
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
        backgroundColor: "#0e5e6f", // Match your card's background
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
    <Card className={cn("w-full shadow-md", className, "bg-[#0e5e6f]")}>
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          {title}-{details.sumOfClients.toLocaleString()}
        </CardTitle>
      </CardHeader>
      
      <CardContent style={{ height: "500px" }}>
        <div
          ref={chartRef}
          style={{ width: "100%", height: "100%", backgroundColor: "#0e5e6f" }}
        />
      </CardContent>
    </Card>
  );
}
