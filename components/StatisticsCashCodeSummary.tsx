import Statistics from "./ui/statistics";
import { LovResultType } from "@/lib/types";
import { ICashCodeSummary } from "@/types/dailyTurnoverPerformance";
import { FC } from "react";

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
  return (
    <div className="flex justify-between items-center h-full w-full">
      <Statistics label={cashBalance.name} value={cashBalance.value} />
      <Statistics
        label={cashStockBalance.name}
        value={cashStockBalance.value}
      />
      <Statistics
        label={cashDailyTurnover.name}
        value={cashDailyTurnover.value}
      />
      <Statistics
        label={cashActiveClients.name}
        value={cashActiveClients.value}
      />
    </div>
  );
};

export default StatisticsCashCodeSummary;
