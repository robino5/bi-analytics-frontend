"use client";

import Statistics from "./ui/statistics";
import { FC } from "react";
import { IShortSummary } from "@/types/dailyTurnoverPerformance";

interface SummaryData {
  data: IShortSummary;
}

const StatisticsCardClientTurnoverSummary: FC<SummaryData> = ({ data }) => {
  const { totalClients, totalActiveClients, dailyTurnover, netBuySell } = data;

  const activeClientRatio = Math.round(
    (totalActiveClients.value / totalClients.value) * 100
  );

  const stats = [
    {
      label: totalClients.name,
      value: totalClients.value,
      bg: "bg-gradient-to-b from-blue-200 to-blue-400",
      textColor: "text-blue-900",
    },
    {
      label: totalActiveClients.name,
      value: totalActiveClients.value,
      bg: "bg-gradient-to-b from-green-200 to-green-400",
      textColor: "text-green-900",
      ratio: activeClientRatio,
    },
    {
      label: dailyTurnover.name,
      value: dailyTurnover.value,
      bg: "bg-gradient-to-b from-purple-200 to-purple-400",
      textColor: "text-purple-900",
    },
    {
      label: netBuySell.name,
      value: netBuySell.value,
      bg: "bg-gradient-to-b from-teal-200 to-teal-400",
      textColor: "text-teal-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`relative flex flex-col items-center justify-center rounded-2xl shadow-lg ${stat.bg} hover:scale-105 transition-transform duration-300 h-[110px]`}
        >
          {/* Statistics content */}
          <Statistics
            label={stat.label}
            value={stat.value}
            classname={stat.textColor}
          />

          {/* Ratio badge as absolute */}
          {stat.ratio !== undefined && (
            <span
              className={`absolute bottom-1 px-3 py-1 text-sm font-semibold rounded-full ${stat.ratio > 0 ? "bg-green-900 text-white" : "bg-gray-500 text-white"
                }`}
            >
              {stat.ratio !== undefined ? `${stat.ratio}%` : "0%"}
            </span>
          )}
        </div>
      ))}
    </div>

  );
};

export default StatisticsCardClientTurnoverSummary;
