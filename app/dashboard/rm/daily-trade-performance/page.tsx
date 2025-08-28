"use client";

import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartVerticalGrouped from "@/components/BarChartVerticalGrouped";
import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import StatisticsCardClientTurnoverSummary from "@/components/StatisticsCardClientTurnoverSummary";
import StatisticsCashCodeSummary from "@/components/StatisticsCashCodeSummary";
import StatisticsMarginCodeSummary from "@/components/StatisticsMarginCodeSummary";
import EcrmDetails from "@/components/eCrmDetails";
import { BarColors } from "@/components/ui/utils/constants";
import BranchFilter from "@/components/branchFilter";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SummarySkeletonCard, {
  SkeletonStatistics,
} from "@/components/skeletonCard";
import TraderFilter, { ITrader } from "@/components/traderFilter";
import { IResponse } from "@/types/utils";
import { RoleType } from "@/app/schemas";
import { PiChartScatterBold } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";
import { IoPieChartSharp } from "react-icons/io5";
import RmWiseDailyTradingData from "./_rm_wise_daily_trade_data";
import { DseLiveTrade } from "@/components/dse-live-trade";
import { useBranchStore } from "@/lib/stores/branchStore";
import { useTraderStore } from "@/lib/stores/rmStore";
import { useQuery } from "@tanstack/react-query";
import { dailyTradePerformance } from "./api";
import { Ticker } from "@/components/ticker";
import BarChartHorizontalComparison from "@/components/BarChartHorizontalComprison";

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
  const isRM = session?.user.role.toString() === RoleType.REGIONAL_MANAGER;
  const defaultBranch = isRM ? session?.user?.branchId : "";
  const defaultTrader = isRM ? session?.user.username : "";
  const turnoverChartOptions = [
    {
      name: "Target",
      dataKey: "target",
      fill: BarColors.red,
      stroke: "blue",
      barLabel: false,
    },
    {
      name: "Generated",
      dataKey: "generated",
      fill: BarColors.green,
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
  const trader = useTraderStore((state) => state.trader)
  const setTrader = useTraderStore((state) => state.setTrader);
  //const [traders, setTraders] = useState<ITrader[]>([]);


  // const [eCrmDetails, seteCrmDetails] = useState<
  //   VisitData
  // >();


  const traceBranchChange = async (branchId: string) => {
    setBranch(branchId);
    setTrader(defaultTrader);
  };

  const handleTraderChange = async (value: string) => {
    setTrader(value);
  };

  useEffect(() => {
    if (session?.user?.role?.toString() === RoleType.REGIONAL_MANAGER) {
      setBranch(session.user.branchId);
    }
  }, [session, setBranch]);

  useEffect(() => {
    if (session?.user?.role?.toString() === RoleType.REGIONAL_MANAGER) {
      setTrader(session.user.username);
    }
  }, [session, setTrader]);

  const { data: traders } = useQuery({
    queryKey: ["traders", branch],
    queryFn: () => dailyTradePerformance.getTraderWithBranchId(branch)
  });

  const { data: summary } = useQuery({
    queryKey: ['summary', branch, trader], // ✅ separate cache per branch+trader
    queryFn: () => dailyTradePerformance.getSummaryWithTraderId(branch, trader),
    enabled: !!branch,
  });


  const { data: eCrmDetails } = useQuery({
    queryKey: ['eCrmDetails', branch, trader], // ✅ separate cache per branch+trader
    queryFn: () => dailyTradePerformance.getEcrmDetails(branch, trader),
    enabled: !!branch,
  });

  const { data: turnoverPerformance } = useQuery({
    queryKey: ['turnoverPerformance', branch, trader], // ✅ separate cache per branch+trader
    queryFn: () => dailyTradePerformance.getDailyTurnoverPerformanceWithTraderId(branch, trader),
    enabled: !!branch,
  });

  const { data: cashCodeExposure } = useQuery({
    queryKey: ['cashCodeExposure', branch, trader], // ✅ separate cache per branch+trader
    queryFn: () => dailyTradePerformance.getCashCodeSectorExposureWithTraderId(branch, trader),
    enabled: !!branch,
  });

  const { data: marginCodeExposure } = useQuery({
    queryKey: ['marginCodeExposure', branch, trader], // ✅ separate cache per branch+trader
    queryFn: () => dailyTradePerformance.getMarginCodeSectorExposureWithTraderId(branch, trader),
    enabled: !!branch,
  });
  const { data: rmWiseDailyTradeData } = useQuery({
    queryKey: ['rmWiseDailyTradeData', branch, trader], // ✅ separate cache per branch+trader
    queryFn: () => dailyTradePerformance.getRmWiseDailyTradeData(branch, trader),
    enabled: !!branch,
  });

  const { data: sectorwiseTrunoverComparison } = useQuery({
    queryKey: ['sectorwiseTrunoverComparison', branch, trader], // ✅ separate cache per branch+trader
    queryFn: () => dailyTradePerformance.getRmWLiveTurnoverSectorWise(branch, trader),
    enabled: !!branch,
  });
  useEffect(() => {
    if (!branch || branch === "") {
      if (isRM) {
        traceBranchChange(session?.user?.branchId || "")
      }
      else {
        traceBranchChange('11')
      }

    }
  }, [branch, setBranch]);

  // useEffect(() => {
  //   if (!trader || trader === "") {
  //     if (traders?.data?.length) {
  //       handleTraderChange(traders.data[0].traderId);
  //     }
  //   }
  // }, [trader, setTrader]);


  return (
    <div className="mx-4">
      <title>Daily Trade Performance | LBSL</title>
      <meta
        name="description"
        content="Showing a daily trade performance analytics"
      />
      <PageHeader name={`Daily Trade Performance as on ${localStorage?.getItem('push-data') ?? ""}`} updateStatus="* This data is updated every 15 minutes.">
        <BranchFilter onChange={traceBranchChange} currentBranch={branch} />
        <TraderFilter
          currentTrader={trader}
          traders={traders?.data || []}
          onChange={handleTraderChange}
        />
      </PageHeader>
      <Ticker />
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6">
        {summary?.data?.shortSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Summary"
            // subtitle="shows overall short summary"
            boardIcon={<PiChartScatterBold className="h-7 w-7 text-gray-400" />}
            children={
              <StatisticsCardClientTurnoverSummary
                data={summary?.data?.shortSummary}
              />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {summary?.data?.cashCodeSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Cash Code Status (Trade Clients)"
            // subtitle="shows cash code summary"
            boardIcon={<FaChartSimple className="h-7 w-7 text-gray-400" />}
            children={
              <StatisticsCashCodeSummary data={summary?.data?.cashCodeSummary} />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {summary?.data?.marginCodeSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Margin Code Status (Trade Clients)"
            // subtitle="shows margin code summary"
            boardIcon={<IoPieChartSharp className="h-7 w-7 text-gray-400" />}
            children={
              <StatisticsMarginCodeSummary data={summary?.data?.marginCodeSummary} />
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

        {turnoverPerformance?.data ? (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Daily Turnover Target"}
            // subtitle="Shows a analytics of turnover target performance of last 7 days."
            children={
              <BarChartVerticalGrouped
                data={turnoverPerformance?.data || []}
                options={turnoverChartOptions}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}


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
                colorArray={[
                  "#FF5733", // Red
                  "#3498DB", // Blue
                  "#2ECC71", // Green
                  "#F1C40F", // Yellow
                  "#9B59B6"  // Purple
                ]}
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
