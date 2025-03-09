import { FC, useRef, useEffect } from "react";
import * as echarts from "echarts";
import { AiTwotoneAlert } from "react-icons/ai";
import { numberToMillionsString } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface BarData {
  name: string;
  value: number; // Total (buy + sell)
  buy: number;
  sell: number;
}

interface BarOption {
  dataKey: string;
  valueKey: string;
  fill: string;
  stroke: string;
  height?: number;
  barLabel?: boolean;
  legendName?: string;
}

interface BarChartProps {
  data: BarData[];
  option: BarOption;
  colorArray: string[]; 
}

const findRatio = (value: number, total: number, precision: number = 0) => {
  return Math.round((value / total) * 100); 
};

const BarChart: FC<BarChartProps> = ({ data, option, colorArray }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const totalAmount = data.reduce((acc, obj) => acc + obj.buy + obj.sell, 0);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const options = {
        grid: { left: "18%", right: "12%", top: "0%", bottom: "0%" },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          formatter: (params: any[]) => {
            const item = data.find(d => d.name === params[0].name);
            if (!item) return "";
        
            const buy = params.find(p => p.seriesName === "Buy");
            const sell = params.find(p => p.seriesName === "Sell");
        
            const total = item.buy + item.sell;
            const totalPercentage = Math.round((total / totalAmount) * 100); 
        
            let result = `<b>${item.name}</b><br/>`;
        
            // Show Buy section
            if (buy) {
              const buyPercentage = Math.round((item.buy / total) * 100);
              result += `
                <span style="display:inline-block;width:10px;height:10px;background:${colorArray[0]};margin-right:5px;"></span>
                Buy: ${numberToMillionsString(item.buy)} (${buyPercentage}%)
                <br/>
              `;
            }
        
            // Show Sell section
            if (sell) {
              const sellPercentage = Math.round((item.sell / total) * 100);
              result += `
                <span style="display:inline-block;width:10px;height:10px;background:${colorArray[1]};margin-right:5px;"></span>
                Sell: ${numberToMillionsString(item.sell)} (${sellPercentage}%)
                <br/>
              `;
            }
            result += `
              <b>Total: ${numberToMillionsString(total)}</b> (${totalPercentage}%)
              <br/>
            `;
        
            return result.trim(); 
          },
        },        
        xAxis: {
          type: "value",
          axisLabel: {
            color: "#fff",
            formatter: (value: number) => `${findRatio(value, totalAmount, 0)}%`,
          },
          axisLine: { lineStyle: { color: "#565656" } },
          splitLine: { show: true },
        },
        yAxis: {
          type: "category",
          data: data.map((item) => item.name),
          inverse: true,
          axisLabel: {
            color: "#fff",
            formatter: (value: string) => value,
          },
          axisLine: { lineStyle: { color: "#565656" } },
        },
        series: [
          {
              name: "Buy",
              type: "bar",
              stack: "total",
              barWidth: 20,
              label: {
                  show: true,
                  position: "inside",
                  color: "#fff",
                  formatter: (params: any) => {
                      const buyPercentage = findRatio(params.value, params.data.total);
                      if (Number(buyPercentage) === 0) {
                        return ""; 
                      }
                      return `${buyPercentage}%`;
                  },
              },
              data: data.map((item) => ({
                  value: item.buy,
                  total: item.buy + item.sell,
                  itemStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                          { offset: 0, color: colorArray[0] + "65" },
                          { offset: 1, color: colorArray[0] },
                      ]),
                  },
              })),
          },
          {
              name: "Sell",
              type: "bar",
              stack: "total",
              barWidth: 20,
              label: {
                  show: true,
                  position: "inside",
                  color: "#fff",
                  formatter: (params: any) => {
                      const sellPercentage = findRatio(params.value, params.data.total);
                      if (Number(sellPercentage) === 0) {
                        return ""; 
                      }
                      return `${sellPercentage}%`;
                  },
              },
              data: data.map((item) => ({
                  value: item.sell,
                  total: item.buy + item.sell,
                  itemStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                          { offset: 0, color: colorArray[1] + "65" },
                          { offset: 1, color: colorArray[1] },
                      ]),
                  },
              })),
          },
          {
              name: "Total Label",
              type: "bar",
              stack: "total",
              barWidth: 20,
              label: {
                  show: true,
                  position: "right",
                  color: "#fff",
                  formatter: (params: any) => {
                      const total = params.data.total;
                      const totalPercentage = findRatio(total, totalAmount, 0);
                      return `${numberToMillionsString(total)} (${totalPercentage}%)`;
                  },
              },
              data: data.map((item) => ({
                  value: 0, 
                  total: item.buy + item.sell,
              })),
              itemStyle: {
                  color: "transparent",
              },
              silent: true, 
          },
      ],
      
      };

      chartInstance.setOption(options);
      return () => chartInstance.dispose();
    }
  }, [data, option, colorArray]);

  const calculatedHeight = Math.max(data.length * 35, 300);
  return <div ref={chartRef} style={{ height: calculatedHeight, width: "100%" }} />;
};

interface BarChartHorizontalStackProps {
  data: BarData[];
  options: BarOption;
  colorArray: string[]; 
}

const downloadCSV = (data: BarData[], totalBuy: number, totalSell: number) => {
  const csvContent = ["Name,Buy Value,Buy %,Sell Value,Sell %"];
  
  data.forEach((item) => {
    const buyPercent = findRatio(item.buy, item.buy + item.sell);
    const sellPercent = findRatio(item.sell, item.buy + item.sell);
    csvContent.push(`${item.name},${item.buy},${buyPercent}%,${item.sell},${sellPercent}%`);
  });

  const blob = new Blob([csvContent.join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "LBSL_turnover_sector_wise_buy_sell.csv";
  link.click();
};

const BarChartHorizontalStack: FC<BarChartHorizontalStackProps> = ({ data, options, colorArray }) => {
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);
  const totalBuy = data.reduce((acc, obj) => acc + obj.buy, 0);
  const totalSell = data.reduce((acc, obj) => acc + obj.sell, 0);

  const handleDownload = (format: "png" | "svg" | "csv") => {
    if (format === "csv") {
      downloadCSV(data, totalBuy, totalSell);
    } else if (chartInstanceRef.current) {
      const dataURL = chartInstanceRef.current.getDataURL({
        type: format,
        backgroundColor: "#fff",
      });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `barchart.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
            <DropdownMenuItem onClick={() => handleDownload("png")}>
              Download PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload("svg")}>
              Download SVG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownload("csv")}>
              Download CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <BarChart data={data} option={options} colorArray={colorArray} />
    </>
  ) : (
    <div className="font-semibold text-lg text-gray-600 flex justify-center items-center">
      <AiTwotoneAlert className="mr-2 h-6 w-5" /> No data available
    </div>
  );
};

export default BarChartHorizontalStack;