"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function ClientInfo({ clientData }: { clientData: any }) {
  const chartRef = useRef<HTMLDivElement>(null);

  const total = clientData?.totalInvestor || 0;
  const active = clientData?.performer || 0;
  const inactive = clientData?.nonePerformer || 0;

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>{d}%",
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
          name: "Client Status",
          type: "pie",
          radius: ["80%", "20%"],
          label: {
            show: true,
            position: "inside",
            color: "black",
            fontSize: 14,
            formatter: (params: any) =>
              `${params.name}\n${params.percent}%`,
            fontWeight: "bold",
          },
          data: [
            { value: active, name: "Active", itemStyle: { color: "#22c55e" }, },
            { value: inactive, name: "Inactive", itemStyle: { color: "#f59e0b" }, },
          ],
        },
      ],
    });

    return () => chart.dispose();
  }, [active, inactive]);

  return (

    <div className="grid grid-cols-12 gap-4 w-full overflow-hidden">
      {/* LEFT – TABLE */}
      <div className="col-span-12 md:col-span-6 mt-4">
        <table className="w-full text-sm rounded-lg overflow-hidden mt-5 min-h-[310px] ">
          <tbody>
            <tr className="bg-green-300">
              <td colSpan={2} className="text-center font-bold py-3">
                Total Client
              </td>
            </tr>

            <tr className="odd:bg-green-50 even:bg-green-100">
              <td colSpan={2} className="text-center py-5 text-lg font-bold">
                {total}
              </td>
            </tr>

            <tr className="bg-yellow-200">
              <td className="text-center py-2  font-bold">Active</td>
              <td className="text-center py-2 font-bold">Inactive</td>
            </tr>

            <tr className="odd:bg-green-50 even:bg-green-100">
              <td className="text-center py-2 text-lg font-semibold">
                {active}
              </td>
              <td className="text-center py-2 text-lg font-semibold">
                {inactive}
              </td>
            </tr>
            <tr className="bg-yellow-200">
              <td className="text-center py-2 font-bold">
                iBroker User
              </td>
              <td className="text-center py-2 font-bold">
                TradeXpress User
              </td>
            </tr>

            <tr className="odd:bg-green-50 even:bg-green-100">
              <td className="text-center py-2 text-lg font-semibold">
                {clientData?.ibrokerInvestor || 0}
              </td>
              <td className="text-center py-2 text-lg font-semibold">
                {clientData?.texpressInvestor || 0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* RIGHT – PIE CHART */}
      <div className="col-span-12 md:col-span-6 flex items-center justify-center">
        <div ref={chartRef} className="w-full h-[300px]" />
      </div>
    </div>

  );
}
