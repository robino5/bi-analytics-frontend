"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type Props = {
    priceUp: any;
    priceDown: any;
    priceFlat: any;
};

export default function LiveTradeChart({ priceUp, priceDown, priceFlat }: Props) {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstanceRef = useRef<echarts.EChartsType | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.dispose();
            }

            const chart = echarts.init(chartRef.current);
            chart.setOption({
                animation: false,
                tooltip: {
                    trigger: "axis",
                    axisPointer: { type: "shadow" },
                },
                xAxis: {
                    type: "category",
                    data: ["Up", "Flat", "Down"],
                    axisLabel: { color: "#fff" }, // labels below the bars
                },
                yAxis: {
                    type: "value",
                    axisLabel: { color: "#fff" },
                },
                series: [
                    {
                        data: [priceUp, priceFlat, priceDown],
                        type: "bar",
                        barWidth: 45,
                        itemStyle: {
                            color: (params: { dataIndex: number }) => {
                                const colors: { [key: number]: string } = {
                                    0: "#22c55e", // green
                                    1: "#facc15", // yellow
                                    2: "#ef4444", // red
                                };
                                return colors[params.dataIndex];
                            },
                        },
                         label: {
                            show: true,
                            position: "top",
                            color: "#fff",
                            fontSize: 12,
                        },
                    },
                ],
                grid: {
                    top: "15%",
                    bottom: "15%",  // give space for xAxis labels below bars
                    left: "15%",
                    right: "15%",
                },
                backgroundColor: "transparent",
            });

            chartInstanceRef.current = chart;

            // Resize chart on window resize
            const resizeHandler = () => chart.resize();
            window.addEventListener("resize", resizeHandler);

            return () => {
                chart.dispose();
                window.removeEventListener("resize", resizeHandler);
            };
        }
    }, [priceUp, priceFlat, priceDown]);

    return <div ref={chartRef} style={{ width: "100%", height: "150px" }} />;
}
