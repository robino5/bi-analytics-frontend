import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import ClientTradesDataTable from "./_client_trades_datatable";
import PieChart from "./_pie_chart";
import StackBarChart from "./_stacked_barchart";
import {
  monthWiseClientStatistics,
  monthWiseTradeStatistics,
  monthWiseTurnoverStatistics,
} from "./data";
import {
  IActiveTradeDayWise,
  IActiveTradingToday,
  IMonthWiseData,
  PayloadType,
} from "@/types/activeTradingCodes";
import { IResponse } from "@/types/utils";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Active Trading Codes - LBSL",
  description: "active trading codes analysis dashboards",
};

const removeKeyFromObjects = (data: any[], ignoreKey: string) => {
  return data.filter((item) => item.channel.trim() !== ignoreKey);
};

const getClientTradeSummaryOfToday: (
  session: Session
) => Promise<IActiveTradingToday[]> = async (session: Session) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/active-trading-today/`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    console.error(response.statusText);
  }
  const data: IResponse<IActiveTradingToday[]> = await response.json();
  return data.data;
};

type TransformedDataItem = {
  tradingDate: string;
  dt: number;
  internet: number;
};

const getDayWiseStatistics: (
  session: Session
) => Promise<IActiveTradeDayWise[]> = async (session: Session) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/active-trading-daywise/`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    console.error(response.statusText);
  }
  const data: IResponse<IActiveTradeDayWise[]> = await response.json();
  return data.data;
};

const getMonthWiseStatistics: (
  session: Session
) => Promise<IMonthWiseData> = async (session: Session) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/active-trading-monthwise/`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status !== 200) {
    console.error(response.statusText);
  }
  const data: IResponse<IMonthWiseData> = await response.json();
  return data.data;
};

const transformData = (
  data: IActiveTradeDayWise[],
  key: string
): TransformedDataItem[] => {
  const transformedData: TransformedDataItem[] = data.reduce(
    (acc: TransformedDataItem[], curr: IActiveTradeDayWise) => {
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

const parseDateOfMonthWise = (date: string) => {
  return date.slice(3);
};

const ratioMakerMonthWise = (data: PayloadType[]) => {
  return data.map((d) => {
    const total = d.DT + d.INTERNET;
    return {
      dt: d.DT,
      internet: d.INTERNET,
      tradingDate: parseDateOfMonthWise(d.monthYear),
      dtRatio: Math.round((d.DT / total) * 100),
      internetRatio: Math.round((d.INTERNET / total) * 100),
    };
  });
};

const ActiveTradingCodesBoard = async () => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const dayWiseSummary = await getClientTradeSummaryOfToday(session);
  const dayWiseData = await getDayWiseStatistics(session);
  const monthWiseData = await getMonthWiseStatistics(session);

  const monthWiseClients = monthWiseData.totalClients;
  const monthWiseTrades = monthWiseData.totalTrades;
  const monthWiseTurnover = monthWiseData.totalTurnover;

  const sanitizedDayWiseSummary = removeKeyFromObjects(
    dayWiseSummary,
    "TOTAL (DT+INTERNET)"
  );

  const dayWiseClients = transformData(dayWiseData, "totalClients");
  const dayWiseTrades = transformData(dayWiseData, "trades");
  const dayWiseTurnover = transformData(dayWiseData, "totalTurnover");

  const transformedClients = ratioMaker(dayWiseClients);
  const transformedTrades = ratioMaker(dayWiseTrades);
  const transformedTurnover = ratioMaker(dayWiseTurnover);

  const transformedMonthWiseClients = ratioMakerMonthWise(monthWiseClients);
  const transformedMonthWiseTrades = ratioMakerMonthWise(monthWiseTrades);
  const transformedMonthWiseTurnover = ratioMakerMonthWise(monthWiseTurnover);

  const fixedProps = {
    xDataKey: "tradingDate",
    dataKeyA: "dtRatio",
    dataKeyB: "internetRatio",
  };
  return (
    <div className="mx-4">
      <PageHeader name="Active Trading Codes" />
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-6 mt-2">
        <div className="rounded-md xl:col-span-6">
          <ClientTradesDataTable records={dayWiseSummary} />
        </div>

        {/* client  */}
        <div className="rounded-md xl:col-span-2 bg-gradient-to-br from-gray-50 to-slate-200">
          <PieChart
            title="Clients (Today)"
            dataKey="totalClients"
            data={sanitizedDayWiseSummary}
          />
        </div>
        <div className="rounded-md xl:col-span-2 bg-gradient-to-br from-gray-50 to-slate-200">
          <PieChart
            title="Trades (Today)"
            dataKey="trades"
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
