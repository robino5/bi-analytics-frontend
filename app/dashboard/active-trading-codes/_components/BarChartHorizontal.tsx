import React, { FC, useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AiTwotoneAlert } from "react-icons/ai";
import { SectorTurnoverBreakdown } from "./_sector_turnover_berakdown";
import { numberToMillionsString } from "@/lib/utils";

interface BarData {
  name: string;
  value: number | string;
}

interface BarChartProps {
  data: BarData[];
  option: {
    height?: number;
    legendName?: string;
    barLabel?: boolean;
  };
  onClick?: (data: BarData) => void;
}

const LABEL_TICK_FONT_SIZE = 12;
const colorArray = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336"];

const findRatio = (value: string, total: number, precision = 2) => {
  return ((parseFloat(value) / total) * 100).toFixed(precision);
};


const BarChart: FC<BarChartProps> = ({ data, option, onClick }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const totalAmount = data.reduce((acc, obj) => acc + parseFloat(obj.value as string), 0);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const options = {
        animation: false,
        grid: { left: "18%", right: "12%", top: "5%", bottom: "5%" },
        tooltip: {
          trigger: "item",
          formatter: (params: any) => {
            const { name, value } = params.data;
            const ratio = findRatio(value, totalAmount, 0);
            return `${name}: ${numberToMillionsString(value)} (${ratio}%)`;
          },
          backgroundColor: "#dee3e0",
          padding: [10, 20],
          borderRadius: 10,
          textStyle: { color: "#000", fontSize: 12, fontFamily: "sans-serif" },
        },
        xAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#565656" } },
          axisTick: { show: false },
          axisLabel: {
            color: "#fff",
            fontSize: 12,
            formatter: (value: number) => `${findRatio(value.toString(), totalAmount, 0)}%`,
          },
        },
        yAxis: {
          type: "category",
          data: data.map((item) => item.name),
          inverse: true,
          axisLine: { lineStyle: { color: "#565656" } },
          axisTick: { show: false },
          axisLabel: {
            color: "#fff",
            fontSize: 12,
            formatter: (value: string) => (value.length > 15 ? value.replace(/(.{15})/g, "$1\n") : value),
          },
        },
        series: [
          {
            type: "bar",
            data: data.map((item, index) => ({
              ...item,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: colorArray[index % colorArray.length] + "66" },
                  { offset: 1, color: colorArray[index % colorArray.length] },
                ]),
              },
            })),
            name: option.legendName || "Data",
            barWidth: 20,
            label: {
              show: option.barLabel,
              position: "right",
              formatter: (params: any) =>
                `${numberToMillionsString(params.value)} (${findRatio(params.value, totalAmount, 0)}%)`,
              fontSize: LABEL_TICK_FONT_SIZE,
              color: "#fff",
            },
          },
        ],
      };

      chartInstance.setOption(options);
      chartInstance.on("click", (params: any) => {
        if (onClick) {
          onClick(params.data);
        }
      });

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data, option, onClick]);

  return <div ref={chartRef} style={{ height: option?.height ?? 200, width: "100%" }} />;
};

const BarChartHorizontal: FC<{ data: BarData[]; options: BarChartProps["option"] }> = ({ data, options }) => {
  const [selectedBar, setSelectedBar] = useState<BarData | null>(null);

  const handleBarClick = (barData: BarData) => {
    setSelectedBar(barData);
    document.getElementById("open-dialog")?.click();
  };

  return (
    <>
      {data.length ? (
        <Card className="col-span-3 overflow-auto bg-[#0e5e6f]">
          <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg grid grid-cols-[4fr_1fr] items-center">
            <CardTitle className="text-white text-lg font-semibold py-2">
              LBSL Sector Wise Turnover (Mn)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={data} option={options} onClick={handleBarClick} />
          </CardContent>
        </Card>
      ) : (
        <Card className="col-span-3 overflow-auto bg-[#0e5e6f]">
        <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg grid grid-cols-[4fr_1fr] items-center">
          <CardTitle className="text-white text-lg font-semibold py-2">
            LBSL Sector Wise Turnover (Mn)
          </CardTitle>
        </CardHeader>
        <CardContent>
        <AiTwotoneAlert className="mr-2 h-6 w-5" /> No data available
        </CardContent>
      </Card>
      )}

      {/* Dialog Component */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden" id="open-dialog" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px] max-h-[900px] overflow-auto bg-[#0e5e6f]">
          {/* Gradient Header */}
          <DialogHeader className="text-white">
            <DialogTitle>Sector turnover Breakdown</DialogTitle>
          </DialogHeader>

          {/* Modal Content */}
          <DialogDescription className="p-4">
            {selectedBar ? <SectorTurnoverBreakdown data={selectedBar} /> : "No data selected."}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BarChartHorizontal;
