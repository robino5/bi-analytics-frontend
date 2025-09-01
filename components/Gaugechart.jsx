import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";

const GaugeChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || data === undefined) return;

    const chart = echarts.init(chartRef.current);
    const roundedValue = Math.round(data);

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
          axisTick: { show: false },
          splitLine: { show: false },
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
          },
          data: [{ value: roundedValue, name: "Sentiment" }],
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data]);

  return (
<div style={{ width: "100%" }}>
  <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
  
  {/* HTML Legend Below */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      marginTop: "-50px", // negative margin brings legend up closer
      fontWeight: "bold",
      fontSize: "14px",
    }}
  >
    <div style={{ color: "#d32f2f", textAlign: "center", flex: 1 }}>
      Ex. Bear<br />0~20
    </div>
    <div style={{ color: "#f57c00", textAlign: "center", flex: 1 }}>
      Bear<br />20~40
    </div>
    <div style={{ color: "#fbc02d", textAlign: "center", flex: 1 }}>
      Neutral<br />40~60
    </div>
    <div style={{ color: "#388e3c", textAlign: "center", flex: 1 }}>
      Bull<br />60~80
    </div>
    <div style={{ color: "#2e7d32", textAlign: "center", flex: 1 }}>
      Ex. Bull<br />80~100
    </div>
  </div>
</div>

  );
};

export default GaugeChart;
