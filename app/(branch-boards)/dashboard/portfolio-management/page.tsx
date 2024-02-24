import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import {
  DailyNetFundFlowDataType,
  NewAccountOrTurnoverPerformanceDataType,
  PortfolioMangementStatusDataType,
  newAccountFundCollectionColumns,
  portfolioMangementStatusColumns,
} from "./columns";
import { DataTable } from "./data-table";
import BarChartPositiveNegative from "@/components/BarChartPositiveNegative";

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
      amount: 79814.27,
    },
  ];
}

export default async function PortfolioManagement() {
  const portfolioManagementJson = await fetchPortfolioMangementData();
  const newAccountFundCollectionJson =
    await fetchNewAccountOrFundCollectionData();
  const turnoverPerformanceJson = await fetchTurnoverPerformanceData();
  const dailyNetFundFlowJson = await fetchDailyNetFundFlowChartData();
  const dailyNetFundFlowOption = {
    dataKey: "name",
    valueKey: "value",
    fill: "#ff3355",
    stroke: "#c3ce",
  };
  const formattedNetFundFlowdata = convertToBarData(dailyNetFundFlowJson);

  return (
    <div className="mx-4">
      <PageHeader name="Portfolio Management" />
      <div className="grid grid-cols-6 gap-2 xl:grid-cols-6 mt-2">
        <CardBoard
          className="col-span-3"
          title="Daily Net Fund Flow"
          subtitle="short summary of the portfolio"
          children={
            <BarChartPositiveNegative
              data={formattedNetFundFlowdata}
              options={dailyNetFundFlowOption}
            />
          }
        />
        <CardBoard className="col-span-3" title="" children={<></>} />
        <CardBoard
          className="col-span-6 row-start-3"
          title="Portfolio Management Status"
          subtitle="short summary of the portfolio"
          children={
            <DataTable
              columns={portfolioMangementStatusColumns}
              data={portfolioManagementJson}
            />
          }
        />
        <CardBoard
          className="col-span-3"
          title="New Account Opening & Fund Collection"
          subtitle="short summary of the portfolio"
          children={
            <DataTable
              columns={newAccountFundCollectionColumns}
              data={newAccountFundCollectionJson}
            />
          }
        />
        <CardBoard
          className="col-span-3"
          title="Turnover Performance"
          subtitle="short summary of the portfolio"
          children={
            <DataTable
              columns={newAccountFundCollectionColumns}
              data={turnoverPerformanceJson}
            />
          }
        />
      </div>
    </div>
  );
}
