"use client";

import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import {
  ClientTurnoverBiAxial,
  DailyNetFundFlowDataType,
  NewAccountOrTurnoverPerformanceDataType,
  PortfolioMangementStatusDataType,
} from "./columns";
import BarChartPositiveNegative from "@/components/BarChartPositiveNegative";
import BarChartBiAxis from "@/components/BarChartBiAxis";

import NewAccountOpeningDataTable from "./_new_account_datatable";
import TurnoverPerformanceDataTable from "./_turnover_performance_datatable";
import PortfolioManagementStatusDataTable from "./_portfolio_management_status_datatable";
import { BarColors } from "@/components/ui/utils/constants";
import { useEffect, useState } from "react";
import BranchFilter from "@/components/branchFilter";
import { successResponse } from "@/lib/utils";

import { getSession } from "next-auth/react";
import {
  INetFundFlow,
  ITradeVsClients,
  ITurnoverPerformance,
} from "@/types/portfolioManagement";

function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function convertToBarData(data: any[]) {
  return data.map((item) => ({
    name: formatDate(new Date(item.tradingDate)),
    value: item.amount,
  }));
}

async function fetchPortfolioMangementData(): Promise<
  PortfolioMangementStatusDataType[]
> {
  return [
    {
      name: "1. NUMBER OF CLIENTS",
      amount: 59930,
    },
    {
      name: "2. TOTAL EQUITY",
      amount: 492803838,
    },
    {
      name: "3. TOTAL STOCK VALUE",
      amount: 5922333221,
    },
    {
      name: "4. MARGIN LOAN AVAILED",
      amount: -271934343,
    },
    {
      name: "5. AVAILABLE CASH BALANCE",
      amount: 271934343,
    },
    {
      name: "6. PORTFOLIO SIZE AS ON DATE",
      amount: 971934343,
    },
    {
      name: "7. NET FUND FLOW THIS YEAR",
      amount: 371934343,
    },
    {
      name: "8. COMMISSION EARNED (AS ON DATE)",
      amount: 571934343,
    },
  ];
}

async function fetchNewAccountOrFundCollectionData(): Promise<
  NewAccountOrTurnoverPerformanceDataType[]
> {
  return [
    {
      name: "1.No. of New Clients",
      daily: 34234,
      weekly: 141324,
      forthnightly: 5656223,
      monthly: 1288833,
    },
    {
      name: "2.Fund In - Existing A/C",
      daily: -1288833,
      weekly: 5656223,
      forthnightly: 1656223,
      monthly: 56562,
    },
    {
      name: "3.Fund Withdrawal",
      daily: 56562,
      weekly: 565620,
      forthnightly: 16562,
      monthly: 5632,
    },
    {
      name: "4.Net FundInflow/ (Outflow)",
      daily: 56320,
      weekly: 5632122,
      forthnightly: 2239,
      monthly: 12129,
    },
  ];
}
async function fetchTurnoverPerformanceData(): Promise<
  NewAccountOrTurnoverPerformanceDataType[]
> {
  return [
    {
      name: "1.Turnover target",
      daily: 34234,
      weekly: 141324,
      forthnightly: 5656223,
      monthly: 1288833,
    },
    {
      name: "2.Turnover Generated",
      daily: 14234,
      weekly: 241324,
      forthnightly: 3656223,
      monthly: 3221833,
    },
    {
      name: "3.Achieved Turnover (times of target)",
      daily: -234990,
      weekly: 393384,
      forthnightly: 67333,
      monthly: -4311,
    },
  ];
}

async function fetchDailyNetFundFlowChartData(): Promise<
  DailyNetFundFlowDataType[]
> {
  return [
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-08T00:00:00",
      amount: 54986205.27,
    },
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-11T00:00:00",
      amount: 112165360.8,
    },
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-12T00:00:00",
      amount: -137279159.09,
    },
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-13T00:00:00",
      amount: 39016691.88,
    },
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-14T00:00:00",
      amount: 177878345.84,
    },
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-15T00:00:00",
      amount: -72075913.51,
    },
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-18T00:00:00",
      amount: 11179814.27,
    },
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-21T00:00:00",
      amount: 223179814.27,
    },
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-24T00:00:00",
      amount: 23279814.27,
    },
    {
      branchCode: null,
      branchName: null,
      tradingDate: "2024-02-27T00:00:00",
      amount: 32879814.27,
    },
  ];
}
async function fetchClientTurnoverBiAxialChartData(): Promise<
  ClientTurnoverBiAxial[]
