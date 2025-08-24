import Statistics from "./ui/statistics";
import { ICashCodeSummary } from "@/types/dailyTurnoverPerformance";
import { FC } from "react";
import { Banknote, Wallet, LineChart, UserCheck } from "lucide-react"; // icons

interface Data {
  data: ICashCodeSummary;
}

const StatisticsCashCodeSummary: FC<Data> = ({ data }) => {
  const {
    cashBalance,
    cashStockBalance,
    cashDailyTurnover,
    cashActiveClients,
  } = data;

  const stats = [
    {
      label: cashBalance.name,
      value: cashBalance.value,
     bg: "bg-gradient-to-b from-blue-200 to-blue-400",
      textColor: "text-blue-900",
    },
    {
      label: cashStockBalance.name,
      value: cashStockBalance.value,
      bg: "bg-gradient-to-b from-green-200 to-green-400",
      textColor: "text-green-900",
    },
    {
      label: cashDailyTurnover.name,
      value: cashDailyTurnover.value,
 bg: "bg-gradient-to-b from-purple-200 to-purple-400",
      textColor: "text-purple-900",
    },
    {
      label: cashActiveClients.name,
      value: cashActiveClients.value,
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
          {/* Icon */}
          {/* <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm">
            {stat.icon}
          </div> */}

          {/* Statistics */}
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

export default StatisticsCashCodeSummary;
