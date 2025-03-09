import { FC, useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import { AiTwotoneAlert } from "react-icons/ai";
import { numberToMillionsString } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectorTurnoverBreakdown } from "@/app/dashboard/active-trading-codes/_components/_sector_turnover_berakdown";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";

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
  const chartInstanceRef = useRef<echarts.EChartsType | null>(null);

  const totalPrimary = data.reduce((acc, obj) => acc + obj.primaryValue, 0);
  const totalSecondary = data.reduce((acc, obj) => acc + obj.secondaryValue, 0);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      chartInstanceRef.current = chartInstance;

      const options = {
        grid: { left: "18%", right: "12%", top: "4%", bottom: "5%" },
        tooltip: {
          trigger: "item",
          formatter: (params: any) => {
            const { name, value, seriesName } = params;
            const total = seriesName === option.legendNames?.[0] ? totalPrimary : totalSecondary;
            const ratio = findRatio(value, total, 2);
            if (seriesName === (option.legendNames?.[1] || "LBSL")) {
              return `${name} (${seriesName}): ${numberToMillionsString(value)} (${params.data.secondaryPercent}%)`;
            }
            return `${name} (${seriesName}): ${numberToMillionsString(value)} (${ratio}%)`;
          },
        },
        legend: {
          show: true,
          top: "0%",
          left: "center",
          textStyle: { color: "#fff", fontSize: 12 },
          data: option.legendNames,
        },
        xAxis: {
          type: "value",
          axisLabel: {
            color: "#fff",
            formatter: (value: number) => `${findRatio(value, totalPrimary + totalSecondary, 0)}%`,
          },
        },
        yAxis: {
          type: "category",
          data: data.map((item) => item.name),
          inverse: true,
          axisLabel: {
            color: "#fff",
            formatter: (value: string) => (value.length > 15 ? value.replace(/(.{15})/g, "$1\n") : value),
          },
        },
        series: [
          {
            name: option.legendNames?.[0] || "DSE",
            type: "bar",
            data: data.map((item) => ({ value: item.primaryValue })),
            itemStyle: { color: option.barcolors?.[0] || "#c200fb" },
            label: {
              show: true,
              position: "right",
              color: "#fff",
              formatter: ({ value }: { value: number }) => `${numberToMillionsString(value)} (${findRatio(value, totalPrimary, 2)}%)`,
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
            label: {
              show: true,
              position: "right",
              color: "#fff",
              formatter: ({ value, data }: { value: number; data: any }) => `${numberToMillionsString(value)} (${data.secondaryPercent}%)`,
            },
          },
        ],
      };

      chartInstance.setOption(options);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data, option]);



  const calculatedHeight = Math.max(data.length * 32, 300);

  return <div ref={chartRef} style={{ height: calculatedHeight }} />;
};

const BarChartHorizontalComparisonExchange: FC<{ data: BarData[]; options: BarOption; haveBreakdown?: boolean }> = ({ data, options, haveBreakdown }) => {
  const [selectedBar, setSelectedBar] = useState<BarData | null>(null);
  const chartInstanceRef = useRef<echarts.EChartsType | null>(null);

  const downloadImage = (type: "png" | "svg") => {
    if (chartInstanceRef.current) {
      const url = chartInstanceRef.current.getDataURL({ type });
      const link = document.createElement("a");
      link.href = url;
      link.download = `chart.${type}`;
      link.click();
    }
  };

  const downloadCSV = () => {
    const totalPrimary = data.reduce((acc, obj) => acc + obj.primaryValue, 0);
    const csvHeader = "Company,DSE Value,DSE %,LBSL Value,LBSL %\n";
    const csvRows = data.map(
      (item) =>
        `${item.name},${item.primaryValue},${findRatio(item.primaryValue, totalPrimary)}%,${item.secondaryValue},${item.secondaryPercent}%`
    );
    const csvContent = csvHeader + csvRows.join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dse_lbsl_companywise_turnover_comparison.csv";
    link.click();
  };
  return data.length ? (
    <>
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-transparent text-white px-2 py-0 rounded-md border-teal-500 hover:bg-transparent hover:border-teal-500 transition-all focus:outline-none focus:ring-0">
              <Download className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => downloadImage("png")}>
              Download PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadImage("svg")}>
              Download SVG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadCSV}>
              Download CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <BarChart data={data} option={options} setSelectedBar={setSelectedBar} haveBreakdown={haveBreakdown} />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden" id="open-dialog-sec-breakdown" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px] max-h-[900px] overflow-auto bg-[#0e5e6f]">
          <DialogHeader className="text-white">
            <DialogTitle>Sector Turnover Breakdown</DialogTitle>
          </DialogHeader>
          <DialogDescription className="p-4">{selectedBar ? <SectorTurnoverBreakdown data={selectedBar} /> : "No data selected."}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <div className="font-semibold text-lg text-gray-600 flex justify-center items-center">
      <AiTwotoneAlert className="mr-2 h-6 w-5" /> No data available
    </div>
  );
};

export default BarChartHorizontalComparisonExchange;
