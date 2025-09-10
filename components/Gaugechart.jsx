import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";

const GaugeChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || data === undefined) return;

    const chart = echarts.init(chartRef.current);
    const roundedValue = Math.round(data);

    // 🔑 Helper: convert CSS variable into valid hsl/hex
    const getCssVarColor = (varName) => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (!raw) return "#000"; // fallback
      if (raw.includes(" ")) return `hsl(${raw})`; // for values like 222.2 84% 4.9%
      return raw;
    };

    const textColor = getCssVarColor("--foreground");

    const option = {
      grid: { top: 5, bottom: 5, left: 5, right: 5 },
      series: [
        {
          type: "gauge",
          min: 0,
          max: 100,
          radius: "90%",
          pointer: { width: 8, length: "70%" },
          axisLine: {
            lineStyle: {
              width: 25,
              color: [
                [0.2, "#d32f2f"],
                [0.4, "#f57c00"],
                [0.6, "#fbc02d"],
                [0.8, "#388e3c"],
                [1, "#206623ff"],
              ],
            },
          },
          axisLabel: {
            color: textColor,
          },
          axisTick: { show: false },
          splitLine: { show: false },
          title: {
            show: true,
            color: textColor,
            fontSize: 14,
          },
          detail: {
            formatter: (value) => {
              const roundedValue = Math.round(value);
              let label = "";
              if (roundedValue <= 20) label = "Ex. Bear";
              else if (roundedValue <= 40) label = "Bear";
              else if (roundedValue <= 60) label = "Neutral";
              else if (roundedValue <= 80) label = "Bull";
              else label = "Ex. Bull";
              return `${label} (${roundedValue})`;
            },
            fontSize: 20,
            color: textColor,
          },

          data: [{ value: roundedValue, name: "Sentiment" }],
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(() => {
      const updatedColor = getCssVarColor("--foreground");
      chart.setOption({
        series: [
          {
            title: { color: updatedColor },
            detail: { color: updatedColor },
          },
        ],
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      chart.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
};

export default GaugeChart;
