"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface CompanyPeChartProps {
    companyPeRSI: {
      pe_ratio: number;
      rsi: number
    } | null;
    colorArray: string[];
}

const CompanyPeChart: React.FC<CompanyPeChartProps> = ({ companyPeRSI, colorArray }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Initialize chart
        if (!chartInstance.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        if (!companyPeRSI) {
            chartInstance.current.clear();
            return;
        }

        // Data & labels
        const categories = ["PE Ratio", "RSI"];
        const values = [companyPeRSI.pe_ratio, companyPeRSI.rsi];

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: "axis",
                axisPointer: { type: "shadow" },
                formatter: (params: any) => {
                    return params
                        .map((item: any) => `${item?.name}: <b>${item?.value?.toFixed(2)}</b>`)
                        .join("<br/>");
                },
            },
            grid: { left: "10%", right: "10%", top: "5%", bottom: "10%" },
            xAxis: {
                type: "value",
                axisLabel: { show: false },
            },
            yAxis: {
                type: "category",
                data: categories,
                inverse: true,
                axisLine: { lineStyle: { color: "#ffffffff" } },
                axisTick: { show: false },
                axisLabel: {
                    color: "#fff",
                    fontSize: 12,
                     formatter: (value: string) => (value?.length > 10 ? value.replace(/(.{10})/g, "$1\n") : value),
                },
            },
            series: [
                {
                    type: "bar",
                    data: values.map((v, i) => ({
                        value: v,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: colorArray[i] + "60" }, // lighter
                                { offset: 1, color: colorArray[i] }, // solid
                            ]),
                        },
                    })),
                    barWidth: 50,
                    label: {
                        show: true,
                        position: "right",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold", // ✅ make labels bold
                        formatter: (params: any) => params?.value?.toFixed(2),
                    },
                },
            ],
        };

        chartInstance.current.setOption(option);

        // Cleanup on unmount
        return () => {
            chartInstance.current?.dispose();
            chartInstance.current = null;
        };
    }, [companyPeRSI, colorArray]);

    return <div ref={chartRef} style={{ width: "100%", height: "150px" }} />;
};

export default CompanyPeChart;
