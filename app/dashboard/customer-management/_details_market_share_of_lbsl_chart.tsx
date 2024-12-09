import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as echarts from "echarts";
import { cn } from "@/lib/utils";
import { DetailsMarketShareLBSL, DetailsMarketShareLBSLDetails } from "@/types/customerManagement";
import { detailsMarketShareLBSL } from "./columns";
import { DialogDataTable } from "./data-table";

interface ChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: DetailsMarketShareLBSL[];
  details: DetailsMarketShareLBSLDetails;
}

export default function DetailsMarketShareLBSLChart({
  title,
  subtitle,
  className,
  data,
  details,
}: ChartComponentProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        top: "10%",
        bottom: "15%",
        left: "10%",
        right: "5%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: data.map((item) => item.month.slice(0, 3)),
          position: "bottom", 
          axisTick: { alignWithLabel: true },
          axisLabel: {
            color: "#ffffff",
            fontSize: 12,
            margin: 10, 
          },
          nameLocation: "middle",
          nameTextStyle: {
            color: "#ffffff",
          },
          nameGap: 30, 
        },
        {
          type: "category",
          data: data.map((item) => item.year),
          position: "bottom", 
          offset: 30, 
          axisLabel: {
            color: "#ffffff",
            fontSize: 12,
            margin: 10,
          },
          nameLocation: "middle",
          nameTextStyle: {
            color: "#ffffff",
          },
          nameGap: 50, 
        },
      ],
      
      
      yAxis: {
        type: "value",
        axisLabel: { color: "#ffffff" },
        splitLine: { lineStyle: { color: "#ffffff" } },
      },
      legend: {
        data: ["Turnover DSE", "Turnover LBSL"],
        textStyle: { color: "#ffffff" },
      },
      series: [
        {
          name: "Turnover DSE",
          type: "bar",
          data: data.map((item) => item.turnoverDse),
          barWidth: "40%",
          itemStyle: { color: "#ff7f50" },
          label: {
            show: true,
            position: "insideTop",
            rotate: 90,
            color: "white",
            fontSize: 12,
          },
        },
        {
          name: "Turnover LBSL",
          type: "bar",
          data: data.map((item) => item.turnoverLbsl),
          barWidth: "40%",
          itemStyle: { color: "#4db6ac" },
          label: {
            show: true,
            position: "insideTop",
            rotate: 90,
            color: "#white",
            fontSize: 12,
          },
        },
      ],
      dataZoom: [
        {
          type: "slider",
          start: 0,
          end: 100,
          height: 20,
          bottom: "5%",
          textStyle: { color: "#ffffff" },
        },
      ],
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [data]);

  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#0e5e6f]")}>
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">{title}</CardTitle>
      </CardHeader>
      <div className="text-end mt-2 mr-2">
          <DialogDataTable
            columns={detailsMarketShareLBSL}
            data={data}
            datafiltering={false}
            title={"Details Market Share of LBSL (Foreign) Data Table"}
            subtitle={
              "Showing data for details market share of LBSL (Foreign) data table"
            }
          />
        </div>
      <CardContent style={{ height: "500px" }}>
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
      </CardContent>
    </Card>
  );
}
