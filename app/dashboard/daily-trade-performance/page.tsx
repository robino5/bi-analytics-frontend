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
  VisitData,
  RmWiseDailyTradeData
} from "@/types/dailyTurnoverPerformance";
import { getHeaderDate, successResponse } from "@/lib/utils";
import SummarySkeletonCard, {
  SkeletonStatistics,
} from "@/components/skeletonCard";
import { IResponse } from "@/types/utils";

import { PiChartScatterBold } from "react-icons/pi";
import { FaChartSimple } from "react-icons/fa6";
import { IoPieChartSharp } from "react-icons/io5";
import EcrmDetails from "@/components/eCrmDetails";
import RmWiseDailyTradingData from "./_rm_wise_daily_trade_data";
import { InvestorLiveTopBuySaleInfo } from "../business-and-trade-management/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { investorLiveBuySaleClientsColumns } from "./investor_live_top_buya_sale/_investorLiveBuySaleTableColumns";
import { DataTable as InvestorLiveBuySaleDatatable } from "./investor_live_top_buya_sale/_investorLiveBuySaleTable";
import { InvestorLiveTradeInfo } from "@/types/rmPerformance";
import { investorLiveTradeClientsColumns } from "./investor_live_trade/_investorLiveTradeTableColumns";


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
  const [eCrmDetails, seteCrmDetails] = useState<
    VisitData
  >();
  const [rmWiseDailyTradeData, setRmWiseDailyTradeData] = useState<
    RmWiseDailyTradeData[]
  >();

  const [investorTopSaleData, setInvestorTopSaleData] = useState<
    InvestorLiveTopBuySaleInfo[]
  >();

  const [investorTopBuyData, setInvestorTopBuyData] = useState<
    InvestorLiveTopBuySaleInfo[]
  >();
   const [investorLiveTrade, setInvestorLiveTrade] = useState<InvestorLiveTradeInfo[]>([]);


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
            },
          );
          const result = (await response.json()) as IResponse<ISummaryDetails>;
          if (successResponse(result.status)) {
            setSummary(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Summary for BranchId=${branchId}`,
            error,
          );
        }
      };
      // daily turnover performance
      const fetchDailyTurnoverPerformanceWithBranchId = async (
        branchId: number,
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/daily-trade-performance/${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            },
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
            error,
          );
        }
      };
      // daily margin loan usage
      const fetchDailyMarginLoanUsageWithBranchId = async (
        branchId: number,
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/margin-loan-usage/${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            },
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
            error,
          );
        }
      };

      // Sector Exposure Cash Code
      const fetchCashCodeSectorExposureWithBranchId = async (
        branchId: number,
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/sector-exposure-cashcode/${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            },
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
        branchId: number,
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/sector-exposure-margincode/${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            },
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


      // eCRM details
      const fetcheCrmDetails = async (
        branchId: number,
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/ecrm-details/?branch=${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            VisitData
          >;
          if (successResponse(result.status)) {
            seteCrmDetails(result.data);
          }
        } catch (error) {
          console.log(error)
          console.error(
            `Error Happened while ecrm Data`,
            error
          );
        }
      };

      // eCRM details
      const fetcheRmWiseDailyTradeData = async (
        branchId: number,
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/daily-trade-data/?branch=${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            RmWiseDailyTradeData[]
          >;
          if (successResponse(result.status)) {
            setRmWiseDailyTradeData(result.data);
          }
        } catch (error) {
          console.log(error)
          console.error(
            `Error Happened while ecrm Data`,
            error
          );
        }
      };

      // top 20 inverstor Sale Date
      const fetchTopInvestorSaleData = async (
        branchId: number,
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/live-investor-top-sale-rm-wise/?branch=${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            InvestorLiveTopBuySaleInfo[]
          >;
          if (successResponse(result.status)) {
            setInvestorTopSaleData(result.data);
          }
        } catch (error) {
          console.log(error)
          console.error(
            `Error Happened while ecrm Data`,
            error
          );
        }
      };

      // top 20 inverstor Buy Date
      const fetchTopInvestorBuyData = async (
        branchId: number,
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/live-investor-top-buy-rm-wise/?branch=${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            InvestorLiveTopBuySaleInfo[]
          >;
          if (successResponse(result.status)) {
            setInvestorTopBuyData(result.data);
          }
        } catch (error) {
          console.log(error)
          console.error(
            `Error Happened while ecrm Data`,
            error
          );
        }
      };
      const fetchInvestorLiveTradeDetails = async (
        branchId: number,
      ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/investor-live-trade-rm-wise/?branch=${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<InvestorLiveTradeInfo[]>;
          if (successResponse(result.status)) {
            setInvestorLiveTrade(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const branchId = Number.parseInt(branch);
      fetchSummaryWithBranchId(branchId);
      fetchDailyTurnoverPerformanceWithBranchId(branchId);
      fetchDailyMarginLoanUsageWithBranchId(branchId);
      fetchMarginCodeSectorExposureWithBranchId(branchId);
      fetchCashCodeSectorExposureWithBranchId(branchId);
      fetcheCrmDetails(branchId)
      fetcheRmWiseDailyTradeData(branchId)
      fetchTopInvestorSaleData(branchId);
      fetchTopInvestorBuyData(branchId);
      fetchInvestorLiveTradeDetails(branchId);
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
          },
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
          },
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
          },
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
          },
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
          },
        );
        const result = (await response.json()) as IResponse<ISectorExposure[]>;
        if (successResponse(result.status)) {
          setMarginCodeExposure(result.data);
        }
      } catch (error) {
        console.error(`Error Happened while fetching Summary`, error);
      }
    };

    // eCRM details
    const fetcheCrmDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/ecrm-details/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          VisitData
        >;
        if (successResponse(result.status)) {
          seteCrmDetails(result.data);
        }
      } catch (error) {
        console.log(error)
        console.error(
          `Error Happened while ecrm Data`,
          error
        );
      }
    };


    // eCRM details
    const fetcheRmWiseDailyTradeData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/daily-trade-data/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          RmWiseDailyTradeData[]
        >;
        if (successResponse(result.status)) {
          setRmWiseDailyTradeData(result.data);
        }
      } catch (error) {
        console.log(error)
        console.error(
          `Error Happened while ecrm Data`,
          error
        );
      }
    };
    // top 20 inverstor Sale Date
    const fetchTopInvestorSaleData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/live-investor-top-sale-rm-wise/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          InvestorLiveTopBuySaleInfo[]
        >;
        if (successResponse(result.status)) {
          setInvestorTopSaleData(result.data);
        }
      } catch (error) {
        console.log(error)
        console.error(
          `Error Happened while ecrm Data`,
          error
        );
      }
    };

    // top 20 inverstor Buy Date
    const fetchTopInvestorBuyData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/live-investor-top-buy-rm-wise/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          InvestorLiveTopBuySaleInfo[]
        >;
        if (successResponse(result.status)) {
          setInvestorTopBuyData(result.data);
        }
      } catch (error) {
        console.log(error)
        console.error(
          `Error Happened while ecrm Data`,
          error
        );
      }
    };
      const fetchInvestorLiveTradeDetails = async ( ) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/investor-live-trade-rm-wise/`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<InvestorLiveTradeInfo[]>;
          if (successResponse(result.status)) {
            setInvestorLiveTrade(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
    fetchSummary();
    fetchDailyTurnoverPerformance();
    fetchDailyMarginLoanUsage();
    fetchMarginCodeSectorExposure();
    fetchCashCodeSectorExposure();
    fetcheCrmDetails();
    fetcheRmWiseDailyTradeData();
    fetchTopInvestorBuyData();
    fetchTopInvestorSaleData();
    fetchInvestorLiveTradeDetails();
  }, []);

  let headerDate = null;

  if (turnoverPerformance) {
    headerDate = getHeaderDate(
      turnoverPerformance[turnoverPerformance.length - 1],
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
      <PageHeader name={`Daily Trade Performance (${headerDate ?? ""})`}>
        <BranchFilter onChange={traceBranchChange} currentBranch={branch} />
      </PageHeader>
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {summary?.shortSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Summary"
            // subtitle="overview of clients, turnover, net buy/sell"
            boardIcon={<PiChartScatterBold className="h-7 w-7 text-gray-400" />}
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
            // subtitle="overview of cash codes"
            boardIcon={<FaChartSimple className="h-7 w-7 text-gray-400" />}
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
            // subtitle="overview of margin codes"
            boardIcon={<IoPieChartSharp className="h-7 w-7 text-gray-400" />}
            children={
              <StatisticsMarginCodeSummary data={summary.marginCodeSummary} />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}

        {/* e-CRM Details */}
        {eCrmDetails &&
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"eCRM"}
            // subtitle="Shows a analytics of turnover target performance of last 7 days."
            children={
              <EcrmDetails visitedata={eCrmDetails} />
            }
          />
        }
        {/* e-CRM Details */}
        {rmWiseDailyTradeData &&
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={`RM Wise Trading data As on ${rmWiseDailyTradeData.length > 0 ? rmWiseDailyTradeData[0]?.pushDate : ""}`}
            // subtitle="Shows a analytics of turnover target performance of last 7 days."
            children={
              <RmWiseDailyTradingData data={rmWiseDailyTradeData} />
            }
          />
        }


        {investorTopBuyData ? (
          <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Top Twenty buyer ( DSE)</CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorTopBuyData}
                columns={investorLiveBuySaleClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}

        {investorTopSaleData ? (
          <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Top Twenty Seller ( DSE)</CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorTopSaleData}
                columns={investorLiveBuySaleClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}

     {investorLiveTrade ? (
          <Card className="col-span-6 mb-2 shadow-xl bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Investor Live Trade RM Wise(DSE)</CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorLiveTrade}
                columns={investorLiveTradeClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}

        {/* Turnover Performance Chart */}
        {turnoverPerformance ? (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Daily Turnover Target"}
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
            // subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={marginCodeExposure}
                options={sectorMarginCodeExposureOption}
                colorArray={["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336"]}
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
            // subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={cashCodeExposure}
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
