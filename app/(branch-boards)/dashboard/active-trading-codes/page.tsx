import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import ClientTradesDataTable from "./_client_trades_datatable";
import PieChart from "./_pie_chart";
import StackBarChart from "./_stacked_barchart";
import {
  dayWiseStatistics,
  monthWiseClientStatistics,
  monthWiseTradeStatistics,
  monthWiseTurnoverStatistics,
} from "./data";

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

const getMonthWiseClientStatistics = async () => {
  return monthWiseClientStatistics;
};

const getMonthWiseTradeStatistics = async () => {
  return monthWiseTradeStatistics;
};

const getMonthWiseTurnoverStatistics = async () => {
  return monthWiseTurnoverStatistics;
};

const transformData = (
  data: StatisticsPayloadType[],
  key: string
): TransformedDataItem[] => {
  const transformedData: TransformedDataItem[] = data.reduce(
    (acc: TransformedDataItem[], curr: StatisticsPayloadType) => {
      const existingItemIndex = acc.findIndex(
        (item) => item.tradingDate === curr.tradingDate
      );
      if (existingItemIndex !== -1) {
        // @ts-ignore
        acc[existingItemIndex][curr.channel.toLowerCase()] = curr[key];
      } else {
        acc.push({
          tradingDate: curr.tradingDate,
          // @ts-ignore
          [curr.channel.toLowerCase()]: curr[key],
          // @ts-ignore
          dt: curr.channel.toLowerCase() === "dt" ? curr[key] : 0,
          // @ts-ignore
          internet: curr.channel.toLowerCase() === "internet" ? curr[key] : 0,
        });
      }
      return acc;
    },
    []
  );

  return transformedData;
};

const ratioMaker = (data: TransformedDataItem[]) => {
  return data.map((d) => {
    const total = d.dt + d.internet;
    return {
      ...d,
      dtRatio: Math.round((d.dt / total) * 100),
      internetRatio: Math.round((d.internet / total) * 100),
    };
  });
};

const ActiveTradingCodesBoard = async () => {
  const dayWiseSummary = await getClientTradeSummaryOfToday();
  const dayWiseData = await getDayWiseStatistics();
  const monthWiseClients = await getMonthWiseClientStatistics();
  const monthWiseTrades = await getMonthWiseTradeStatistics();
  const monthWiseTurnover = await getMonthWiseTurnoverStatistics();

  const sanitizedDayWiseSummary = removeKeyFromObjects(
    dayWiseSummary,
    "TOTAL(DT + INTERNET)"
  );

  const dayWiseClients = transformData(dayWiseData, "totalClients");
  const dayWiseTrades = transformData(dayWiseData, "totalTrades");
  const dayWiseTurnover = transformData(dayWiseData, "totalTurnover");

  const transformedClients = ratioMaker(dayWiseClients);
  const transformedTrades = ratioMaker(dayWiseTrades);
  const transformedTurnover = ratioMaker(dayWiseTurnover);

  const transformedMonthWiseClients = ratioMaker(monthWiseClients);
  const transformedMonthWiseTrades = ratioMaker(monthWiseTrades);
  const transformedMonthWiseTurnover = ratioMaker(monthWiseTurnover);

  const fixedProps = {
    xDataKey: "tradingDate",
    dataKeyA: "dtRatio",
    dataKeyB: "internetRatio",
  };
  return (
    <div className="mx-4">
      <PageHeader name="Active Trading Codes" showFilters={false} />
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-6 mt-2">
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
            {...fixedProps}
            data={transformedClients}
            title="Clients (Day Wise)"
          />
        </div>
        {/* clients month wise */}
        <div className="rounded-md xl:col-span-3">
          <StackBarChart
            {...fixedProps}
            data={transformedMonthWiseClients}
            title="Clients (Month Wise)"
          />
        </div>
        {/* trades day wise */}
        <div className="rounded-md xl:col-span-3">
          <StackBarChart
            {...fixedProps}
            data={transformedTrades}
            title="Trades (Day Wise)"
          />
        </div>
        {/* trades month wise */}
        <div className="rounded-md xl:col-span-3">
          <StackBarChart
            {...fixedProps}
            data={transformedMonthWiseTrades}
            title="Trades (Month Wise)"
          />
        </div>
        {/* turnover  day wise */}
        <div className="rounded-md xl:col-span-3">
          <StackBarChart
            {...fixedProps}
            data={transformedTurnover}
            title="Turnover (Day Wise)"
          />
        </div>
        {/* turnover month wise */}
        <div className="rounded-md xl:col-span-3">
          <StackBarChart
            {...fixedProps}
            data={transformedMonthWiseTurnover}
            title="Turnover (Month Wise)"
          />
        </div>
      </div>
    </div>
  );
};

export default ActiveTradingCodesBoard;
