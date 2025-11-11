"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { numberToMillionsString } from "@/lib/utils";

type DepositData = {
    cashDeposit: number;
    chequeDeposit: number;
    scbDeposit: number;
    payOrder: number;
    cashDividend: number;
    ipoMode: number;
};

interface PieChartProps {
    data: any;
}

const WithdrawalPieChart: React.FC<PieChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<echarts.EChartsType | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        if (!chartInstance.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        const chartData = [
            { name: "Cash ", value: data.cashWithdrawal },
            { name: "Cheque ", value: data.chequeWithdrawal },
            { name: "Online ", value: data.onlineRequisition },
            { name: "RTSG", value: data.rtsg },
            { name: "Pay-Order", value: data.payOrder },
            { name: "Cash-Dividend", value: data.cashDividendDeduction },
            { name: "IPO", value: data.ipoMode },
        ];

        const option: echarts.EChartsOption = {
            tooltip: {
                trigger: "item",
                formatter: (params: any) =>
                    `${params.name}<br/>Value: <b>${numberToMillionsString(
                        params.value
                    )}</b><br/>(${params.percent}%)`,
            },
            legend: {
                orient: 'horizontal',
                bottom: 0,
                left: 'center', textStyle: {
                    color: '#ffffffff'
                }
            },
            series: [
                {
                    type: "pie",
                    radius: ["40%", "60%"],
                     center: ["50%", "40%"],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        formatter: (params: any) =>
                            `${params.name}\n${numberToMillionsString(params.value)}`,
                        fontSize: 12,
                        color: '#ffffffff'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 13,
                            fontWeight: "bold",

                        },
                    },
                    labelLine: {
                        show: true,
                        length: 10,
                        length2: 5,
                        smooth: true,
                    },
                    data: chartData.filter((d) => d.value > 0),
                },
            ],
        };

        chartInstance.current.setOption(option);

        const handleResize = () => chartInstance.current?.resize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chartInstance.current?.dispose();
            chartInstance.current = null;
        };
    }, [data]);

    return <div ref={chartRef} className="w-full h-[370px]" />;
};

export default WithdrawalPieChart;
