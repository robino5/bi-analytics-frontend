"use client";

import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartVerticalGrouped from "@/components/BarChartVerticalGrouped";
import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import StatisticsCardClientTurnoverSummary from "@/components/StatisticsCardClientTurnoverSummary";
import StatisticsCashCodeSummary from "@/components/StatisticsCashCodeSummary";
import StatisticsMarginCodeSummary from "@/components/StatisticsMarginCodeSummary";
import { BarColors } from "@/components/ui/utils/constants";
import BranchFilter from "@/components/branchFilter";
import { useSession } from "next-auth/react";
import { getHeaderDate } from "@/lib/utils";
import SummarySkeletonCard, {
  SkeletonStatistics,
} from "@/components/skeletonCard";
import { PiChartScatterBold } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";
import { IoPieChartSharp } from "react-icons/io5";
import EcrmDetails from "@/components/eCrmDetails";
import RmWiseDailyTradingData from "./_rm_wise_daily_trade_data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { investorLiveBuySaleClientsColumns } from "./investor_live_top_buya_sale/_investorLiveBuySaleTableColumns";
import { DataTable as InvestorLiveBuySaleDatatable } from "./investor_live_top_buya_sale/_investorLiveBuySaleTable";
import { investorLiveTradeClientsColumns } from "./investor_live_trade/_investorLiveTradeTableColumns";
import { useBranchStore } from "@/lib/stores/branchStore";
import { useQuery } from "@tanstack/react-query";
import { dailyTradePerformanceAPI } from "./api";
import { DseLiveTrade } from "@/components/dse-live-trade";
import { branchWiseNonePerformingClientColumns } from "./brach_wise_none_performing_client/_branchWiseNonePerformingClientColumns";
import { DataTable as BranchWiseNonePerformingClientDatatable } from "./brach_wise_none_performing_client/_branchWiseNonePerformingClientTable";
import { Ticker } from "@/components/ticker";
import LiveIndicator from "@/components/ui/live-indicator";


