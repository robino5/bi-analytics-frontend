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
}

const findRatio = (
  value: string,
  totalAmount: number,
  precision: number = 2
) => {
  return ((parseFloat(value) / totalAmount) * 100).toFixed(precision);
};

const BarChart: FC<BarChartProps> = ({ data, option }) => {
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
          left: "15%",
          right: "10%",
          top: "10%",
          bottom: "10%",
        },
        tooltip: {
          trigger: "item",
          formatter: (params: any) => {
            const { name, value } = params.data;
            const ratio = findRatio(value, totalAmount, 0);
            return `${name}: ${ratio}%`;
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
            formatter: (value: string) => {
              const maxLabelLength = 12;
              if (value.length > maxLabelLength) {
                return value.replace(/(.{12})/g, "$1\n");
              }
              return value;
            },
          },
        },
        series: [
          {
            type: "bar",
            data: data, // Use sorted chart data
            name: option.legendName || "Data",
            itemStyle: {
              color: option.fill,
              borderWidth: 1,
            },
            barWidth: 18,
            label: {
              show: option.barLabel,
              position: "right",
              formatter: (params: any) =>
                numberToMillionsString(params.value, true),
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
  }, [data, option]); // Include sortedData as a dependency

  return (
    <div
      ref={chartRef}
      style={{ height: option?.height ?? 300, width: "100%" }}
    />
  );
};


interface BarChartHorizontalProps {
  data: BarData[];
  options: BarOption;
}

const BarChartHorizontal: FC<BarChartHorizontalProps> = ({ data, options }) => {
  return data.length ? (
    <BarChart data={data} option={options} />
  ) : (
    <div className="font-semibold text-lg text-gray-600 flex justify-center items-center">
      <AiTwotoneAlert className="mr-2 h-6 w-5" /> No data available
    </div>
  );
};

export default BarChartHorizontal;
