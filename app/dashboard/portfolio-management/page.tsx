"use client";

import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import BarChartPositiveNegative from "@/components/BarChartPositiveNegative";
import BarChartBiAxis from "@/components/BarChartBiAxis";

import NewAccountOpeningDataTable from "./_new_account_datatable";
import TurnoverPerformanceDataTable from "./_turnover_performance_datatable";
import PortfolioManagementStatusDataTable from "./_portfolio_management_status_datatable";
import { BarColors } from "@/components/ui/utils/constants";
import { useEffect, useState } from "react";
import BranchFilter from "@/components/branchFilter";
import { getHeaderDate, successResponse } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  IAccountsFundFlow,
  INetFundFlow,
  IPortfolioStatus,
  ITradeVsClients,
  ITurnoverPerformance,
} from "@/types/portfolioManagement";
import { IResponse } from "@/types/utils";

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
    fill: "#ff3355",
    stroke: "#c3ce",
    barLabel: true,
    rotate: 0,
  };

  const [branch, setBranch] = useState("");
  const [netFundFlow, setNetFundFlow] = useState<INetFundFlow[] | null>(null);
  const [tradeVsturnover, setTradeVsTurnover] = useState<
    ITradeVsClients[] | null
  >(null);
  const [turnover, setTurnover] = useState<ITurnoverPerformance[] | null>(null);
  const [accountsFundFlow, setAccountsFundFlow] = useState<
    IAccountsFundFlow[] | null
  >(null);
  const [portfolioStatus, setPortfolioStatus] = useState<
    IPortfolioStatus[] | null
  >(null);

  const handleBranchChange = (branchId: string) => {
    setBranch(branchId);
  };

  // on page load
  useEffect(() => {
    // Daily Net Fund Flow
    const fetchDailyNetFundFlow = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/daily-net-fundflow/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = (await response.json()) as IResponse<INetFundFlow[]>;
        if (successResponse(result.status)) {
          setNetFundFlow(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching daily net fund flow`,
          error,
        );
      }
    };
    // Trade Vs Clients Statistics
    const fetchTradeVsClients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/trade-vs-clients/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = (await response.json()) as IResponse<ITradeVsClients[]>;
        if (successResponse(result.status)) {
          setTradeVsTurnover(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching daily net fund flow`,
          error,
        );
      }
    };
    // Turnover Performance Statistics
    const fetchTurnoverPerformance = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/turnover-performance/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
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
          error,
        );
      }
    };

    // Account Fund Flow Data Table
    const fetchAccountsFundFlow = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/accounts-fundflow/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = (await response.json()) as IResponse<
          IAccountsFundFlow[]
        >;
        if (successResponse(result.status)) {
          setAccountsFundFlow(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching daily net fund flow`,
          error,
        );
      }
    };

    // Portfolio Status DataTable
    const fetchPortfolioStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/portfolio-status/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = (await response.json()) as IResponse<IPortfolioStatus[]>;
        if (successResponse(result.status)) {
          setPortfolioStatus(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching daily net fund flow`,
          error,
        );
      }
    };
    fetchDailyNetFundFlow();
    fetchTradeVsClients();
    fetchTurnoverPerformance();
    fetchAccountsFundFlow();
    fetchPortfolioStatus();
  }, []);

  // on branch change
  useEffect(() => {
    if (branch) {
      const fetchNetFundFlowWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/daily-net-fundflow/${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            },
          );
          const result = (await response.json()) as IResponse<INetFundFlow[]>;
          if (successResponse(result.status)) {
            setNetFundFlow(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching daily net fund flow with branchId = ${branch}`,
            error,
          );
        }
      };

      // Trade Vs Clients Statistics
      const fetchTradeVsClientsWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/trade-vs-clients/${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            },
          );
          const result = (await response.json()) as IResponse<
            ITradeVsClients[]
          >;
          if (successResponse(result.status)) {
            setTradeVsTurnover(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching trade vs clients with branchId=${branch}`,
            error,
          );
        }
      };

      // Turnover Performance Statistics
      const fetchTurnoverPerformanceWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/turnover-performance/${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            },
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
            error,
          );
        }
      };
      // Account Fund Flow Data Table
      const fetchAccountsFundFlowWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/accounts-fundflow/${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            },
          );
          const result = (await response.json()) as IResponse<
            IAccountsFundFlow[]
          >;
          if (successResponse(result.status)) {
            setAccountsFundFlow(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching daily net fund flow`,
            error,
          );
        }
      };
      // Portfolio Status DataTable
      const fetchPortfolioStatusWithBranchId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/portfolio-status/${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            },
          );
          const result = (await response.json()) as IResponse<
            IPortfolioStatus[]
          >;
          if (successResponse(result.status)) {
            setPortfolioStatus(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching daily net fund flow`,
            error,
          );
        }
      };
      fetchNetFundFlowWithBranchId();
      fetchTradeVsClientsWithBranchId();
      fetchTurnoverPerformanceWithBranchId();
      fetchAccountsFundFlowWithBranchId();
      fetchPortfolioStatusWithBranchId();
    }
  }, [branch]);

  let headerDate = null;

  if (netFundFlow) {
    headerDate = getHeaderDate(
      netFundFlow[netFundFlow.length - 1],
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
        {netFundFlow ? (
          <CardBoard
            className="col-span-3"
            title="Daily Net Fund Flow"
            // subtitle="short summary of the portfolio"
            children={
              <BarChartPositiveNegative
                data={netFundFlow as any}
                options={dailyNetFundFlowOption}
              />
            }
          />
        ) : null}

        {/* Client Trade vs Turnover Chart */}
        {tradeVsturnover?(
        <CardBoard
          className="lg:col-span-3"
          title="Clients Trade vs Turnover"
          // subtitle="analysis of total clients traded vs lsbl turnover"
          children={
            <BarChartBiAxis
              data={tradeVsturnover as any}
              options={biaxialChartOption}
            />
          }
        />):null}
        {/* Turnover Performance Data Table */}
        {turnover ? (
          <TurnoverPerformanceDataTable records={turnover as any} />
        ) : null}
        {/* New Account Opening & Function Collection Data Table */}
        {accountsFundFlow ? (
          <NewAccountOpeningDataTable accounts={accountsFundFlow} />
        ) : null}
        {/* Portfolio Mangement Status Data Table */}
        {portfolioStatus ? (
          <PortfolioManagementStatusDataTable
            records={portfolioStatus as any}
          />
        ) : null}
      </div>
    </div>
  );
}
