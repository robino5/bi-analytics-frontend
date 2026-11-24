"use client";

import PageHeader from "@/components/PageHeader";
import LoadingButton from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import { marketAndTradeInsightAPI } from "./api";
import NegativeEquityHoldingsTable from "./_components/NegativeEquityHoldingsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketAndTradeInsightPage() {
  const {
    data: negativeEquityHoldings,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["marketNegativeEquityHoldingScrips"],
    queryFn: ({ signal }) =>
      marketAndTradeInsightAPI.getNegativeEquityHoldingScrips(signal),
  });

  if (isPending) {
    return <LoadingButton text="Loading..." />;
  }

  const records = negativeEquityHoldings?.data ?? [];
  const totalInvestors = records.reduce(
    (total, record) => total + record.totalInvestor,
    0,
  );

  return (
    <div className="mx-4">
      <title>Market and Trade Insights - LBSL</title>
      <meta
        name="description"
        content="operational management insights analytics"
      />
      <PageHeader name="Market and Trade Insights" />
      <div className="grid grid-cols-12 gap-3 mt-2">
        <Card className="col-span-12 md:col-span-9 shadow-xl bg-[#033e4a]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg flex items-center gap-2">
              Market Negative Equity Holding
            </CardTitle>
            <p className="text-lg font-bold text-red-500">
              Total Companies: {records.length}
              {" | "}Total Investors: {new Intl.NumberFormat("en-BD").format(totalInvestors)}
            </p>
          </CardHeader>
          <CardContent className="mt-3">
            {isError ? (
              <p role="alert" className="text-sm text-red-600">
                Unable to load market negative-equity holding data.
              </p>
            ) : (
              <NegativeEquityHoldingsTable
                records={records}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
