"use client"

import PageHeader from "@/components/PageHeader";
import { tradeInsightAPI } from "./api";
import { useQuery } from "@tanstack/react-query";
import LoadingButton from "@/components/loading";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { DataTable as InvestorLiveTradeDataTable } from "./_components/investor_live_trade/_investorLiveTradeTable";
import { investorLiveTradeClientsColumns } from "./_components/investor_live_trade/_investorLiveTradeTableColumns";
import LiveIndicator from "@/components/ui/live-indicator";
import { investorLiveBuySaleClientsColumns } from "./_components/investor_live_top_buya_sale/_investorLiveBuySaleTableColumns";
import { DataTable as InvestorLiveBuySaleDatatable } from "./_components/investor_live_top_buya_sale/_investorLiveBuySaleTable";
import { DataTable as RealtimeTopRMTurnoverDataTable } from "./_components/top_rm_turnover/_topRMTurnoverTable";
import { adminRealTimeTopTurnoverColumns } from "./_components/top_rm_turnover/_topRMTurnoverTableColumns";
import NoDataFound from "@/components/NoDataFound";
import BarChartHorizontal from "./_components/BarChartHorizontal";
import CardBoard from "@/components/CardBoard";
import { SkeletonStatistics } from "@/components/skeletonCard";
import { BarColors } from "@/components/ui/utils/constants";
import TradingSummaryBoard from "./_components/_tradingSummary";
import CompanyPeRationBoard from "./_components/_companyPeRation";
import { marketRiskColumns } from "./_components/market_risk/_marketRiskTableColumns";
import { DataTable as MarketRiskDataTable } from "./_components/market_risk/_marketRiskTable";
import { Download } from "lucide-react";

