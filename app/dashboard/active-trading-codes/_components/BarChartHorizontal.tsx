import { FC, useRef, useEffect } from "react";
import * as echarts from "echarts";
import { AiTwotoneAlert } from "react-icons/ai";
import { numberToMillionsString } from "@/lib/utils";
import { LABEL_TICK_FONT_SIZE } from "@/components/ui/utils/constants";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface BarData {
  name: string;
  value: string | number;
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
}

const findRatio = (value: string, totalAmount: number, precision: number = 2) => {
  return ((parseFloat(value) / totalAmount) * 100).toFixed(precision);
};

const BarChart: FC<BarChartProps> = ({ data, option }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const totalAmount = data.reduce((acc, obj) => acc + parseFloat(obj.value as string), 0);
  const colorArray = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336"];

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const options = {
        grid: { left: "18%", right: "12%", top: "10%", bottom: "10%" },
        tooltip: {
          trigger: "item",
          formatter: (params: any) => {
            const { name, value } = params.data;
            const ratio = findRatio(value, totalAmount, 0);
            return `${name}: ${numberToMillionsString(value)}(${ratio}%)`;
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
                  { offset: 0, color: colorArray[index % colorArray.length] + "66" }, // Dimmed
                  { offset: 1, color: colorArray[index % colorArray.length] },
                ]),
              },
            })),
            name: option.legendName || "Data",
            barWidth: 18,
            label: {
              show: option.barLabel,
              position: "right",
              formatter: (params: any) => `${numberToMillionsString(params.value)}(${findRatio(params.value, totalAmount, 0)}%)`,
              fontSize: LABEL_TICK_FONT_SIZE,
              color: "#fff",
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

  return <div ref={chartRef} style={{ height: option?.height ?? 200, width: "100%" }} />;
};

interface BarChartHorizontalProps {
  data: BarData[];
  options: BarOption;
}

const BarChartHorizontal: FC<BarChartHorizontalProps> = ({ data, options }) => {
  return data.length ? (
    <Card className="col-span-3 overflow-auto bg-[#0e5e6f] ">
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg grid grid-cols-[4fr_1fr] items-center">
        <CardTitle className="text-white text-lg font-semibold py-2">
          LBSL Sector Wise Turnover (Mn)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart data={data} option={options} />
      </CardContent>
    </Card>
  ) : (
    <div className="font-semibold text-lg text-gray-600 flex justify-center items-center">
      <AiTwotoneAlert className="mr-2 h-6 w-5" /> No data available
    </div>
  );
};

export default BarChartHorizontal;