export default function DailyTradePerformance() {
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

  const turnoverChartOptions = [
    {
      name: "Target",
      dataKey: "target",
      fill: BarColors.light_blue,
      stroke: "blue",
      barLabel: false,
    },
    {
      name: "Generated",
      dataKey: "generated",
      fill: BarColors.purple,
      stroke: "purple",
      barLabel: true,
    },
  ];
  const marginLoanUsageOptions = [
    {
      name: "Total Allocated",
      dataKey: "totalAllocated",
      fill: BarColors.purple,
      stroke: "blue",
      barLabel: false,
    },
    {
      name: "Daily Usage",
      dataKey: "dailyUsage",
      fill: BarColors.light_blue,
      stroke: "purple",
      barLabel: true,
    },
  ];

  const sectorMarginCodeExposureOption = {
    legendName: "Quantity",
    dataKey: "name",
    valueKey: "value",
    fill: BarColors.blue,
    stroke: "purple",
    height: 700,
    barLabel: true,
  };

  const sectorCashCodeExposureOption = {
    ...sectorMarginCodeExposureOption,
    fill: BarColors.purple,
  };

  const branch = useBranchStore((state) => state.branch);
  const setBranch = useBranchStore((state) => state.setBranch);

  const { data: summarydata } = useQuery({
    queryKey: ["summarydata", branch],
    queryFn: () => dailyTradePerformanceAPI.getSummary(branch)
  });

  const { data: turnoverPerformance } = useQuery({
    queryKey: ["turnoverPerformance", branch],
    queryFn: () => dailyTradePerformanceAPI.getDailyTurnoverPerformance(branch)
  });

  const { data: marginLoanUsage } = useQuery({
    queryKey: ["marginLoanUsage", branch],
    queryFn: () => dailyTradePerformanceAPI.getDailyMarginLoanUsageWithBranchId(branch)
  });

  const { data: cashCodeExposure } = useQuery({
    queryKey: ["cashCodeExposure", branch],
    queryFn: () => dailyTradePerformanceAPI.getCashCodeSectorExposureWithBranchId(branch)
  });


  const { data: marginCodeExposure } = useQuery({
    queryKey: ["marginCodeExposure", branch],
    queryFn: () => dailyTradePerformanceAPI.getMarginCodeSectorExposureWithBranchId(branch)
  });

  const { data: eCrmDetails } = useQuery({
    queryKey: ["eCrmDetails", branch],
    queryFn: () => dailyTradePerformanceAPI.geteCrmDetails(branch)
  });

  const { data: rmWiseDailyTradeData } = useQuery({
    queryKey: ["rmWiseDailyTradeData", branch],
    queryFn: () => dailyTradePerformanceAPI.getRmWiseDailyTradeData(branch)
  });
  const { data: investorTopSaleData } = useQuery({
    queryKey: ["investorTopSaleData", branch],
    queryFn: () => dailyTradePerformanceAPI.getTopInvestorSaleData(branch)
  });
  const { data: investorTopBuyData } = useQuery({
    queryKey: ["investorTopBuyData", branch],
    queryFn: () => dailyTradePerformanceAPI.getTopInvestorBuyData(branch)
  });

  const { data: investorLiveTrade } = useQuery({
    queryKey: ["investorLiveTrade", branch],
    queryFn: () => dailyTradePerformanceAPI.getInvestorLiveTradeDetails(branch)
  });

  const { data: branchWiseNonePerforminigClients } = useQuery({
    queryKey: ["branchWiseNonePerforminigClients", branch],
    queryFn: () => dailyTradePerformanceAPI.getBranchWiseNonePerforminigClients(branch)
  });

    const { data: sectorwiseTrunoverComparison } = useQuery({
      queryKey: ['sectorwiseTrunoverComparison', branch], // ✅ separate cache per branch+trader
      queryFn: () => dailyTradePerformanceAPI.getRmWLiveTurnoverSectorWise(branch),
    });



  const traceBranchChange = async (branchId: string) => {
    setBranch(branchId);
  };

  let headerDate = null;

  if (turnoverPerformance?.data) {
    headerDate = getHeaderDate(
      turnoverPerformance?.data[turnoverPerformance?.data?.length - 1],
      "tradingDate",
    );
  }

  return (
    <div className="mx-4">
      <title>Daily Trade Performance | LBSL</title>
      <meta
        name="description"
        content="Showing a daily trade performance analytics"
      />
      <PageHeader name={`Daily Trade Performance as on ${localStorage?.getItem('push-data') ?? ""}`} updateStatus="* This data is updated every 15 minutes.">
        <BranchFilter onChange={traceBranchChange} currentBranch={branch} />
      </PageHeader>
      <Ticker />
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 ">
        {summarydata?.data?.shortSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Summary"
            // subtitle="overview of clients, turnover, net buy/sell"
            boardIcon={<PiChartScatterBold className="h-7 w-7 text-gray-400" />}
            children={
              <StatisticsCardClientTurnoverSummary
                data={summarydata.data.shortSummary}
              />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {summarydata?.data?.cashCodeSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Cash Code Status (Trade Clients)"
            // subtitle="overview of cash codes"
            boardIcon={<FaChartSimple className="h-7 w-7 text-gray-400" />}
            children={
              <StatisticsCashCodeSummary data={summarydata.data.cashCodeSummary} />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {summarydata?.data?.marginCodeSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Margin Code Status (Trade Clients)"
            // subtitle="overview of margin codes"
            boardIcon={<IoPieChartSharp className="h-7 w-7 text-gray-400" />}
            children={
              <StatisticsMarginCodeSummary data={summarydata.data.marginCodeSummary} />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}

        <div className="rounded-md xl:col-span-3">
          <DseLiveTrade />
        </div>

        {/* e-CRM Details */}
        {eCrmDetails?.data &&
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"eCRM"}
            // subtitle="Shows a analytics of turnover target performance of last 7 days."
            children={
              <EcrmDetails visitedata={eCrmDetails?.data} />
            }
          />
        }
            {sectorwiseTrunoverComparison?.data ? (
          <CardBoard
            className="col-span-6 row-span-2 xl:col-span-3"
            title="DSE Live Sector Wise Turnover"
            liveIndicator={true}
            // subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={(sectorwiseTrunoverComparison?.data ?? []).map((item: any) => ({
                  name: item.name,
                  value: item.primaryValue,   // taking primaryValue as value
                }))}
                options={sectorMarginCodeExposureOption}
                colorArray={["#c200fb",]}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}

        {sectorwiseTrunoverComparison?.data ? (
          <CardBoard
            className="col-span-6 row-span-2 xl:col-span-3"
            title="LBSL Live Sector Wise Turnover"
            liveIndicator={true}
            // subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={sectorwiseTrunoverComparison?.data
                  ?.map((item: any) => ({
                    name: item.name,
                    value: item.secondaryValue,
                  }))
                  .sort((a: any, b: any) => b.value - a.value) // sort descending
                }
                options={sectorMarginCodeExposureOption}
                colorArray={["#ff7a56",]}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}
        {/* e-CRM Details */}
        {rmWiseDailyTradeData?.data &&
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="RM Wise Trading data As on"
            pushdate={rmWiseDailyTradeData?.data.length > 0 ? rmWiseDailyTradeData?.data[0]?.pushDate : ""}
            // subtitle="Shows a analytics of turnover target performance of last 7 days."
            children={
              <RmWiseDailyTradingData data={rmWiseDailyTradeData?.data} />
            }
          />

        }
        {branchWiseNonePerforminigClients?.data ? (
          <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Non Performing clients-{branchWiseNonePerforminigClients?.data?.length}</CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <BranchWiseNonePerformingClientDatatable
                data={branchWiseNonePerforminigClients?.data}
                columns={branchWiseNonePerformingClientColumns}
              />
            </CardContent>
          </Card>
        ) : <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#033e4a]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg">Non Performing clients-{branchWiseNonePerforminigClients?.data?.length}</CardTitle>
          </CardHeader>
          <CardContent className="mt-3">
            loading......
          </CardContent>
        </Card>}

        
        {investorTopBuyData?.data ? (
          <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Twenty buyer <LiveIndicator /></CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorTopBuyData?.data}
                columns={investorLiveBuySaleClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}

        {investorTopSaleData?.data ? (
          <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Twenty Seller <LiveIndicator /></CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorTopSaleData?.data}
                columns={investorLiveBuySaleClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}

        {investorLiveTrade?.data ? (
          <Card className="col-span-6 mb-2 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg flex items-center gap-2">Investor Live Trade RM Wise <LiveIndicator /></CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorLiveTrade?.data}
                columns={investorLiveTradeClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}

        {/* Turnover Performance Chart */}
        {turnoverPerformance?.data ? (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Daily Turnover Target"}
            children={
              <BarChartVerticalGrouped
                data={turnoverPerformance?.data}
                options={turnoverChartOptions}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}
        {marginLoanUsage?.data ? (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Daily Margin Loan Usage"}
            children={
              <BarChartVerticalGrouped
                data={marginLoanUsage?.data as any}
                options={marginLoanUsageOptions}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}

        {marginCodeExposure?.data ? (
          <CardBoard
            className="col-span-6 row-span-2 xl:col-span-3"
            title="Sector Exposure Margin Code"
            // subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={marginCodeExposure?.data}
                options={sectorMarginCodeExposureOption}
                colorArray={["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336"]}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}
        {cashCodeExposure?.data ? (
          <CardBoard
            className="col-span-6 row-span-2 xl:col-span-3"
            title="Sector Exposure Cash Code"
            // subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={cashCodeExposure?.data}
                options={sectorCashCodeExposureOption}
                colorArray={["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336"]}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}
      </div>
    </div>
  );
}