const ActiveTradingCodesBoard = () => {

    const sectorMarginCodeExposureOption = {
        legendName: "Quantity",
        dataKey: "name",
        valueKey: "value",
        fill: BarColors.blue,
        stroke: "purple",
        height: 700,
        barLabel: true,
    };

    const { data: investorLiveTrade, isLoading: investorLiveTradeLoading, isError: investorLiveTradeError } = useQuery({
        queryKey: ["investorLiveTrade"],
        queryFn: () => tradeInsightAPI.getInvestorLiveTrade()
    });

      const { data: topTurnoverInvestor, isLoading: topTurnoverInvestorLoading, isError: topTurnoverInvestorError } = useQuery({
        queryKey: ["topTurnoverInvestor"],
        queryFn: () => tradeInsightAPI.getTopTurnoverInvestor()
    });


    const { data: investorLiveTopBuy, isLoading: investorLiveTopBuyLoading, isError: investorLiveTopBuyError } = useQuery({
        queryKey: ["investorLiveTopBuy"],
        queryFn: () => tradeInsightAPI.getInvestorLiveTopBuy()
    });


    const { data: investorLiveTopSale, isLoading: investorLiveTopSaleLoading, isError: investorLiveTopSaleError } = useQuery({
        queryKey: ["investorLiveTopSale"],
        queryFn: () => tradeInsightAPI.getInvestorLiveTopSale()
    });

    const { data: realtimeTopRMTurnover, isLoading: realtimeTopRMTurnoverLoading, isError: realtimeTopRMTurnoverError } = useQuery({
        queryKey: ["realtimeTopRMTurnover"],
        queryFn: () => tradeInsightAPI.getRealtimeTopRMTurnover()
    });

    const { data: clientTradeSummaryByToday, isLoading: clientTradeSummaryByTodayLoading, isError: clientTradeSummaryByTodayError } = useQuery({
        queryKey: ["clientTradeSummaryByToday"],
        queryFn: () => tradeInsightAPI.getClientTradeSummaryByToday()
    });
    const { data: sectorwiseTrunoverComparison, isLoading: sectorwiseTrunoverComparisonLoading, isError: sectorwiseTrunoverComparisonError } = useQuery({
        queryKey: ["sectorwiseTrunoverComparison"],
        queryFn: () => tradeInsightAPI.getSectorwiseTurnoverTop20()
    });
    const { data: companyPeRation, isLoading: companyPeRationLoading, isError: companyPeRationError } = useQuery({
        queryKey: ["companyPeRation"],
        queryFn: () => tradeInsightAPI.getCompanyPERation()
    });

      const { data: adminMarketRiskData, isLoading: adminMarketRiskDataLoading, isError: adminMarketRiskDataError } = useQuery({
        queryKey: ["adminMarketRiskData"],
        queryFn: () => tradeInsightAPI.getAdminMarketRiskData()
    });

    const isLoading = realtimeTopRMTurnoverLoading || investorLiveTradeLoading || investorLiveTopBuyLoading || investorLiveTopSaleLoading ||
        clientTradeSummaryByTodayLoading || sectorwiseTrunoverComparisonLoading || companyPeRationLoading || topTurnoverInvestorLoading || adminMarketRiskDataLoading;
    const error = realtimeTopRMTurnoverError || investorLiveTopSaleError || investorLiveTopBuyError || investorLiveTradeError ||
        clientTradeSummaryByTodayError || sectorwiseTrunoverComparisonError || companyPeRationError || topTurnoverInvestorError || adminMarketRiskDataError;


    if (isLoading) {
        return <LoadingButton text="Loading..." />
    }

    if (error) {
        // TODO: Return a beautiful Error boundary component
        return <>Error...</>
    }

    console.log("sectorwiseTrunoverComparison", investorLiveTopBuy?.data,investorLiveTopSale?.data);

    return (
        <div className="mx-4">
            <PageHeader
                name={`Trade Insights`}
            />
            <div className="grid grid-cols-12 gap-3 mt-2">
                <Card className="col-span-12 md:col-span-6 shadow-xl bg-[#033e4a]">
                    <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                            LBSL Trade at a Glance (Today)
                            <LiveIndicator />
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="mt-3 gap-3">
                        <TradingSummaryBoard
                            clientTradeSummaryByToday={clientTradeSummaryByToday}
                            sectorwiseTrunoverComparison={sectorwiseTrunoverComparison}
                            realtimeTopRMTurnover={realtimeTopRMTurnover}
                            investorLiveTrade={topTurnoverInvestor}
                        />
                    </CardContent>

                </Card>
                {/* <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#033e4a]">
                    <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                        <CardTitle className="text-white text-md text-lg flex items-center gap-2"> <LiveIndicator /></CardTitle>
                    </CardHeader>
                    <CardContent className="mt-3">
                
                    </CardContent>
                </Card> */}

                <Card className="col-span-12 md:col-span-6 shadow-xl bg-[#033e4a]">
                    <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                        <CardTitle className="text-white text-md text-lg flex items-center gap-2">Company Wise PE Ratio</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-3">
                        <CompanyPeRationBoard
                            sectorwiseTrunoverComparison={sectorwiseTrunoverComparison}
                            companyPiRation={companyPeRation}
                        />
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-12 gap-3 mt-2">
                {investorLiveTopBuy ? (
                    <Card className="col-span-12 md:col-span-6 shadow-xl bg-[#033e4a]">
                        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                            <CardTitle className="text-white text-lg flex items-center gap-2">
                                Top Twenty Buyer
                                <LiveIndicator />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="mt-3">
                            {investorLiveTopBuy?.data?.length > 0 ? (
                                <InvestorLiveBuySaleDatatable
                                    data={investorLiveTopBuy?.data}
                                    columns={investorLiveBuySaleClientsColumns}
                                />
                            ) : (
                                <div className="text-white text-center py-6 w-full h-full flex items-center justify-center">No Data Found</div>
                            )}
                        </CardContent>
                    </Card>
                ) : <NoDataFound title="Top Twenty Buyer" className="col-span-12 md:col-span-6 shadow-xl" />}

                {investorLiveTopSale ? (
                    <Card className="col-span-12 md:col-span-6 shadow-xl bg-[#033e4a]">
                        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                            <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Twenty Seller <LiveIndicator /></CardTitle>
                        </CardHeader>
                        <CardContent className="mt-3">
                            {investorLiveTopSale?.data?.length > 0 ? (
                                <InvestorLiveBuySaleDatatable
                                    data={investorLiveTopSale?.data}
                                    columns={investorLiveBuySaleClientsColumns}
                                />
                            ) : (
                                <div className="text-white text-center py-6 w-full h-full flex items-center justify-center">No Data Found</div>
                            )}
                        </CardContent>
                    </Card>
                ) : <NoDataFound title="Top Twenty Seller" className="col-span-12 md:col-span-6 shadow-xl" />}
            </div>

            <div className="grid grid-cols-12 gap-3 mt-2">
                {realtimeTopRMTurnover ? (
                    <Card className="col-span-12 md:col-span-7 bg-[#033e4a]">
                        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                            <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top RM Turnover<LiveIndicator /></CardTitle>
                            {/* <CardDescription className="text-white">
                      Client Details for Regional Managers
                    </CardDescription> */}
                        </CardHeader>
                        <CardContent className="mt-3">
                            {realtimeTopRMTurnover?.data?.length > 0 ? (
                                <RealtimeTopRMTurnoverDataTable
                                    data={realtimeTopRMTurnover?.data}
                                    columns={adminRealTimeTopTurnoverColumns}
                                />
                            ) : (
                                <div className="text-white text-center py-6 w-full h-full flex items-center justify-center">No Data Found</div>
                            )}
                        </CardContent>
                    </Card>
                ) : <NoDataFound title="Top RM Turnover" className="col-span-12 md:col-span-7" />}
                {realtimeTopRMTurnover?.data ? (
                    <CardBoard
                        className="col-span-5 xl:col-span-5"
                        title="Top RM Total Turnover (Today)"
                        liveIndicator={true}
                        // subtitle="Shows analytics of marginal performance for comodities"
                        children={
                            <BarChartHorizontal
                                data={realtimeTopRMTurnover?.data
                                    ?.map((item: any) => ({
                                        name: item.rmName,
                                        value: item.totalTurnOverToday,
                                    }))
                                    .sort((a: any, b: any) => b.value - a.value) // sort descending
                                }
                                options={sectorMarginCodeExposureOption}
                                colorArray={["#FFD93D", "#4D96FF"]}
                            />
                        }
                    />
                ) : (
                    <SkeletonStatistics className="col-span-6 xl:col-span-3" />
                )}
            </div>
           
           
            {investorLiveTrade ? (
                <Card className="col-span-6 mb-2 mt-2 bg-[#033e4a] shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                        <CardTitle className="text-white text-md text-lg flex items-center gap-2">Admin Market Risk Data <LiveIndicator /></CardTitle>
                        {/* <CardDescription className="text-white">
                      Client Details for Regional Managers
                    </CardDescription> */}
                    </CardHeader>
                    <CardContent className="mt-3">
                        {investorLiveTrade?.data?.length > 0 ? (
                            <InvestorLiveTradeDataTable
                                data={investorLiveTrade?.data}
                                columns={investorLiveTradeClientsColumns}
                            />
                        ) : (
                            <div className="text-white text-center py-6 w-full h-full flex items-center justify-center">No Data Found</div>
                        )}
                    </CardContent>
                </Card>
            ) : <NoDataFound title="Admin Market Risk Data" className="col-span-12 mb-2 mt-2 shadow-xl" />}

               {adminMarketRiskData ? (
                <Card className="col-span-12 mb-2 mt-2 w-0 min-w-full max-w-full overflow-hidden bg-[#033e4a] shadow-xl">
                    <CardHeader className="relative bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                        <CardTitle className="text-white text-md text-lg flex items-center gap-2">Admin Market Risk Data <LiveIndicator /></CardTitle>
                        <a
                            href="https://idash.lbsbd.com:8080/api/v1/dashboards/admin-market-risk-data-csv/"
                            download="admin-market-risk-data.csv"
                            aria-label="Download Admin Market Risk Data"
                            title="Download Admin Market Risk Data"
                            className="absolute top-3 right-2 inline-flex items-center text-white transition-opacity hover:opacity-75"
                        >
                            <Download className="h-5 w-5" />
                        </a>
                        {/* <CardDescription className="text-white">
                      Client Details for Regional Managers
                    </CardDescription> */}
                    </CardHeader>
                    <CardContent className="mt-3 w-0 min-w-full max-w-full">
                        {adminMarketRiskData?.data?.length > 0 ? (
                            <MarketRiskDataTable
                                data={adminMarketRiskData?.data}
                                columns={marketRiskColumns}
                            />
                        ) : (
                            <div className="text-white text-center py-6 w-full h-full flex items-center justify-center">No Data Found</div>
                        )}
                    </CardContent>
                </Card>
            ) : <NoDataFound title="Admin Market Risk Data" className="col-span-12 mb-2 mt-2 shadow-xl" />}

             

        </div>
    )

}

export default ActiveTradingCodesBoard;