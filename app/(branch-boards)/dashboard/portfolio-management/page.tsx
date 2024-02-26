import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import {
  ClientTurnoverBiAxial,
  DailyNetFundFlowDataType,
  NewAccountOrTurnoverPerformanceDataType,
  PortfolioMangementStatusDataType,
  newAccountFundCollectionColumns,
  portfolioMangementStatusColumns,
} from "./columns";
import { DataTable } from "@/components/ui/data-table";
import BarChartPositiveNegative from "@/components/BarChartPositiveNegative";
import BarChartBiAxis from "@/components/BarChartBiAxis";

import { Metadata } from "next";
import NewAccountOpeningDataTable from "./_new_account_datatable";
import TurnoverPerformanceDataTable from "./_turnover_performance_datatable";
import PortfolioManagementStatusDataTable from "./_portfolio_management_status_datatable";

export const metadata: Metadata = {
  title: "Portfolio Management - LBSL",
  description: "analytics for portfolio management",
};

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

export default async function PortfolioManagement() {
  const dailyNetFundFlowOption = {
    dataKey: "name",
    valueKey: "value",
    fill: "#ff3355",
    stroke: "#c3ce",
  };
  const biaxialChartOption = {
    dataKey: "date",
    valueKeyA: "client",
    valueKeyB: "turnover",
    fill: "#ff3355",
    stroke: "#c3ce",
  };
  const portfolioManagementJson = await fetchPortfolioMangementData();
  const newAccountFundCollectionJson =
    await fetchNewAccountOrFundCollectionData();
  const turnoverPerformanceJson = await fetchTurnoverPerformanceData();
  const dailyNetFundFlowJson = await fetchDailyNetFundFlowChartData();
  const clientTurnoverBiAxialJson = await fetchClientTurnoverBiAxialChartData();

  const formattedNetFundFlowdata = convertToBarData(dailyNetFundFlowJson);

  return (
    <div className="mx-4">
      <PageHeader name="Portfolio Management" />
      <div className="grid grid-cols-6 gap-2 xl:grid-cols-6 mt-2">
        {/* Daily Net Fund Flow Chart */}
        <CardBoard
          className="lg:col-span-3"
          title="Daily Net Fund Flow"
          subtitle="short summary of the portfolio"
          children={
            <BarChartPositiveNegative
              data={formattedNetFundFlowdata}
              options={dailyNetFundFlowOption}
            />
          }
        />

        {/* Client Trade vs Turnover Chart */}
        <CardBoard
          className="lg:col-span-3"
          title="Clients Trade vs Turnover"
          subtitle="analysis of total clients traded vs lsbl turnover"
          children={
            <BarChartBiAxis
              data={clientTurnoverBiAxialJson}
              options={biaxialChartOption}
            />
          }
        />
        {/* Turnover Performance Data Table */}
        <TurnoverPerformanceDataTable records={turnoverPerformanceJson} />
        {/* New Account Opening & Function Collection Data Table */}
        <NewAccountOpeningDataTable accounts={newAccountFundCollectionJson} />
        {/* Portfolio Mangement Status Data Table */}
        <PortfolioManagementStatusDataTable records={portfolioManagementJson} />
      </div>
    </div>
  );
}
