import Statistics from "./ui/statistics";
import { LovResultType } from "@/lib/types";
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

  return (
    <div className="flex justify-between items-center h-full w-full">
      <Statistics label={marginBalance.name} value={marginBalance.value} />
      <Statistics
        label={marginStockBalance.name}
        value={marginStockBalance.value}
      />
      <Statistics
        label={marginDailyTurnover.name}
        value={marginDailyTurnover.value}
      />
      <Statistics
        label={marginActiveClients.name}
        value={marginActiveClients.value}
      />
    </div>
  );
};

export default StatisticsMarginCodeSummary;
