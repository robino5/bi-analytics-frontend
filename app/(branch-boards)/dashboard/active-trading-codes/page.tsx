import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import ClientTradesDataTable from "./_client_trades_datatable";
import PieChart from "./_pie_chart";
import StackBarChart from "./_stacked_barchart";
import { dayWiseStatistics } from "./data";

export const metadata: Metadata = {
  title: "Active Trading Codes - LBSL",
  description: "active trading codes analysis dashboards",
};

const removeKeyFromObjects = (data: any[], ignoreKey: string) => {
  return data.filter((item) => item.name !== ignoreKey);
};

const getClientTradeSummaryOfToday = async () => {
  return [
    {
      name: "DT",
      totalClient: 1200,
      totalTrade: 16591,
      totalTurnover: 7866633,
    },
    {
      name: "INTERNET",
      totalClient: 3338,
      totalTrade: 20903,
      totalTurnover: 47333344,
    },
    {
      name: "TOTAL(DT + INTERNET)",
      totalClient: 5192,
      totalTrade: 37494,
      totalTurnover: 12720293099,
    },
  ];
};

type StatisticsPayloadType = {
  tradingDate: string;
  channel: string;
  totalClients: number;
  totalTrades: number;
  totalTurnover: number;
};

type TransformedDataItem = {
  tradingDate: string;
  dt: number;
  internet: number;
};

const getDayWiseStatistics = async () => {
  return dayWiseStatistics;
};

const transformData = (
  data: StatisticsPayloadType[]
): TransformedDataItem[] => {
  const transformedData: TransformedDataItem[] = data.reduce(
    (acc: TransformedDataItem[], curr: StatisticsPayloadType) => {
      const existingItemIndex = acc.findIndex(
        (item) => item.tradingDate === curr.tradingDate
      );
      if (existingItemIndex !== -1) {
        // @ts-ignore
        acc[existingItemIndex][curr.channel.toLowerCase()] = curr.totalClients;
      } else {
        acc.push({
          tradingDate: curr.tradingDate,
          [curr.channel.toLowerCase()]: curr.totalClients,
          dt: curr.channel.toLowerCase() === "dt" ? curr.totalClients : 0,
          internet:
            curr.channel.toLowerCase() === "internet" ? curr.totalClients : 0,
        });
      }
      return acc;
    },
    []
  );

  return transformedData;
};

const ActiveTradingCodesBoard = async () => {
  const dayWiseSummary = await getClientTradeSummaryOfToday();
  const dayWiseData = await getDayWiseStatistics();

  const sanitizedDayWiseSummary = removeKeyFromObjects(
    dayWiseSummary,
    "TOTAL(DT + INTERNET)"
  );

  const transformDataa = transformData(dayWiseData);

  const totalDt = transformDataa.reduce((sum, item) => sum + item.dt, 0);
  const totalInternet = transformDataa.reduce(
    (sum, item) => sum + item.internet,
    0
  );

  const percentages = transformDataa.map((item) => ({
    tradingDate: item.tradingDate,
    dt: item.dt,
    internet: item.internet,
    dtRatio: Math.round((item.dt / totalDt) * 100),
    internetRatio: Math.round((item.internet / totalInternet) * 100),
  }));

  const yAxisValueSet = new Set();

  percentages.forEach((item) => {
    yAxisValueSet.add(item.dtRatio);
    yAxisValueSet.add(item.internetRatio);
  });

  return (
    <div className="mx-4">
      <PageHeader name="Active Trading Codes" showFilters={false} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-6 mt-2">
        <div className="rounded-md xl:col-span-6">
          <ClientTradesDataTable records={dayWiseSummary} />
        </div>

        {/* client  */}
        <div className="rounded-md xl:col-span-2 bg-gradient-to-br from-gray-50 to-slate-200">
          <PieChart
            title="Clients (Today)"
            dataKey="totalClient"
            data={sanitizedDayWiseSummary}
          />
        </div>
        <div className="rounded-md xl:col-span-2 bg-gradient-to-br from-gray-50 to-slate-200">
          <PieChart
            title="Trades (Today)"
            dataKey="totalTrade"
            data={sanitizedDayWiseSummary}
          />
        </div>
        <div className="rounded-md xl:col-span-2 bg-gradient-to-br from-gray-50 to-slate-200">
          <PieChart
            title="Turnover (Today)"
            dataKey="totalTurnover"
            data={sanitizedDayWiseSummary}
          />
        </div>

        {/* clients day wise */}
        <div className="rounded-md xl:col-span-3">
          <StackBarChart
            xDataKey="tradingDate"
            yDataKey="dtRatio"
            dataKeyA="dt"
            dataKeyB="internet"
            data={percentages}
            title="Clients (Day Wise)"
          />
        </div>
        {/* clients month wise */}
        <div className="rounded-md xl:col-span-3">
          {/* <StackBarChart title="Clients (Month Wise)" /> */}
        </div>
        {/* trades day wise */}
        <div className="rounded-md xl:col-span-3">
          {/* <StackBarChart title="Trades (Day Wise)" /> */}
        </div>
        {/* trades month wise */}
        <div className="rounded-md xl:col-span-3">
          {/* <StackBarChart title="Trades (Month Wise)" /> */}
        </div>
        {/* turnover  day wise */}
        <div className="rounded-md xl:col-span-3">
          {/* <StackBarChart title="Turnover (Day Wise)" /> */}
        </div>
        {/* turnover month wise */}
        <div className="rounded-md xl:col-span-3">
          {/* <StackBarChart title="Turnover (Month Wise)" /> */}
        </div>
      </div>
    </div>
  );
};

export default ActiveTradingCodesBoard;
