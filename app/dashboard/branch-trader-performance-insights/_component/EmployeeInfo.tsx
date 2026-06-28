"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import CardBoard from "@/components/CardBoard";

type EmployeeInfoProps = {
  employeeData: any;
  branch: string;
};

export default function EmployeePieChart({
  employeeData,
  branch
}: EmployeeInfoProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const isArray = Array.isArray(employeeData);

  const get = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  const filteredList = (() => {
    const rawList = isArray ? employeeData : (Array.isArray(employeeData?.data) ? employeeData.data : []);
    return rawList.filter((item: any) => {
      if (branch && branch !== "" && branch !== "All") {
        if (String(item.branchCode || item.branch_code || item.branch || item.branchName).trim() !== String(branch).trim()) return false;
      }
      return true;
    });
  })();

  const sumField = (arr: any[], path: string) => {
    return arr.reduce((s, it) => {
      const v = get(it, path);
      const n = typeof v === 'number' ? v : Number(v || 0);
      return s + (isNaN(n) ? 0 : n);
    }, 0);
  };

  const permanent = isArray || Array.isArray(employeeData?.data) ? sumField(filteredList, 'permanentTrader') : employeeData?.permanentTrader || 0;
  const withSalary = isArray || Array.isArray(employeeData?.data) ? sumField(filteredList, 'contractualWithSalary') : employeeData?.contractualWithSalary || 0;
  const withoutSalary = isArray || Array.isArray(employeeData?.data) ? sumField(filteredList, 'contractualWithoutSalary') : employeeData?.contractualWithoutSalary || 0;
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
          center: ["50%", "42%"], // 👈 move pie upward
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
            { value: withSalary, name: "Busi. Associate With Salary" },
            { value: withoutSalary, name: "Busi. Associate Without Salary" },
          ],
        },
      ],
    });

    return () => {
      chart.dispose();
    };
  }, [permanent, withSalary, withoutSalary, branch]);

  return (
    <CardBoard
      className="col-span-6 xl:col-span-3 overflow-hidden"
      title={`Employee Structure-${permanent + withSalary + withoutSalary} As on Date`}
      children={
        <div ref={chartRef} className="h-[350px] w-full" />
      }
    />
  );
}
