import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import ClientTradesDataTable from "./_client_trades_datatable";
import PieChart from "./_pie_chart";
import StackBarChart from "./_stacked_barchart";
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
import { getHeaderDate } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { apiGet } from "@/lib/apiService";


export const metadata: Metadata = {
  title: "Active Trading Codes - LBSL",
  description: "active trading codes analysis dashboards",
};

const removeKeyFromObjects = (data: any[], ignoreKey: string) => {
  return data.filter((item) => item.channel.trim() !== ignoreKey);
};

export type DataType = {
  tradingDate: string;
  dt: number;
  internet: number;
  dtRatio: number;
  internetRatio: number;
};


function sortByMonthYearDescending(data: DataType[]) {
  // Create a function to map month names to numbers
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  // Sort the array by the specified field in descending order
  return data.sort((a, b) => {
    const [monthA, yearA] = a.tradingDate.split(" ");
    const [monthB, yearB] = b.tradingDate.split(" ");

    // Compare by year first
    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }

    // If years are the same, compare by month
    return monthMap[monthA] - monthMap[monthB];
  });
}

const getClientTradeSummaryOfToday = async (session: Session) => {
  return apiGet<IActiveTradingToday[]>(
    `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/active-trading-today/`,
    session,
  );
};

type TransformedDataItem = {
  tradingDate: string;
  dt: number;
  internet: number;
};

const getDayWiseStatistics = async (session: Session) => {
  return apiGet<IActiveTradeDayWise[]>(
    `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/active-trading-daywise/`,
    session,
  );
};

const getMonthWiseStatistics = async (session: Session) => {
  return apiGet<IMonthWiseData>(
    `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/active-trading-monthwise/`,
    session,
  );
}

const transformData = (
  data: IActiveTradeDayWise[],
  key: string,
): TransformedDataItem[] => {
  const transformedData: TransformedDataItem[] = data.reduce(
    (acc: TransformedDataItem[], curr: IActiveTradeDayWise) => {
      const existingItemIndex = acc.findIndex(
        (item) => item.tradingDate === curr.tradingDate,
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
    [],
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

const ratioMakerMonthWise = (
  data: PayloadType[],
  dateParse: boolean = true,
) => {
  return data.map((d) => {
    const total = d.DT + d.INTERNET;
    return {
      dt: d.DT,
      internet: d.INTERNET,
      tradingDate: dateParse ? parseDateOfMonthWise(d.monthYear) : d.monthYear,
      dtRatio: Math.round((d.DT / total) * 100),
      internetRatio: Math.round((d.INTERNET / total) * 100),
    };
  });
};

const ActiveTradingCodesBoard = async () => {
  const session = await auth();

  if (!session) {
    return redirect(DEFAULT_LOGIN_REDIRECT);
  }

  const dayWiseSummary = await getClientTradeSummaryOfToday(session);
  const dayWiseData = await getDayWiseStatistics(session);
  const monthWiseData = await getMonthWiseStatistics(session);

  const monthWiseClients = monthWiseData.totalClients;
  const monthWiseTrades = monthWiseData.totalTrades;
  const monthWiseTurnover = monthWiseData.totalTurnover;

  const sanitizedDayWiseSummary = removeKeyFromObjects(
    dayWiseSummary,
    "TOTAL (DT+INTERNET)",
  );
  const dayWiseClients = transformData(dayWiseData, "totalClients");
  const dayWiseTrades = transformData(dayWiseData, "trades");
  const dayWiseTurnover = transformData(dayWiseData, "totalTurnover");

  const transformedClients = ratioMaker(dayWiseClients);
  const transformedTrades = ratioMaker(dayWiseTrades);
  const transformedTurnover = ratioMaker(dayWiseTurnover);

  const transformedMonthWiseClients = ratioMakerMonthWise(
    monthWiseClients,
    false,
  );
  const transformedMonthWiseTrades = ratioMakerMonthWise(
    monthWiseTrades,
    false,
  );
  const transformedMonthWiseTurnover = ratioMakerMonthWise(
    monthWiseTurnover,
    false,
  );

  sortByMonthYearDescending(transformedMonthWiseClients);
  sortByMonthYearDescending(transformedMonthWiseTrades);
  sortByMonthYearDescending(transformedMonthWiseTurnover);

  const fixedProps = {
    xDataKey: "tradingDate",
    dataKeyA: "dtRatio",
    dataKeyB: "internetRatio",
  };

  return (
    <div className="mx-4">
      <PageHeader
        name={`Active Trading Codes (${getHeaderDate(dayWiseSummary[0], "tradingDate")})`}
      />
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-6 mt-2">
        <div className="rounded-md xl:col-span-6">
          <ClientTradesDataTable records={dayWiseSummary} />
        </div>

        {/* client  */}
        <div className="rounded-md xl:col-span-2">
          <PieChart
            title="Clients (Today)"
            dataKey="totalClients"
            data={sanitizedDayWiseSummary}
          />
        </div>
        <div className="rounded-md xl:col-span-2">
          <PieChart
            title="Trades (Today)"
            dataKey="trades"
            data={sanitizedDayWiseSummary}
          />
        </div>
        <div className="rounded-md xl:col-span-2">
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
