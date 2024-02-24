import { Separator } from "@/components/ui/separator";
import Statistics from "./ui/statistics";
import { FC } from "react";
import { LovResultType } from "@/lib/types";


interface ClientTurnoverProps {
  totalClient: LovResultType;
  activeClient: LovResultType;
  turnover: LovResultType;
  netBuySell: LovResultType;
}

interface SummaryData {
  data: ClientTurnoverProps;
}

const StatisticsCardClientTurnoverSummary: FC<SummaryData> = ({ data }) => {
  const { totalClient, activeClient, turnover, netBuySell } = data;
  return (
    <div className="flex h-full w-full flex-row justify-between items-center">
      <Statistics label={totalClient.name} value={totalClient.value} />
      <Statistics label={activeClient.name} value={activeClient.value} />
      <Statistics label={turnover.name} value={turnover.value} />
      <Statistics label={netBuySell.name} value={netBuySell.value} />
    </div>
  );
};

export default StatisticsCardClientTurnoverSummary;
