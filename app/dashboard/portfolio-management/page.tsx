"use client";

import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import BarChartPositiveNegative from "@/components/BarChartPositiveNegative";
import BarChartBiAxis from "@/components/BarChartBiAxis";
import NewAccountOpeningDataTable from "./_new_account_datatable";
import TurnoverPerformanceDataTable from "./_turnover_performance_datatable";
import PortfolioManagementStatusDataTable from "./_portfolio_management_status_datatable";
import { BarColors } from "@/components/ui/utils/constants";
import BranchFilter from "@/components/branchFilter";
import { getHeaderDate } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useBranchStore } from "@/lib/stores/branchStore";
import { useQuery } from "@tanstack/react-query";
import { portfolioManagementAPI } from "./api";
import LoadingButton from "@/components/loading";

export default function PortfolioManagement() {
  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // ===========================================
  const { data: session } = useSession();

  const dailyNetFundFlowOption = {
    dataKey: "tradingDate",
    valueKey: "amount",
    fill: BarColors.orange,
    stroke: "#c3ce",
    barLabel: true,
  };
  const biaxialChartOption = {
    dataKey: "tradingDate",
    valueKeyA: "activeClients",
    valueKeyB: "turnover",
    fill: "#c200fb",
    fill2: "#3498DB",
    stroke: "#c3ce",
    barLabel: true,
    rotate: 90,
    title: "Clients Trade vs Turnover",
    cardColor: "bg-[#0e5e6f]"
  };

  const branch = useBranchStore((state) => state.branch);
  const setBranch = useBranchStore((state) => state.setBranch);

  const { data: netFundFlow,isPending:netFundFlowPending } = useQuery({
    queryKey: ["netFundFlow", branch],
    queryFn: () => portfolioManagementAPI.getDailyNetFundFlow(branch)
  });

  const { data: tradeVsturnover,isPending:tradeVsturnoverPending } = useQuery({
    queryKey: ["tradeVsturnover", branch],
    queryFn: () => portfolioManagementAPI.getTradeVsClientsWithBranchId(branch)
  });

  const { data: turnover,isPending:turnoverPending } = useQuery({
    queryKey: ["turnover", branch],
    queryFn: () => portfolioManagementAPI.getTurnoverPerformanceWithBranchId(branch)
  });

  const { data: accountsFundFlow,isPending:accountsFundFlowPending } = useQuery({
    queryKey: ["accountsFundFlow", branch],
    queryFn: () => portfolioManagementAPI.getAccountsFundFlow(branch)
  });

  const { data: portfolioStatus,isPending:portfolioStatusPending } = useQuery({
    queryKey: ["portfolioStatus", branch],
    queryFn: () => portfolioManagementAPI.getPortfolioStatus(branch)
  });
  
  const isLoading = turnoverPending || netFundFlowPending || tradeVsturnoverPending || accountsFundFlowPending || portfolioStatusPending;
  
  if (isLoading) {
    return <LoadingButton text="Loading..." />
  }


  const handleBranchChange = (branchId: string) => {
    setBranch(branchId);
  };



  let headerDate = null;

  if (netFundFlow?.data) {
    headerDate = getHeaderDate(
      netFundFlow?.data[netFundFlow?.data.length - 1],
      "tradingDate",
    );
  }

  return (
    <div className="mx-4">
      <PageHeader name={`Portfolio Management (${headerDate ?? ""})`}>
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
      </PageHeader>
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {/* Daily Net Fund Flow Chart */}
        {netFundFlow?.data ? (
          <CardBoard
            className="col-span-3"
            title="Daily Net Fund Flow"
            children={
              <BarChartPositiveNegative
                data={netFundFlow?.data as any}
                options={dailyNetFundFlowOption}
              />
            }
          />
        ) : null}

        {/* Client Trade vs Turnover Chart */}
        {tradeVsturnover?.data ? (
          <BarChartBiAxis
            data={tradeVsturnover?.data as any}
            options={biaxialChartOption}
          />) : null}
        {/* Turnover Performance Data Table */}
        {turnover?.data ? (
          <TurnoverPerformanceDataTable records={turnover?.data as any} />
        ) : null}
        {/* New Account Opening & Function Collection Data Table */}
        {accountsFundFlow?.data ? (
          <NewAccountOpeningDataTable accounts={accountsFundFlow?.data} />
        ) : null}
        {/* Portfolio Mangement Status Data Table */}
        {portfolioStatus?.data ? (
          <PortfolioManagementStatusDataTable
            records={portfolioStatus?.data as any}
          />
        ) : null}
      </div>
    </div>
  );
}
