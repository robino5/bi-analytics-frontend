import { Separator } from "@/components/ui/separator";
import Statistics from "./ui/statistics";
import { LovResultType } from "@/lib/types";
import { FC } from "react";

interface CashCodeSummaryProps {
  cashBalance: LovResultType;
  stockBalance: LovResultType;
  dailyTurnover: LovResultType;
  activeClient: LovResultType;
}

interface Data {
  data: CashCodeSummaryProps;
}

const StatisticsCashCodeSummary: FC<Data> = ({ data }) => {
  const { cashBalance, stockBalance, dailyTurnover, activeClient } = data;
  return (
    <div className="flex justify-between items-center h-full w-full">
      <Statistics label={cashBalance.name} value={cashBalance.value} />
      <Statistics label={stockBalance.name} value={stockBalance.value} />
      <Statistics label={dailyTurnover.name} value={dailyTurnover.value} />
      <Statistics label={activeClient.name} value={activeClient.value} />
    </div>
  );
};

export default StatisticsCashCodeSummary;
