"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as echarts from "echarts";
import { numberToMillionsString } from "@/lib/utils";
import { BarColors } from "@/components/ui/utils/constants";

const COLORS = [BarColors.purple,BarColors.light_blue];

interface IDataType {
  channel: string;
  totalClients: number;
  trades: number;
  totalTurnover: number;
}

type PropType = {
  title: string;
  dataKey: keyof IDataType; 
  data: IDataType[];
};

const PieChart = ({ title, data, dataKey }: PropType) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current!);

    const dataForChart = data.map((item, index) => ({
      value: item[dataKey],
      name: item.channel,
      itemStyle: {
        color: COLORS[index % COLORS.length],
      },
    }));

    const option = {
      title: {
        left: "center",
        textStyle: {
          color: "#fff",
          fontSize: 18,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: (params: any) => {
          const value =
            dataKey === "totalTurnover" ? numberToMillionsString(params.value) : params.value;
          return `${params.name} - ${value} (${(params.percent).toFixed(0)}%)`;
        },
      },
      legend: {
        orient: 'horizontal',  
        bottom: 0,             
        left: 'center',textStyle: {
          color: '#ffffff'  
        }      
      },
      series: [
        {
          name: title,
          type: "pie",
          radius: '80%',
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            color: "#fff",  // Moved outside textStyle
            fontSize: 14,   // Moved outside textStyle
            formatter: (params: any) => {
              const value =
                dataKey === "totalTurnover" ? numberToMillionsString(params.value) : params.value;
              return `${params.name}\n${value} (${(params.percent).toFixed(0)}%)`;
            },
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: dataForChart,
        },
      ],
    };

    chart.setOption(option);
    window.addEventListener("resize", () => {
      chart.resize();
    });

    return () => {
      chart.dispose();
    };
  }, [data, dataKey, title]);

  return (
    <Card className="drop-shadow-md bg-[#0e5e6f]">
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="mt-2">
        <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
      </CardContent>
    </Card>
  );
};

export default PieChart;
