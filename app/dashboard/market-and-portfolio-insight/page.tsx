"use client";

import PageHeader from "@/components/PageHeader";
import LoadingButton from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import { marketAndTradeInsightAPI } from "./api";
import NegativeEquityHoldingsTable from "./_components/NegativeEquityHoldingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveIndicator from "@/components/ui/live-indicator";
import { Download } from "lucide-react";
import { numberToMillionsString } from "@/lib/utils";
import NoDataFound from "@/components/NoDataFound";
import { MarketZGroupInvestorDrilldownDataTable } from "./_components/market_z_group_investor_drilldown/_marketZGroupInvestorDrilldownTable";
import { MarketSpotInvestorDrilldownDataTable } from "./_components/market_spot_investor_drilldown/_marketSpotInvestorDrilldownTable";
import config from "@/config";

export default function MarketAndTradeInsightPage() {
  const apiBaseUrl = config.apiURL.replace(/\/+$/, "");
  const {
    data: negativeEquityHoldings,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["marketNegativeEquityHoldingScrips"],
    queryFn: ({ signal }) =>
      marketAndTradeInsightAPI.getNegativeEquityHoldingScrips(signal),
  });
  const {
    data: marketSpotInvestorDrilldown,
    isLoading: marketSpotInvestorDrilldownLoading,
    isError: marketSpotInvestorDrilldownError,
  } = useQuery({
    queryKey: ["marketSpotInvestorDrilldown"],
    queryFn: () =>
      marketAndTradeInsightAPI.getMarketSpotDataInvestorDrilldown(),
  });
  const totalUsedExcessLbslFund =
    marketSpotInvestorDrilldown?.data?.reduce(
      (total, investor) => total + investor.usedExcessLbslFund,
      0,
    ) ?? 0;
  const { data: marketZGroupInvestorDrilldown } = useQuery({
    queryKey: ["marketZGroupInvestorDrilldown"],
    queryFn: () =>
      marketAndTradeInsightAPI.getMarketZGroupDataInvestorDrilldown(),
  });
  const totalZGroupUsedExcessLbslFund =
    marketZGroupInvestorDrilldown?.data?.reduce(
      (total, investor) => total + investor.usedExcessLbslFund,
      0,
    ) ?? 0;
  const totalZGroupInvestorCompanies = new Set(
    marketZGroupInvestorDrilldown?.data?.map((investor) => investor.symbol) ??
      [],
  ).size;

  const {
    data: adminEventCountData,
    isLoading: adminEventCountDataLoading,
    isError: adminEventCountDataError,
  } = useQuery({
    queryKey: ["adminEventCountData"],
    queryFn: () => marketAndTradeInsightAPI.getAdminEventCountData(),
  });

  if (isPending) {
    return <LoadingButton text="Loading..." />;
  }

  const records = negativeEquityHoldings?.data ?? [];
  const totalInvestors = records.reduce(
    (total, record) => total + record.totalInvestor,
    0,
  );

  const totalSpotInvestorCompanies =
    adminEventCountData?.find((event) => event.eventType === "Spot")
      ?.eventCount ?? 0;

  return (
    <div className="mx-4">
      <title>Market and Trade Insights - LBSL</title>
      <meta
        name="description"
        content="operational management insights analytics"
      />
      <PageHeader name="Market and Trade Insights" />
      <div className="grid grid-cols-12 gap-3 mt-2">
        {marketSpotInvestorDrilldown ? (
          <Card className="col-span-12 mb-2 mt-2 w-full min-w-0 max-w-full overflow-hidden bg-[#033e4a] shadow-xl">
            <CardHeader className="relative bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 pr-10 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                Monitoring of LBS Spot buy and fund using <LiveIndicator />
              </CardTitle>
              <p className="text-lg font-bold text-red-500 ">
                Total Client: {marketSpotInvestorDrilldown?.data?.length ?? 0}
                {" | "}Total Company: {totalSpotInvestorCompanies}
                {" | "}Total LBSL Fund:{" "}
                {numberToMillionsString(totalUsedExcessLbslFund)}
              </p>
              <a
                href={`${apiBaseUrl}/dashboards/market-spot-data-investor-drilldown-csv/`}
                download="market-spot-data-investor-drilldown.csv"
                aria-label="Download Market Spot Investor Drilldown CSV"
                title="Download Market Spot Investor Drilldown CSV"
                className="absolute top-3 right-2 inline-flex items-center text-white transition-opacity hover:opacity-75"
              >
                <Download className="h-5 w-5" />
              </a>
            </CardHeader>
            <CardContent className="mt-3 w-full min-w-0 max-w-full overflow-hidden">
              {marketSpotInvestorDrilldown?.data?.length > 0 ? (
                <MarketSpotInvestorDrilldownDataTable
                  data={marketSpotInvestorDrilldown.data}
                />
              ) : (
                <div className="text-white text-center py-6 w-full h-full flex items-center justify-center">
                  No Data Found
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <NoDataFound
            title="Monitoring of LBS Spot buy and fund using"
            className="col-span-12 mb-2 mt-2 shadow-xl"
          />
        )}

        {marketZGroupInvestorDrilldown ? (
          <Card className="col-span-12 mb-2 mt-2 w-full min-w-0 max-w-full overflow-hidden bg-[#033e4a] shadow-xl">
            <CardHeader className="relative bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 pr-10 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                Monitoring of LBS Z-Group buy and fund using <LiveIndicator />
              </CardTitle>
              <p className="text-lg font-bold text-red-500">
                Total Client: {marketZGroupInvestorDrilldown?.data?.length ?? 0}
                {" | "}Total Company: {totalZGroupInvestorCompanies}
                {" | "}Total LBSL Fund:{" "}
                {numberToMillionsString(totalZGroupUsedExcessLbslFund)}
              </p>
              <a
                href={`${apiBaseUrl}/dashboards/market-zgroup-data-investor-drilldown-csv/`}
                download="market-zgroup-data-investor-drilldown.csv"
                aria-label="Download Market Z-Group Investor Drilldown CSV"
                title="Download Market Z-Group Investor Drilldown CSV"
                className="absolute top-3 right-2 inline-flex items-center text-white transition-opacity hover:opacity-75"
              >
                <Download className="h-5 w-5" />
              </a>
            </CardHeader>
            <CardContent className="mt-3 w-full min-w-0 max-w-full overflow-hidden">
              {marketZGroupInvestorDrilldown?.data?.length > 0 ? (
                <MarketZGroupInvestorDrilldownDataTable
                  data={marketZGroupInvestorDrilldown.data}
                />
              ) : (
                <div className="text-white text-center py-6 w-full h-full flex items-center justify-center">
                  No Data Found
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <NoDataFound
            title="Monitoring of LBS Z-Group buy and fund using"
            className="col-span-12 mb-2 mt-2 shadow-xl"
          />
        )}
        <Card className="col-span-12 md:col-span-9 shadow-xl bg-[#033e4a]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg flex items-center gap-2">
              Market Negative Equity Holding
            </CardTitle>
            <p className="text-lg font-bold text-red-500">
              Total Companies: {records.length}
              {" | "}Total Investors:{" "}
              {new Intl.NumberFormat("en-BD").format(totalInvestors)}
            </p>
          </CardHeader>
          <CardContent className="mt-3">
            {isError ? (
              <p role="alert" className="text-sm text-red-600">
                Unable to load market negative-equity holding data.
              </p>
            ) : (
              <NegativeEquityHoldingsTable records={records} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
