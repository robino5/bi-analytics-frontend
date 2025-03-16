"use client"

import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import LoadingButton from "@/components/loading";
import ClientTradesDataTable from "./_components/clientTradesDataTable";
import PieChart from "./_components/pieChart";
import StackBarChart from "./_components/stackedBarChart";
import { getFormattedHeaderDate } from "@/utils";
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
import CardBoard from "@/components/CardBoard";
import BarChartBiAxis from "@/components/BarChartBiAxis";
import OmsBranchwiseTurnover from "./_components/_oms_branchwise_turnover";
import { BarColors } from "@/components/ui/utils/constants";
import BarChartHorizontalEvent from "./_components/BarChartHorizontal";
import { SkeletonStatistics } from "@/components/skeletonCard";
import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartHorizontalComparison from "@/components/BarChartHorizontalComprison";
import TopTurnoverCompany from "./_components/_top_turnover_company_wise";
import TurnoverComparisonCard from "./_components/turover_comparison_sector_wise";
import React, { useCallback, useState } from "react";


const ActiveTradingCodesBoard = () => {
 
  const { data: dayWiseSummaryResponse, isLoading: todayLoading, isError: todayError } = useQuery({
    queryKey: ["clientTradeSummaryByToday"],
    queryFn: () => activeTradingCodeAPI.getClientTradeSummaryByToday()
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

  const { data: sectorwiseTrunover, isLoading: sectorwiseTurnoverLoading, isError: sectorwiseTurnoverError } = useQuery({
    queryKey: ["sectorwiseTurnover"],
    queryFn: () => activeTradingCodeAPI.getSectorwiseTurnover()
  });



  console.log("daywise turnover", dayWiseSummaryResponse)

  const biaxialChartOption = {
    dataKey: "tradingDate",
    valueKeyA: "activeClients",
    valueKeyB: "turnover",
    fill: "#c200fb",
    fill2: "#3498DB",
    stroke: "#c3ce",
    barLabel: true,
    rotate: 90,
    title: "Date Wise Turnover(Internet)"
  };

  const isLoading = todayLoading || dayLoading || monthLoading || datewiseTurnoverLoading || branchwiseTurnoverLoading;

  const error = todayError || dayError || monthError || DatewiseTurnoverError || branchwiseTurnoverError;

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
  const headerTradingDate = getFormattedHeaderDate(dayWiseSummary?.[0], "tradingDate")

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
  return (
    <div className="mx-4">
      <PageHeader
        name={`Active Trading Codes as on ${dayWiseSummaryResponse?.data?.[0]?.pushDate ?? null}`}
      />
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-6 mt-2">
        <div className="rounded-md xl:col-span-6">
          <ClientTradesDataTable records={dayWiseSummary as IActiveTradingToday[]} />
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
        {/* {sectorwiseTrunover?.data ? (
          <BarChartHorizontalEvent
            data={sectorwiseTrunover.data}
            options={sectorCashCodeExposureOption}
          />
        ) : (
          "No data available"
        )} */}
       <TurnoverComparisonCard default={dayWiseSummaryResponse?.data?.[0]?.pushDate ?? null}/>
          <TopTurnoverCompany default={dayWiseSummaryResponse?.data?.[0]?.pushDate ?? null}/>
        {datewiseTrunover ? (
          <BarChartBiAxis
            data={datewiseTrunover?.data?.rows as any}
            options={biaxialChartOption}
          />) : null}
        {branchwiseTrunover?.data ? (
          <OmsBranchwiseTurnover data={branchwiseTrunover.data as any} />
        ) : null}
      </div>
    </div>
  );
};

export default ActiveTradingCodesBoard;

