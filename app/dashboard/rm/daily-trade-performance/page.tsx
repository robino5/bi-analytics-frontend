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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  ITargetGenerated,
  ISummaryDetails,
  ISectorExposure,
} from "@/types/dailyTurnoverPerformance";
import { successResponse } from "@/lib/utils";
import SummarySkeletonCard, {
  SkeletonStatistics,
} from "@/components/skeletonCard";
import TraderFilter, { ITrader } from "@/components/traderFilter";
import { IResponse } from "@/types/utils";
import { RoleType } from "@/app/schemas";

import { PiChartScatterBold } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";
import { IoPieChartSharp } from "react-icons/io5";

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
  // TODO : Need to inject BranchCode in the session object
  const defaultBranch = isRM ? "12" : "";
  const defaultTrader = isRM ? session.user.username : "";
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

  const [branch, setBranch] = useState<string>(defaultBranch);
  const [trader, setTrader] = useState<string>(defaultTrader);
  const [traders, setTraders] = useState<ITrader[]>([]);

  const [summary, setSummary] = useState<ISummaryDetails | null>(null);
  const [turnoverPerformance, setTurnoverPerformance] = useState<
    ITargetGenerated[]
  >([]);
  const [cashCodeExposure, setCashCodeExposure] = useState<ISectorExposure[]>(
    []
  );
  const [marginCodeExposure, setMarginCodeExposure] = useState<
    ISectorExposure[]
  >([]);

  const traceBranchChange = async (branchId: string) => {
    setBranch(branchId);
    setTrader(defaultTrader);
  };

  const handleTraderChange = async (value: string) => {
    setTrader(value);
  };

  //effect on trader change
  useEffect(() => {
    if (trader) {
      // Fetch Summary for Branch
      const fetchSummaryWithTraderId = async (
        branchId: number,
        traderId: string
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/basic-summaries/?branch=${branchId}&trader=${traderId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<ISummaryDetails>;
          if (successResponse(result.status)) {
            setSummary(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Summary for BranchId=${branchId}`,
            error
          );
        }
      };
      // daily turnover performance
      const fetchDailyTurnoverPerformanceWithTraderId = async (
        branchId: number,
        traderId: string
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/daily-trade-performance/?branch=${branchId}&trader=${traderId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            ITargetGenerated[]
          >;
          if (successResponse(result.status)) {
            setTurnoverPerformance(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Summary for BranchId=${branchId}`,
            error
          );
        }
      };
      // Sector Exposure Cash Code
      const fetchCashCodeSectorExposureWithTraderId = async (
        branchId: number,
        traderId: string
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/sector-exposure-cashcode/?branch=${branchId}&trader=${traderId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            ISectorExposure[]
          >;
          if (successResponse(result.status)) {
            setCashCodeExposure(result.data);
          }
        } catch (error) {
          console.error(`Error Happened while fetching Summary`, error);
        }
      };
      // Sector Exposure Margin Code
      const fetchMarginCodeSectorExposureWithTraderId = async (
        branchId: number,
        traderId: string
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/sector-exposure-margincode/?branch=${branchId}&trader=${traderId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            ISectorExposure[]
          >;
          if (successResponse(result.status)) {
            setMarginCodeExposure(result.data);
          }
        } catch (error) {
          console.error(`Error Happened while fetching Summary`, error);
        }
      };
      const branchId = Number.parseInt(branch);
      fetchSummaryWithTraderId(branchId, trader);
      fetchDailyTurnoverPerformanceWithTraderId(branchId, trader);
      fetchCashCodeSectorExposureWithTraderId(branchId, trader);
      fetchMarginCodeSectorExposureWithTraderId(branchId, trader);
    }
  }, [trader]);

  // effect on branch change
  useEffect(() => {
    if (branch && !trader) {
      // Fetch Traders
      const fetchTraderWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/lov/traders/${branch}/`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          const result = (await response.json()) as IResponse<ITrader[]>;
          if (successResponse(result.status)) {
            setTraders(result.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      // Fetch Summary for Branch
      const fetchSummaryWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/basic-summaries/?branch=${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<ISummaryDetails>;
          if (successResponse(result.status)) {
            setSummary(result.data);
          }
        } catch (error) {
          console.error(`Error Happened while fetching Summary`, error);
        }
      };
      // daily turnover performance
      const fetchDailyTurnoverPerformanceWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/daily-trade-performance/?branch=${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            ITargetGenerated[]
          >;
          if (successResponse(result.status)) {
            setTurnoverPerformance(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching daily turnover performance`,
            error
          );
        }
      };

      // Sector Exposure Cash Code
      const fetchCashCodeSectorExposureWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/sector-exposure-cashcode/?branch=${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            ISectorExposure[]
          >;
          if (successResponse(result.status)) {
            setCashCodeExposure(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching sector exposure cash code`,
            error
          );
        }
      };
      // Sector Exposure Margin Code
      const fetchMarginCodeSectorExposureWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/sector-exposure-margincode/?branch=${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            ISectorExposure[]
          >;
          if (successResponse(result.status)) {
            setMarginCodeExposure(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching sector exposure margin code`,
            error
          );
        }
      };
      fetchTraderWithBranchId();
      fetchSummaryWithBranchId();
      fetchDailyTurnoverPerformanceWithBranchId();
      fetchMarginCodeSectorExposureWithBranchId();
      fetchCashCodeSectorExposureWithBranchId();
    } else {
      // Fetch Traders
      const fetchTraderWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/lov/traders/${branch}/`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          const result = (await response.json()) as IResponse<ITrader[]>;
          if (successResponse(result.status)) {
            setTraders(result.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchTraderWithBranchId();
    }
  }, [branch]);

  return (
    <div className="mx-4">
      <title>Daily Trade Performance | LBSL</title>
      <meta
        name="description"
        content="Showing a daily trade performance analytics"
      />
      <PageHeader name="Daily Trade Performance">
        <BranchFilter onChange={traceBranchChange} currentBranch={branch} />
        <TraderFilter
          currentTrader={trader}
          traders={traders}
          onChange={handleTraderChange}
        />
      </PageHeader>
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {summary?.shortSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Summary"
            subtitle="shows overall short summary"
            boardIcon={<PiChartScatterBold className="h-7 w-7 text-gray-400"/>}
            children={
              <StatisticsCardClientTurnoverSummary
                data={summary.shortSummary}
              />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {summary?.cashCodeSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Cash Code Status"
            subtitle="shows cash code summary"
            boardIcon={<FaChartSimple className="h-7 w-7 text-gray-400"/>}
            children={
              <StatisticsCashCodeSummary data={summary.cashCodeSummary} />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {summary?.marginCodeSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Margin Code Status"
            subtitle="shows margin code summary"
            boardIcon={<IoPieChartSharp className="h-7 w-7 text-gray-400"/>}
            children={
              <StatisticsMarginCodeSummary data={summary.marginCodeSummary} />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {/* Turnover Performance Chart */}
        {turnoverPerformance ? (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Turnover Performance"}
            subtitle="Shows a analytics of turnover performance of last 7 days."
            children={
              <BarChartVerticalGrouped
                data={turnoverPerformance}
                options={turnoverChartOptions}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}

        {marginCodeExposure ? (
          <CardBoard
            className="col-span-6 row-span-2 xl:col-span-3"
            title="Sector Exposure Margin Code"
            subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={marginCodeExposure}
                options={sectorMarginCodeExposureOption}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}
        {cashCodeExposure ? (
          <CardBoard
            className="col-span-6 row-span-2 xl:col-span-3"
            title="Sector Exposure Cash Code"
            subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={cashCodeExposure}
                options={sectorCashCodeExposureOption}
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
