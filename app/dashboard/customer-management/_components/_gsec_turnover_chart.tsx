import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, numberToMillionsString } from "@/lib/utils";
import { GsecTurnoverDetails, GsecTurnover } from "@/types/customerManagement";

interface GsecTurnoverChartProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: GsecTurnover[];
  details: GsecTurnoverDetails;
}

export default function GsecTurnoverChart({
  title,
  subtitle,
  className,
  data,
  details,
}: GsecTurnoverChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const tradingDates = data.map((item) => item.tradingDate);
      const turnoverValues = data.map((item) => item.turnoverGsec);

      const options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: (params: any) => {
            const tooltipItems = params.map(
              (item: any) =>
                `${item.marker} ${item.seriesName}: ${numberToMillionsString(
                  item.value
                )}`
            );
            return `${params[0].axisValue}<br/>${tooltipItems.join("<br/>")}`;
          },
        },
        // legend: {
        //   show: true,
        //   textStyle: {
        //     color: "#fff",
        //   },
        // },
        xAxis: {
          type: "category",
          data: tradingDates,
          axisLabel: {
            color: "#fff",
            rotate: 35,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: (value: number) => `${(value / 1_000_000).toFixed(2)}M`,
            color: "#fff",
          },
        },
        series: [
          {
            name: "Turnover Gsec",
            type: "bar",
            data: turnoverValues,
            itemStyle: {
              color: "#4caf50",
            },
            barWidth: "60%",
            label: {
              show: true,
              position: "top",
              color: "#fff",
              formatter: (params: any) =>
                numberToMillionsString(params.value),
            },
          },
        ],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        backgroundColor: "#033e4a",
      };

      chartInstance.setOption(options);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data, subtitle]);

  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#033e4a]")}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          {title} - {numberToMillionsString(details.sumOfTurnoverGsec)}
        </CardTitle>
      </CardHeader>
      <CardContent style={{ height: "500px" }}>
        <div ref={chartRef} style={{ height: "100%" }}></div>
      </CardContent>
    </Card>
  );
}