> {
  return [
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-08T00:00:00",
      client: 3000,
      turnover: 14986205.27,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-11T00:00:00",
      client: 5999,
      turnover: 212165360.8,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-12T00:00:00",
      client: 8337,
      turnover: 11727915,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-13T00:00:00",
      client: 1273,
      turnover: 49016691.88,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-14T00:00:00",
      client: 1373,
      turnover: 277878345.84,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-15T00:00:00",
      client: 2234,
      turnover: 17878345.84,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-18T00:00:00",
      client: 9383,
      turnover: 9979814.27,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-21T00:00:00",
      client: 8382,
      turnover: 19979814.27,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-23T00:00:00",
      client: 23341,
      turnover: 33979814.27,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-26T00:00:00",
      client: 3444,
      turnover: 99979814.27,
    },
    {
      branchCode: null,
      branchName: null,
      date: "2024-02-28T00:00:00",
      client: 5999,
      turnover: 19979814.27,
    },
  ];
}

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
    fill: "#ff3355",
    stroke: "#c3ce",
  };

  const [branch, setBranch] = useState("");
  const [netFundFlow, setNetFundFlow] = useState<INetFundFlow[] | null>(null);
  const [tradeVsturnover, setTradeVsTurnover] = useState<
    ITradeVsClients[] | null
  >(null);
  const [turnover, setTurnover] = useState<ITurnoverPerformance[] | null>(null);

  const handleBranchChange = (branchId: string) => {
    setBranch(branchId);
  };

  // on page load
  useEffect(() => {
    // Daily Net Fund Flow
    const fetchDailyNetFundFlow = async () => {
      const session = await getSession();
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/daily-net-fundflow/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<INetFundFlow[]>;
        if (successResponse(result.status)) {
          setNetFundFlow(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching daily net fund flow`,
          error
        );
      }
    };
    // Trade Vs Clients Statistics
    const fetchTradeVsClients = async () => {
      const session = await getSession();
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/trade-vs-clients/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<ITradeVsClients[]>;
        if (successResponse(result.status)) {
          setTradeVsTurnover(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching daily net fund flow`,
          error
        );
      }
    };
    // Turnover Performance Statistics
    const fetchTurnoverPerformance = async () => {
      const session = await getSession();
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/turnover-performance/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          ITurnoverPerformance[]
        >;
        if (successResponse(result.status)) {
          setTurnover(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching daily net fund flow`,
          error
        );
      }
    };
    fetchDailyNetFundFlow();
    fetchTradeVsClients();
    fetchTurnoverPerformance();
  }, []);

  // on branch change
  useEffect(() => {
    if (branch) {
      const fetchNetFundFlowWithBranchId = async (branchId: number) => {
        const session = await getSession();
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/daily-net-fundflow/${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<INetFundFlow[]>;
          if (successResponse(result.status)) {
            setNetFundFlow(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching daily net fund flow with branchId = ${branchId}`,
            error
          );
        }
      };

      // Trade Vs Clients Statistics
      const fetchTradeVsClientsWithBranchId = async (branchId: number) => {
        const session = await getSession();
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/trade-vs-clients/${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            ITradeVsClients[]
          >;
          if (successResponse(result.status)) {
            setTradeVsTurnover(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching trade vs clients with branchId=${branchId}`,
            error
          );
        }
      };

      // Turnover Performance Statistics
      const fetchTurnoverPerformanceWithBranchId = async (branchId: number) => {
        const session = await getSession();
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/turnover-performance/${branchId}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            ITurnoverPerformance[]
          >;
          if (successResponse(result.status)) {
            setTurnover(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching daily net fund flow`,
            error
          );
        }
      };
      const branchId = Number.parseInt(branch);
      fetchNetFundFlowWithBranchId(branchId);
      fetchTradeVsClientsWithBranchId(branchId);
      fetchTurnoverPerformanceWithBranchId(branchId);
    }
  }, [branch]);

  return (
    <div className="mx-4">
      <PageHeader name="Portfolio Management">
        <BranchFilter onChange={handleBranchChange} />
      </PageHeader>
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {/* Daily Net Fund Flow Chart */}
        {netFundFlow ? (
          <CardBoard
            className="lg:col-span-3"
            title="Daily Net Fund Flow"
            subtitle="short summary of the portfolio"
            children={
              <BarChartPositiveNegative
                data={netFundFlow as any}
                options={dailyNetFundFlowOption}
              />
            }
          />
        ) : null}

        {/* Client Trade vs Turnover Chart */}
        <CardBoard
          className="lg:col-span-3"
          title="Clients Trade vs Turnover"
          subtitle="analysis of total clients traded vs lsbl turnover"
          children={
            <BarChartBiAxis
              data={tradeVsturnover as any}
              options={biaxialChartOption}
            />
          }
        />
        {/* Turnover Performance Data Table */}
        {turnover ? (
          <TurnoverPerformanceDataTable records={turnover as any} />
        ) : null}
        {/* New Account Opening & Function Collection Data Table */}
        <NewAccountOpeningDataTable accounts={[]} />
        {/* Portfolio Mangement Status Data Table */}
        <PortfolioManagementStatusDataTable records={[]} />
      </div>
    </div>
  );
}
