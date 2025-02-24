import { FC, useRef, useEffect } from "react";
import * as echarts from "echarts";
import { AiTwotoneAlert } from "react-icons/ai";
import { numberToMillionsString } from "@/lib/utils";
import { LABEL_COLOR, LABEL_TICK_FONT_SIZE } from "./ui/utils/constants";

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
  colorArray: string[];
}


const findRatio = (
  value: string,
  totalAmount: number,
  precision: number = 2
) => {
  return ((parseFloat(value) / totalAmount) * 100).toFixed(precision);
};

const BarChart: FC<BarChartProps> = ({ data, option, colorArray }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const totalAmount = data.reduce(
    (acc, obj) => acc + parseFloat(obj.value as string),
    0
  );

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);

      const options = {
        grid: {
          left: "18%",
          right: "12%",
          top: "0%",
          bottom: "0%",
        },
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
          textStyle: {
            color: "#000",
            fontSize: 12,
            fontFamily: "sans-serif",
          },
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#565656",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12,
            formatter: (value: number) =>
              `${findRatio(value.toString(), totalAmount, 0)}%`,
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
          axisTick: {
            show: false,
          },
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
                  { offset: 0, color: colorArray[index % colorArray.length] + "65" },
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

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data, option]);
  const calculatedHeight = Math.max(data.length * 32, 300);
  return (
    <div
      ref={chartRef}
      style={{ height: calculatedHeight, width: "100%" }}
    />
  );
};


interface BarChartHorizontalProps {
  data: BarData[];
  options: BarOption;
  colorArray: string[];
}

const BarChartHorizontal: FC<BarChartHorizontalProps> = ({ data, options, colorArray }) => {
  return data.length ? (
    <BarChart data={data} option={options} colorArray={colorArray} />
  ) : (
    <div className="font-semibold text-lg text-gray-600 flex justify-center items-center">
      <AiTwotoneAlert className="mr-2 h-6 w-5" /> No data available
    </div>
  );
};

export default BarChartHorizontal;
