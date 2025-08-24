import Statistics from "./ui/statistics";
import { IMarginCodeSummary } from "@/types/dailyTurnoverPerformance";
import { FC } from "react";

interface Data {
  data: IMarginCodeSummary;
}

const StatisticsMarginCodeSummary: FC<Data> = ({ data }) => {
  const {
    marginBalance,
    marginStockBalance,
    marginDailyTurnover,
    marginActiveClients,
  } = data;

  const stats = [
    {
      label: marginBalance.name,
      value: marginBalance.value,
      bg: "bg-gradient-to-b from-blue-200 to-blue-400",
      textColor: "text-blue-900",
    },
    {
      label: marginStockBalance.name,
      value: marginStockBalance.value,
      bg: "bg-gradient-to-b from-green-200 to-green-400",
      textColor: "text-green-900",
    },
    {
      label: marginDailyTurnover.name,
      value: marginDailyTurnover.value,
     bg: "bg-gradient-to-b from-purple-200 to-purple-400",
      textColor: "text-purple-900",
    },
    {
      label: marginActiveClients.name,
      value: marginActiveClients.value,
     bg: "bg-gradient-to-b from-teal-200 to-teal-400",
      textColor: "text-teal-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center rounded-2xl shadow-lg ${stat.bg} hover:scale-105 transition-transform duration-300 text-white h-[110px]`}
        >

          <Statistics
            label={stat.label}
            value={stat.value}
            classname={stat.textColor}
          />
        </div>
      ))}
    </div>
  );
};

export default StatisticsMarginCodeSummary;
