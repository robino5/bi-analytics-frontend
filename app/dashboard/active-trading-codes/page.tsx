"use client"
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import LoadingButton from "@/components/loading";
import ClientTradesDataTable from "./_components/clientTradesDataTable";
import PieChart from "./_components/pieChart";
import StackBarChart from "./_components/stackedBarChart";
import { activeTradingCodeAPI } from "./api/activeTradingCode";
import { removeKeyFromObjects } from "@/utils"
import {
  transformData,
  ratioMaker,
  ratioMakerMonthWise,
  sortByMonthYearDescending,
} from "./services"
import {
  IActiveTradeDayWise,
  IActiveTradingToday,
} from "./types";
import BarChartBiAxis from "@/components/BarChartBiAxis";
import TopTurnoverCompany from "./_components/_top_turnover_company_wise";
import TurnoverComparisonCard from "./_components/turover_comparison_sector_wise";
import React from "react";
import BranchWiseTurnoverComparison from "./_components/_branch_wise_turnover_comarison";
import { Ticker } from "@/components/ticker";
import { DseLiveTrade } from "@/components/dse-live-trade";
import { dseLiveTradeAPI } from "@/lib/services/dseLiveTrade";
import NoDataFound from "./_components/_no_data_found";

const ActiveTradingCodesBoard = () => {

  const { data: dayWiseSummaryResponse, isLoading: todayLoading, isError: todayError } =
    useQuery({
      queryKey: ["clientTradeSummaryByToday"],
      queryFn: async () => {
        const data = await activeTradingCodeAPI.getClientTradeSummaryByToday();
        localStorage.setItem("push-data", data?.data[0]?.pushDate ?? null);
        return data;
      }
    });

  const { data: dayWiseDataResponse, isLoading: dayLoading, isError: dayError } = useQuery({
    queryKey: ["clientTradeSummaryByDay"],
    queryFn: () => activeTradingCodeAPI.getStatisticsByDay()
  });

  const { data: monthWiseDataResponse, isLoading: monthLoading, isError: monthError } = useQuery({
    queryKey: ["clientTradeSummaryByMonth"],
    queryFn: () => activeTradingCodeAPI.getStatisticsByMonth(),
    initialData: {
      status: "success",
      code: 200,
      message: null,
      data: {
        totalClients: [],
        totalTrades: [],
        totalTurnover: [],
      }
    }
  });

  const { data: datewiseTrunover, isLoading: datewiseTurnoverLoading, isError: DatewiseTurnoverError } = useQuery({
    queryKey: ["datewiseTurnover"],
    queryFn: () => activeTradingCodeAPI.getDatewiseTurnover()
  });

  const { data: branchwiseTrunover, isLoading: branchwiseTurnoverLoading, isError: branchwiseTurnoverError } = useQuery({
    queryKey: ["branchwiseTurnover"],
    queryFn: () => activeTradingCodeAPI.getBranchwiseTurnover()
  });

  const { data: branchwiseTrunoverDt, isLoading: branchwiseTurnoverLoadingDt, isError: branchwiseTurnoverErrorFt } = useQuery({
    queryKey: ["branchwiseTurnoverDt"],
    queryFn: () => activeTradingCodeAPI.getBranchwiseDtTurnover()
  });


 


  const biaxialChartOption = {
    dataKey: "tradingDate",
    valueKeyA: "activeClients",
    valueKeyB: "turnover",
    fill: "#c200fb",
    fill2: "#3498DB",
    stroke: "#c3ce",
    barLabel: true,
    rotate: 90,
    title: "Date Wise Turnover(Internet)",
    cardColor: "bg-[#033e4a]"
  };

  const isLoading = todayLoading || dayLoading || monthLoading || datewiseTurnoverLoading || branchwiseTurnoverLoading || branchwiseTurnoverLoadingDt;

  const error = todayError || dayError || monthError || DatewiseTurnoverError || branchwiseTurnoverError || branchwiseTurnoverErrorFt;

  if (isLoading) {
    return <LoadingButton text="Loading..." />
  }

  if (error) {
    // TODO: Return a beautiful Error boundary component
    return <>Error...</>
  }

  const dayWiseSummary = dayWiseSummaryResponse?.data
  const dayWiseData = dayWiseDataResponse?.data
  const monthWiseData = monthWiseDataResponse?.data

  const monthWiseClients = monthWiseData?.totalClients;
  const monthWiseTrades = monthWiseData?.totalTrades;
  const monthWiseTurnover = monthWiseData?.totalTurnover;


  const sanitizedDayWiseSummary = removeKeyFromObjects(
    dayWiseSummary as IActiveTradeDayWise[],
    "channel",
    "TOTAL (DT+INTERNET)",
  );
  const dayWiseClients = transformData(dayWiseData as IActiveTradeDayWise[], "totalClients");
  const dayWiseTrades = transformData(dayWiseData as IActiveTradeDayWise[], "trades");
  const dayWiseTurnover = transformData(dayWiseData as IActiveTradeDayWise[], "totalTurnover");

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
    dataKeyX: "dt",
    dataKeyB: "internetRatio",
    dataKeyY: "internet"
  };


  return (
    <div className="mx-4">
      <PageHeader
        name={`Active Trading Codes as on ${dayWiseSummaryResponse?.data?.[0]?.pushDate ?? null}`}
        updateStatus="* This data is updated every 15 minutes."
      />
      <Ticker />
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-6 mt-0">
        <div className="rounded-md xl:col-span-3 ">
          <ClientTradesDataTable records={dayWiseSummary as IActiveTradingToday[]} />
        </div>
        <div className="rounded-md xl:col-span-3">
          <DseLiveTrade />
        </div>
        {/* client  */}
        {sanitizedDayWiseSummary ? (
          <div className="rounded-md xl:col-span-2">
            <PieChart
              title="Clients (Today)"
              dataKey="totalClients"
              data={sanitizedDayWiseSummary}
            />
          </div>
        ) :
          <NoDataFound title="Clients (Today)" />}
        {sanitizedDayWiseSummary ? (
          <div className="rounded-md xl:col-span-2">
            <PieChart
              title="Trades (Today)"
              dataKey="trades"
              data={sanitizedDayWiseSummary}
            />
          </div>
        ) : <NoDataFound title="Trades (Today)" />}

        {sanitizedDayWiseSummary ? (
          <div className="rounded-md xl:col-span-2">
            <PieChart
              title="Turnover (Today)"
              dataKey="totalTurnover"
              data={sanitizedDayWiseSummary}
            />
          </div>
        ) : <NoDataFound title="Turnover (Today)" />}


        {/* clients day wise */}
        {transformedClients ?
          (<div className="rounded-md xl:col-span-3">
            <StackBarChart
              {...fixedProps}
              data={transformedClients}
              title="Clients (Day Wise)"
            />
          </div>)
          :
          <NoDataFound title="Clients (Day Wise)" />}

        {/* clients month wise */}
        {transformedMonthWiseClients ? (
          <div className="rounded-md xl:col-span-3">
            <StackBarChart
              {...fixedProps}
              data={transformedMonthWiseClients}
              title="Clients (Month Wise)"
            />
          </div>)
          :
          <NoDataFound title="Clients (Month Wise)" />
        }

        {/* trades day wise */}
        {
          transformedTrades ? (
            <div className="rounded-md xl:col-span-3">
              <StackBarChart
                {...fixedProps}
                data={transformedTrades}
                title="Trades (Day Wise)"
              />
            </div>) :
            <NoDataFound title="Trades (Day Wise)" />
        }

        {/* trades month wise */}

        {transformedMonthWiseTrades ? (
          <div className="rounded-md xl:col-span-3">
            <StackBarChart
              {...fixedProps}
              data={transformedMonthWiseTrades}
              title="Trades (Month Wise)"
            />
          </div>
        ) : <NoDataFound title="Trades (Month Wise)" />
        }

        {/* turnover  day wise */}
        {transformedTurnover ? (
          <div className="rounded-md xl:col-span-3">
            <StackBarChart
              {...fixedProps}
              data={transformedTurnover}
              title="Turnover (Day Wise)"
            />
          </div>
        ) : <NoDataFound title="Turnover (Day Wise)" />}

        {/* turnover month wise */}
        {transformedMonthWiseTurnover ? (
          <div className="rounded-md xl:col-span-3">
            <StackBarChart
              {...fixedProps}
              data={transformedMonthWiseTurnover}
              title="Turnover (Month Wise)"
            />
          </div>
        ) : <NoDataFound title="Turnover (Month Wise)" />}

        {/* {sectorwiseTrunover?.data ? (
          <BarChartHorizontalEvent
            data={sectorwiseTrunover.data}
            options={sectorCashCodeExposureOption}
          />
        ) : (
          "No data available"
        )} */}
        {dayWiseSummaryResponse?.data ? (
          <TurnoverComparisonCard default={dayWiseSummaryResponse?.data?.[0]?.pushDate ?? null} />)
          : <NoDataFound title="Sector Wise Turnover Comparison" />}


        {dayWiseSummaryResponse?.data ? (
          <TopTurnoverCompany default={dayWiseSummaryResponse?.data?.[0]?.pushDate ?? null} />) 
          : <NoDataFound title="Top Turnover Company" />}
        {datewiseTrunover ? (
          <BarChartBiAxis
            data={datewiseTrunover?.data?.rows as any}
            options={biaxialChartOption}
          />) :
          <NoDataFound title="Date Wise Turnover(Internet)" />}

        {branchwiseTrunover?.data && branchwiseTrunoverDt?.data ? (
          <BranchWiseTurnoverComparison
            internetTurnover={branchwiseTrunover.data as any}
            dtTurnover={branchwiseTrunoverDt.data as any}
          />
        )
          : <NoDataFound title="Branch Wise Turnover Comparison" />}
      </div>
    </div>
  );
};

export default ActiveTradingCodesBoard;

