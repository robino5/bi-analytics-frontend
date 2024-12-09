import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BranchWiseClintsNumber,
  BranchWiseClintsNumberDetails,
} from "@/types/customerManagement";
import { branchWiseClintsNumber } from "./columns";
import { DialogDataTable } from "./data-table";
import * as echarts from "echarts";

interface ComposedChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: BranchWiseClintsNumber[];
  details: BranchWiseClintsNumberDetails;
}

export default function BranchWiseClientsNumberChart({
  title,
  subtitle,
  className,
  data,
  details,
}: ComposedChartComponentProps) {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ['Total Clients','Total Client Percentage'],
        textStyle: { color: '#fff' },
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.branchName),
        axisLabel: { color: '#fff', margin: 18,fontSize: 14, },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          axisLabel: { color: '#fff' },
          min: 0,
          max: 18000,
          interval: 3000,
        },
        {
          type: 'value',
          axisLabel: { color: '#fff' },
          min: 0,
          max: 30,
          interval: 5,
        },
      ],
      series: [
        {
          name: 'Total Clients',
          type: 'bar',
          barWidth: "80%",
          data: data.map(item => item.totalClients),
          label: {
            show: true,
            position: "insideTop",
            rotate: 90,
            color: "white",
            fontSize: 14,
            bottom:0
          },
          itemStyle: {
            color: '#f27373',
          },
          encode: {
            tooltip: ['value', 'percentage'],
          },
        },
        {
          name: 'Total Client Percentage',
          type: 'line',
          yAxisIndex: 1,
          data: data.map(item => item.totalClientPercentage),
          itemStyle: { color: '#1ac1d6' },
          lineStyle: { width: 2 },
        },
      ],
      dataZoom: [
        {
          type: "slider",
          height: 20,
          bottom: "5px",
          textStyle: { color: "#ffffff" },
        },
      ]
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [data, title, details]);

  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#0e5e6f]")}>
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">{title}-{details.sumOfClients.toLocaleString()}mn</CardTitle>
      </CardHeader>
      <div className="text-end mt-2 mr-2">
          <DialogDataTable
            columns={branchWiseClintsNumber}
            data={data}
            datafiltering={true}
            title={"Branch Wise Clients Number Data Table"}
            subtitle={"Showing data for branch wise clients number data table"}
          />
        </div>
      <CardContent style={{ height: "500px" }}>
        <div ref={chartRef} style={{ width: "100%", height: "100%" }}></div>
      </CardContent>
    </Card>
  );
}
