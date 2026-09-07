import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import * as echarts from "echarts";
import { dseLiveTradeAPI } from "@/lib/services/dseLiveTrade";
import GaugeChart from "./Gaugechart";

export default function MarketStatistics() {
  const chartRef = useRef(null);
  const {
    data: liveTradeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dseLiveTrade"],
    queryFn: () => dseLiveTradeAPI.getDseLiveTradeData(),
    refetchInterval: 60000,
  });

  console.log("liveTradeData", liveTradeData);

  // Half Doughnut Chart Effect
  useEffect(() => {
    if (!chartRef.current || !liveTradeData) return;

    const chart = echarts.init(chartRef.current);

    // Extract data from liveTradeData
    const priceUp = parseInt(liveTradeData.priceupsymbols) || 0;
    const priceFlat = parseInt(liveTradeData.priceflatsymbols) || 0;
    const priceDown = parseInt(liveTradeData.pricedownsymbols) || 0;

    const getCssVarColor = (varName: string) => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (!raw) return "#000";
      if (raw.includes(" ")) return `hsl(${raw})`;
      return raw;
    };

    const textColor = getCssVarColor("--foreground");

    const chartData = [
      {
        value: priceUp,
        name: "Up",
        itemStyle: { color: "#22c55e" }, // Green
      },
      {
        value: priceFlat,
        name: "Flat",
        itemStyle: { color: "#eab308" }, // Yellow
      },
      {
        value: priceDown,
        name: "Down",
        itemStyle: { color: "#ef4444" }, // Red
      },
    ];

    const option = {
      grid: {
        top: 0,
        bottom: 5,
        left: 0,
        right: 0,
      },
      title: {
        text: "Statistics",
        left: "center",
        top: "75%",
        textStyle: {
          color: textColor,
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      // legend: {
      //   orient: "horizontal",
      //   top: "auto",
      //   bottom: 0,
      //   padding: [20, 0, 0, 0],
      //   itemWidth: 20,
      //   itemHeight: 20,
      //   textStyle: {
      //     color: textColor,
      //     fontSize: 12,
      //     fontWeight: "500",
      //   },
      // },
      series: [
        {
          type: "pie",
          radius: ["100%", "165%"],
          center: ["50%", "85%"],
          startAngle: 180,
          endAngle: 360,
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside",
            formatter: "{c}\n{d}%",
            color: "#000000",
            fontSize: 11,
            fontWeight: "bold",
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: "bold",
            },
          },
          data: chartData,
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(() => {
      const updatedColor = getCssVarColor("--foreground");
      chart.setOption({
        title: {
          textStyle: { color: updatedColor },
        },
        legend: {
          textStyle: { color: updatedColor },
        },
        series: [
          {
            label: { color: updatedColor },
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
  }, [liveTradeData]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Half Doughnut Chart */}
      {!liveTradeData ? (
        <div className="w-full aspect-[2/1] flex items-center justify-center">
          {isLoading ? "Loading..." : isError ? <span className="text-red-500">Error loading data</span> : "No data available"}
        </div>
      ) : (
        <div className="w-full aspect-[2/1]">
          <div
            ref={chartRef}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
