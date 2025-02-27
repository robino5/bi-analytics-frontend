import { FC, useRef, useEffect } from "react";
import * as echarts from "echarts";
import { AiTwotoneAlert } from "react-icons/ai";
import { numberToMillionsString } from "@/lib/utils";

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
  colorArray: string[]; // [BuyColor, SellColor]
}

const findRatio = (value: number, total: number, precision: number = 0) => {
  return Math.round((value / total) * 100); // Round to nearest integer percentage
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
        
            // Show Total section
            result += `
              <b>Total: ${numberToMillionsString(total)}</b> (${totalPercentage}%)
              <br/>
            `;
        
            return result.trim(); // Clean up unnecessary spaces
          },
        },        
        xAxis: {
          type: "value",
          axisLabel: {
            color: "#fff",
            formatter: (value: number) => `${findRatio(value, totalAmount, 0)}%`,
          },
          axisLine: { lineStyle: { color: "#565656" } },
          splitLine: { show: false },
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
                        return ""; // Hide label if buyPercentage is 0
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
                        return ""; // Hide label if sellPercentage is 0
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
              // Total Value + Percentage shown at the right side
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
                  color: "transparent", // No actual bar, just label carrier
              },
              silent: true, // No hover effects
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
  colorArray: string[]; // [BuyColor, SellColor]
}

const BarChartHorizontalStack: FC<BarChartHorizontalStackProps> = ({ data, options, colorArray }) => {
  return data.length ? (
    <BarChart data={data} option={options} colorArray={colorArray} />
  ) : (
    <div className="font-semibold text-lg text-gray-600 flex justify-center items-center">
      <AiTwotoneAlert className="mr-2 h-6 w-5" /> No data available
    </div>
  );
};

export default BarChartHorizontalStack;
