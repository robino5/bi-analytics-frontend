"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ClientInfo({ clientData }: { clientData: any }) {
  const chartRef = useRef<HTMLDivElement>(null);

  const total = clientData?.detail?.sumOfTotalInvestor || 0;
  const active = clientData?.detail?.sumOfPerformer || 0;
  const inactive = clientData?.detail?.sumOfNonePerformer || 0;

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
          radius: ["45%", "75%"],
          label: {
            formatter: (params: any) =>
              `${params.name}\n${params.percent}%`,
            fontWeight: "bold",
             textStyle: {
                    color: "#fff",
                    fontSize: 12,
                },
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
    <Card className="w-full bg-[#033e4a]">
      {/* CARD HEADER */}
         <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg flex items-center gap-2">Client Overview</CardTitle>
      </CardHeader>

      {/* CARD CONTENT */}
      <CardContent>
        <div className="grid grid-cols-12 gap-4">
          {/* LEFT – TABLE */}
          <div className="col-span-12 md:col-span-6">
            <table className="w-full text-sm rounded-lg overflow-hidden mt-5">
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
                  <td className="text-center py-2 font-bold">Active</td>
                  <td className="text-center py-2 font-bold">Inactive</td>
                </tr>

                <tr className="odd:bg-green-50 even:bg-green-100">
                  <td className="text-center py-2 font-semibold">
                    {active}
                  </td>
                  <td className="text-center py-2 font-semibold">
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
                  <td className="text-center py-2 font-semibold">
                    {clientData?.detail?.sumOfIbrokerInvestor || 0}
                  </td>
                  <td className="text-center py-2 font-semibold">
                    {clientData?.detail?.sumOfTexpressInvestor || 0}
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
      </CardContent>
    </Card>
  );
}
