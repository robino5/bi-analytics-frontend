import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, numberToMillionsString } from "@/lib/utils";
import { GsecTurnoverComparison, GsecTurnoverComparisonDetails } from "@/types/customerManagement";

interface GsecTurnoverComparisonComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: GsecTurnoverComparison[];
  details: GsecTurnoverComparisonDetails;
}

export default function GsecTurnoverComparisonChart({
  title,
  subtitle,
  className,
  data,
  details,
}: GsecTurnoverComparisonComponentProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
  
      const tradingYear = data.map((item) => item.year);
      const turnoverGsecValues = data.map((item) => item.turnoverGsec);
      const turnoverValues = data.map((item) => item.turnover);
  
      const options = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: (params: any) => {
            const tooltipItems = params.map((item: any) => {
              const percentage =
                item.seriesName === "Turnover Gsec"
                  ? (item.value / turnoverValues[item.dataIndex]) * 100 || 0
                  : (item.value /
                      (turnoverValues[item.dataIndex] + turnoverGsecValues[item.dataIndex])) *
                      100 || 0;
              return `${item.marker} ${item.seriesName}: ${numberToMillionsString(
                item.value
              )} (${percentage.toFixed(2)}%)`;
            });
            return `${params[0].axisValue}<br/>${tooltipItems.join("<br/>")}`;
          },
        },
        legend: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: {
          type: "category",
          data: tradingYear,
          axisLabel: {
            color: "#fff",
            fontSize: 16,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: (value: number) => `${numberToMillionsString(value)}M`,
            color: "#fff",
          },
        },
        series: [
          {
            name: "Turnover Gsec",
            type: "bar",
            data: turnoverGsecValues,
            itemStyle: {
              color: "#00CCDD",
            },
            barWidth: "40%",
            label: {
              show: true,
              position: "top",
              formatter: (params: any) => {
                const percentage =
                  (params.value / turnoverValues[params.dataIndex]) * 100 || 0;
                return `${numberToMillionsString(params.value)}\n(${percentage.toFixed(2)}%)`;
              },
              color: "#fff",
              fontSize: 12,
            },
          },
          {
            name: "Turnover",
            type: "bar",
            data: turnoverValues,
            itemStyle: {
              color: "#ED3EF7",
            },
            barWidth: "40%",
            label: {
              show: true,
              position: "top",
              formatter: (params: any) => {
                const percentage =
                  (params.value /
                    (turnoverValues[params.dataIndex] + turnoverGsecValues[params.dataIndex])) *
                    100 || 0;
                return `${numberToMillionsString(params.value)}\n(${percentage.toFixed(2)}%)`;
              },
              color: "#fff",
              fontSize: 12,
            },
          },
        ],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        backgroundColor: "#0e5e6f",
      };
  
      chartInstance.setOption(options);
  
      return () => {
        chartInstance.dispose();
      };
    }
  }, [data]);
  

  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#0e5e6f]")}>
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">{`${title}
        -Turnover-${numberToMillionsString(details.sumOfTurnover)}
         (${((details.sumOfTurnover / (details.sumOfTurnoverGsec+details.sumOfTurnover)) * 100).toFixed(2)}%)
          And`} <span className="text-red-700 font-bold">{`GSEC-${numberToMillionsString(details.sumOfTurnoverGsec)}(${((details.sumOfTurnoverGsec / details.sumOfTurnover) * 100).toFixed(2)}%)`}</span></CardTitle>
      </CardHeader>
      <CardContent style={{ height: "500px" }}>
        <div ref={chartRef} style={{ height: "100%" }}></div>
      </CardContent>
    </Card>
  );
}
