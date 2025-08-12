import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

type DsePoint = {
  "0": number;
  "1": number;
  "2"?: number;
};

interface Props {
  data: DsePoint[];
  dataSum: any;
  showVolume?: boolean;
  refreshInterval?: number;
}

const IntradayDsexChart: React.FC<Props> = ({
  data,
  dataSum,
  showVolume = false,
  refreshInterval = 60000,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const chartInstance = useRef<echarts.ECharts | null>(null);
  console.log("DSEX Chart Data:", dataSum);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, refreshInterval);
    return () => clearInterval(timer);
  }, [refreshInterval]);

  useEffect(() => {
    if (!chartRef.current || !data?.length) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }
    const todayData = data
      .filter((point) => {
        const pointTime = new Date(point["0"]);
        const hours = pointTime.getHours();
        const minutes = pointTime.getMinutes();
        return (
          (hours > 10 || (hours === 10 && minutes >= 0)) &&
          (hours < 14 || (hours === 14 && minutes <= 30))
        );
      })
      .sort((a, b) => a["0"] - b["0"]);

    const formatTime = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString("en-BD", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    const getLabelShowStatus = (index: number, total: number) => {
      if (total <= 3) return true;
      return index === 0 || index === Math.floor(total / 3) || index === Math.floor((2 * total) / 3) || index === total - 1;
    };

    const formatSigned = (value: number | string) => {
      const num = Number(value);
      const sign = num > 0 ? "+" : "";
      return `${sign}${num}`;
    };

    const option: echarts.EChartsOption = {
      title: {
        text: `{main|DSEX-${dataSum[0]}}  {change|${formatSigned(dataSum[1])}}  {percent|${formatSigned(dataSum[2])}%}`,
        left: "center",
        textStyle: {
          fontSize: 14,
          rich: {
            main: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: 14,
            },
            change: {
              color: Number(dataSum[1]) >= 0 ? "#00ff00" : "#ff0000",
              fontWeight: "bold",
              fontSize: 14,
            },
            percent: {
              color: Number(dataSum[2]) >= 0 ? "#00ff00" : "#ff0000",
              fontWeight: "bold",
              fontSize: 14,
            },
          },
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        borderColor: "#ccc",
        borderWidth: 1,
        textStyle: {
          fontSize: 11,
          color: "#fff",
          fontFamily: "Arial",
        },
        padding: 6,
        extraCssText: "line-height: 1.2;",
        formatter: (params: any) => {
          const time = formatTime(todayData[params[0].dataIndex]["0"]);
          const value = params[0].value.toLocaleString("en-BD");
          let tooltip = `<div><span>${time}</span><br/>`;
          tooltip += `DSEX: <span style="font-weight:600">${value}</span>`;

          if (params[1] && showVolume) {
            const volume = params[1].value.toLocaleString("en-BD");
            tooltip += `<br/>Volume: <span style="font-weight:600">${volume}</span>`;
          }

          tooltip += `</div>`;
          return tooltip;
        },
      },
      grid: [
        {
          left: "3%",
          right: "7%",
          top: "10%",
          bottom: showVolume ? "25%" : "15%",
          containLabel: true,
        },
        ...(showVolume
          ? [
            {
              left: "3%",
              right: "4%",
              top: "75%",
              height: "15%",
              containLabel: true,
            },
          ]
          : []),
      ],
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: todayData.map((d) => formatTime(d["0"])),
          axisLabel: {
            show: true,
            interval: (index) => getLabelShowStatus(index, todayData.length),
            formatter: (value: string) => value,
            fontSize: 10,
            color: "#fff",
            rotate: 0,
            margin: 8,
          },
          axisLine: { onZero: false, lineStyle: { color: "#666" } },
          axisTick: { show: false },
          splitLine: { show: true, lineStyle: { color: "#666" } },
        },
        ...(showVolume
          ? [
            {
              type: "category" as const,
              gridIndex: 1,
              boundaryGap: false,
              data: todayData.map((d) => formatTime(d["0"])),
              axisLabel: {
                show: true,
                interval: (index: number) => getLabelShowStatus(index, todayData.length),
                fontSize: 10,
                color: "#fff",
                rotate: 0,
                margin: 8,
              },
              axisLine: { show: false, lineStyle: { color: "#666" } },
              axisTick: { show: false },
              splitLine: { show: true, lineStyle: { color: "#666" } },
            },
          ]
          : []),
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          axisLabel: {
            formatter: (value: number) => value.toLocaleString(),
            color: "#fff",
          },
          splitLine: { show: false },
          axisLine: { show: true, lineStyle: { color: "#666" } },
          axisTick: { show: false },
        },
        ...(showVolume
          ? [
            {
              type: "value" as "value",
              gridIndex: 1,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false, lineStyle: { color: "#666" } },
            },
          ]
          : []),
      ],
      series: [
        {
          name: "DSEX",
          type: "line" as const,
          smooth: true,
          showSymbol: todayData.length < 100,
          data: todayData.map((d) => d["1"]),
          lineStyle: {
            width: 2,
            color: "#30fa15ff",
          },
          itemStyle: {
            color: "#49e929ff",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(53, 250, 4, 0.45)" },
              { offset: 1, color: "rgba(61, 248, 23, 0.12)" },
              { offset: 1, color: "rgba(61, 248, 23, 0.07)" },
            ]),
          },
        },
        ...(showVolume
          ? [
            {
              name: "Volume",
              type: "bar" as const,
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: todayData.map((d) => d["2"] || 0),
              itemStyle: {
                color: function (params: { dataIndex: number }) {
                  if (params.dataIndex === 0) return "#999";
                  const current = todayData[params.dataIndex]["1"];
                  const prev = todayData[params.dataIndex - 1]["1"];
                  return current >= prev ? "#00b050" : "#ff0000";
                },
              },
              barWidth: "60%",
            },
          ]
          : []),
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data, showVolume, currentTime]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: showVolume ? "200px" : "200px",
        minHeight: "200px",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default IntradayDsexChart;