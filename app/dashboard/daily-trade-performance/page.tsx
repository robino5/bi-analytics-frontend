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
  IMarginLoanUsage,
  ISectorExposure,
} from "@/types/dailyTurnoverPerformance";
import { successResponse } from "@/lib/utils";
import SummarySkeletonCard, {
  SkeletonStatistics,
} from "@/components/skeletonCard";
import { IResponse } from "@/types/utils";

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
  const marginLoanUsageOptions = [
    {
      name: "Total Allocated",
      dataKey: "totalAllocated",
      fill: BarColors.green,
      stroke: "blue",
      barLabel: false,
    },
    {
      name: "Daily Usage",
      dataKey: "dailyUsage",
      fill: BarColors.red,
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

  const [branch, setBranch] = useState<string>("");

  const [summary, setSummary] = useState<ISummaryDetails | null>(null);
  const [turnoverPerformance, setTurnoverPerformance] = useState<
    ITargetGenerated[] | null
  >(null);
  const [marginLoanUsage, setMarginLoanUsage] = useState<
    IMarginLoanUsage[] | null
  >(null);
  const [cashCodeExposure, setCashCodeExposure] = useState<
    ISectorExposure[] | null
  >(null);
  const [marginCodeExposure, setMarginCodeExposure] = useState<
    ISectorExposure[] | null
  >(null);

  const traceBranchChange = async (branchId: string) => {
    setBranch(branchId);
  };

  useEffect(() => {
    if (branch) {
      const fetchSummaryWithBranchId = async (branchId: number) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/basic-summaries/${branchId}`,
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
      const fetchDailyTurnoverPerformanceWithBranchId = async (
        branchId: number
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/daily-trade-performance/${branchId}`,
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
      // daily margin loan usage
      const fetchDailyMarginLoanUsageWithBranchId = async (
        branchId: number
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/margin-loan-usage/${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            IMarginLoanUsage[]
          >;
          if (successResponse(result.status)) {
            setMarginLoanUsage(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Summary for BranchId=${branchId}`,
            error
          );
        }
      };

      // Sector Exposure Cash Code
      const fetchCashCodeSectorExposureWithBranchId = async (
        branchId: number
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/sector-exposure-cashcode/${branchId}`,
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
      const fetchMarginCodeSectorExposureWithBranchId = async (
        branchId: number
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/sector-exposure-margincode/${branchId}`,
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
      fetchSummaryWithBranchId(branchId);
      fetchDailyTurnoverPerformanceWithBranchId(branchId);
      fetchDailyMarginLoanUsageWithBranchId(branchId);
      fetchMarginCodeSectorExposureWithBranchId(branchId);
      fetchCashCodeSectorExposureWithBranchId(branchId);
    }
  }, [branch]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/basic-summaries/`,
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
    // Daily Trade Performance
    const fetchDailyTurnoverPerformance = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/daily-trade-performance/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<ITargetGenerated[]>;
        if (successResponse(result.status)) {
          setTurnoverPerformance(result.data);
        }
      } catch (error) {
        console.error(`Error Happened while fetching Summary`, error);
      }
    };
    // Daily Margin Loan Usage
    const fetchDailyMarginLoanUsage = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/margin-loan-usage/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<IMarginLoanUsage[]>;
        if (successResponse(result.status)) {
          setMarginLoanUsage(result.data);
        }
      } catch (error) {
        console.error(`Error Happened while fetching Summary`, error);
      }
    };
    // Sector Exposure Cash Code
    const fetchCashCodeSectorExposure = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/sector-exposure-cashcode/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<ISectorExposure[]>;
        if (successResponse(result.status)) {
          setCashCodeExposure(result.data);
        }
      } catch (error) {
        console.error(`Error Happened while fetching Summary`, error);
      }
    };
    // Sector Exposure Margin Code
    const fetchMarginCodeSectorExposure = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/sector-exposure-margincode/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<ISectorExposure[]>;
        if (successResponse(result.status)) {
          setMarginCodeExposure(result.data);
        }
      } catch (error) {
        console.error(`Error Happened while fetching Summary`, error);
      }
    };

    fetchSummary();
    fetchDailyTurnoverPerformance();
    fetchDailyMarginLoanUsage();
    fetchMarginCodeSectorExposure();
    fetchCashCodeSectorExposure();
  }, []);

  return (
    <div className="mx-4">
      <title>Daily Trade Performance | LBSL</title>
      <meta
        name="description"
        content="Showing a daily trade performance analytics"
      />
      <PageHeader name="Daily Trade Performance">
        <BranchFilter onChange={traceBranchChange} currentBranch={branch} />
      </PageHeader>
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {summary?.shortSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Summary"
            subtitle="overview of clients, turnover, net buy/sell"
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
            subtitle="overview of cash codes"
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
            subtitle="overview of margin codes"
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
            title={"Daily Turnover Target"}
            subtitle="analytics of Turnover Target vs Generated"
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
        {marginLoanUsage ? (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Daily Margin Loan Usage"}
            subtitle="analytics of Total Allocated vs Daily Usage"
            children={
              <BarChartVerticalGrouped
                data={marginLoanUsage as any}
                options={marginLoanUsageOptions}
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
