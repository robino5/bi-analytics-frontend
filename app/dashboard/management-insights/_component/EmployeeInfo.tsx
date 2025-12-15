"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function EmployeePieChart({
    employeeData,
}: {
    employeeData: any;
}) {
    const chartRef = useRef<HTMLDivElement>(null);

    const permanent =
        employeeData?.detail?.sumOfPermanentTrader || 0;
    const withSalary =
        employeeData?.detail?.sumOfContractualWithSalary || 0;
    const withoutSalary =
        employeeData?.detail?.sumOfContractualWithoutSalary || 0;

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        chart.setOption({
            tooltip: {
                trigger: "item",
                triggerOn: "mousemove",
                formatter: "{b}<br/>{c} ({d}%)",
            },
            legend: {
                bottom: 0,
                textStyle: {
                    color: "#fff",
                    fontSize: 12,
                },
            },
            series: [
                {
                    name: "Employee Structure",
                    type: "pie",
                    radius: ["45%", "75%"],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                        width: 120, 
                        overflow: "break", 
                        formatter: (params: any) =>
                            `${params.name}\n${params.value} (${params.percent}%)`,
                    },
                    labelLine: {
                        show: true,
                        length: 15,
                        length2: 10,
                        lineStyle: {
                            color: "#fff",
                        },
                    },
                    data: [
                        { value: permanent, name: "Permanent" },
                        { value: withSalary, name: "With Salary" },
                        { value: withoutSalary, name: "Without Salary" },
                    ],
                },
            ],
        });

        return () => {
            chart.dispose();
        };
    }, [permanent, withSalary, withoutSalary]);

    return (
        <div className="w-full max-w-md mx-auto bg-transparent">
            <div
                ref={chartRef}
                className="h-[350px] w-full"
            />
        </div>
    );
}
