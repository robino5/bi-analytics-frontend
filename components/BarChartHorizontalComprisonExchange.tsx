import { FC, useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import { AiTwotoneAlert } from "react-icons/ai";
import { numberToMillionsString } from "@/lib/utils";
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
import { SectorTurnoverBreakdown } from "@/app/dashboard/active-trading-codes/_components/_sector_turnover_berakdown";
import { Button } from "./ui/button";

interface BarData {
  name: string;
  primaryValue: number;
  secondaryValue: number;
  secondaryPercent: number;
}

interface BarOption {
  legendNames?: string[];
  barcolors?: string[];
}

interface BarChartProps {
  data: BarData[];
  option: BarOption;
  setSelectedBar: (data: BarData) => void;
  haveBreakdown?: boolean;
}

const findRatio = (value: number, totalAmount: number, precision: number = 2) => {
  return ((value / totalAmount) * 100).toFixed(precision);
};

const BarChart: FC<BarChartProps> = ({ data, option, setSelectedBar, haveBreakdown }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const totalPrimary = data.reduce((acc, obj) => acc + obj.primaryValue, 0);
  const totalSecondary = data.reduce((acc, obj) => acc + obj.secondaryValue, 0);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const options = {
        grid: {
          left: "18%",
          right: "12%",
          top: "4%",
          bottom: "5%",
        },
        tooltip: {
          trigger: "item",
          formatter: (params: any) => {
            const { name, value, seriesName } = params;
            const total = seriesName === option.legendNames?.[0] ? totalPrimary : totalSecondary;
            const ratio = findRatio(value, total, 2);

            // If it's the secondary series, show the secondaryPercent
            if (seriesName === (option.legendNames?.[1] || "LBSL")) {
              return `${name} (${seriesName}): ${numberToMillionsString(value)} (${params.data.secondaryPercent}%)`;
            }

            return `${name} (${seriesName}): ${numberToMillionsString(value)} (${ratio}%)`;
          },
          backgroundColor: "#dee3e0",
          padding: [10, 20],
          borderRadius: 10,
          textStyle: {
            color: "#000",
            fontSize: 12,
            fontFamily: "sans-serif",
          },
        },

        legend: {
          show: true,
          top: "0%",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
          data: option.legendNames,
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#565656",
            },
          },
          axisTick: { show: false },
          axisLabel: {
            color: "#fff",
            fontSize: 12,
            formatter: (value: number) => `${findRatio(value, totalPrimary + totalSecondary, 0)}%`,
          },
        },
        yAxis: {
          type: "category",
          data: data.map((item) => item.name),
          inverse: true,
          axisLine: {
            lineStyle: {
              color: "#565656",
            },
          },
          axisTick: { show: false },
          axisLabel: {
            color: "#fff",
            fontSize: 12,
            formatter: (value: string) => (value.length > 15 ? value.replace(/(.{15})/g, "$1\n") : value),
          },
        },
        series: [
          {
            name: option.legendNames?.[0] || "DSE",
            type: "bar",
            data: data.map((item) => ({
              value: item.primaryValue,
            })),
            itemStyle: { color: option.barcolors?.[0] || "#c200fb" },
            barWidth: 10,
            label: {
              show: true,
              position: "right",
              color: "#fff",
              fontSize: 12,
              formatter: ({ value }: { value: number }) => {
                const percent = findRatio(value, totalPrimary, 2);
                return `${numberToMillionsString(value)} (${percent}%)`;
              },
            },
          },
          {
            name: option.legendNames?.[1] || "LBSL",
            type: "bar",
            data: data.map((item) => ({
              value: item.secondaryValue,
              secondaryPercent: item.secondaryPercent,  
            })),
            itemStyle: { color: option.barcolors?.[1] || "#ff7a56" },
            barWidth: 10,
            label: {
              show: true,
              position: "right",
              color: "#fff",
              fontSize: 12,
              formatter: ({ value, data }: { value: number; data: any }) => {
                const secondaryPercent = data.secondaryPercent; 
                return `${numberToMillionsString(value)} (${secondaryPercent}%)`;
              },
            },
          },
        ],

      };

      chartInstance.setOption(options);

      // Event listener for clicking on bars
      chartInstance.on("click", (params: any) => {
        if (haveBreakdown === true) {
          if (params.seriesName === (option.legendNames?.[1] || "LBSL")) {
            const clickedData = data[params.dataIndex];
            setSelectedBar(clickedData);
            document.getElementById("open-dialog-sec-breakdown")?.click();
          }
        }
      });

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data, option]);

  const calculatedHeight = Math.max(data.length * 32, 300);
  return <div ref={chartRef} style={{ height: calculatedHeight, width: "100%" }} />;
};

interface BarChartHorizontalComprisonExchangeProps {
  data: BarData[];
  options: BarOption;
  haveBreakdown?: boolean;
}

const BarChartHorizontalComprisonExchange: FC<BarChartHorizontalComprisonExchangeProps> = ({ data, options, haveBreakdown }) => {
  console.log("props data ", data);
  const [selectedBar, setSelectedBar] = useState<BarData | null>(null);
  return data.length ? (
    <>
      <BarChart data={data} option={options} setSelectedBar={setSelectedBar} haveBreakdown={haveBreakdown} />

      {/* Dialog Component */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden" id="open-dialog-sec-breakdown" />
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
  ) : (
    <div className="font-semibold text-lg text-gray-600 flex justify-center items-center">
      <AiTwotoneAlert className="mr-2 h-6 w-5" /> No data available
    </div>
  );
};

export default BarChartHorizontalComprisonExchange;

