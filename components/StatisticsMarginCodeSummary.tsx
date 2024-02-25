import Statistics from "./ui/statistics";
import { LovResultType } from "@/lib/types";
import { FC } from "react";

interface CashCodeSummaryProps {
  loanBalance: LovResultType;
  stockBalance: LovResultType;
  dailyTurnover: LovResultType;
  activeClient: LovResultType;
}

interface Data {
  data: CashCodeSummaryProps;
}

const StatisticsMarginCodeSummary: FC<Data> = ({ data }) => {
  const { loanBalance, stockBalance, dailyTurnover, activeClient } = data;

  return (
    <div className="flex justify-between items-center h-full w-full">
      <Statistics label={loanBalance.name} value={loanBalance.value} />
      <Statistics label={stockBalance.name} value={stockBalance.value} />
      <Statistics label={dailyTurnover.name} value={dailyTurnover.value} />
      <Statistics label={activeClient.name} value={activeClient.value} />
    </div>
  );
};

export default StatisticsMarginCodeSummary;
