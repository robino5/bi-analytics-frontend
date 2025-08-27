import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as echarts from "echarts";
import {
  BranchWiseNonPerformerClints,
  BranchWiseNonPerformerClintsDetails,
} from "@/types/customerManagement";
import { numberToMillionsString } from "@/lib/utils";
import { branchWiseNonPerformerClints } from "./columns";
import { DialogDataTable } from "./data-table";

interface ComposedChartComponentProps {
  title?: string;
  subtitle?: string;
  className?: string;
  data: BranchWiseNonPerformerClints[];
  details: BranchWiseNonPerformerClintsDetails;
}

export default function BranchWiseNonPerformerClientsChart({
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
        axisLabel: { color: '#fff',margin: 18,fontSize: 14,  },
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
        },
        {
          type: 'value',
          axisLabel: { color: '#fff' },
          splitLine: {
            show: false,
          },
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
             formatter: (params:any)=>{
              return params.value.toLocaleString()
            }
          },
          itemStyle: {
            color: '#B3426F',
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
          itemStyle: { color: '#03FDFC' },
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
    <Card className={cn("w-full shadow-md", className, "bg-[#033e4a]")}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">{title}-{details.sumOfClients.toLocaleString()}</CardTitle>
      </CardHeader>
      <div className="text-end mt-2 mr-2">
          <DialogDataTable
            columns={branchWiseNonPerformerClints}
            data={data}
            datafiltering={true}
            title={"Non Performer Clients As on Data Table"}
            subtitle={"Showing data for non performer clients as on data table"}
          />
        </div>
      <CardContent style={{ height: "500px" }}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
      </CardContent>
    </Card>
  );
}
