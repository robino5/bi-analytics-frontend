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
import NoDataFound from "./_components/_no_data_found";
import BarChartHorizontal from "./_components/BarChartHorizontal";
import CardBoard from "@/components/CardBoard";
import { SkeletonStatistics } from "@/components/skeletonCard";
import { BarColors } from "@/components/ui/utils/constants";
import TradingSummaryBoard from "./_components/_tradingSummary";
import CompanyPeRationBoard from "./_components/_companyPeRation";

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

    const isLoading = realtimeTopRMTurnoverLoading || investorLiveTradeLoading || investorLiveTopBuyLoading || investorLiveTopSaleLoading ||
        clientTradeSummaryByTodayLoading || sectorwiseTrunoverComparisonLoading || companyPeRationLoading || topTurnoverInvestorLoading;
    const error = realtimeTopRMTurnoverError || investorLiveTopSaleError || investorLiveTopBuyError || investorLiveTradeError ||
        clientTradeSummaryByTodayError || sectorwiseTrunoverComparisonError || companyPeRationError || topTurnoverInvestorError;


    if (isLoading) {
        return <LoadingButton text="Loading..." />
    }

    if (error) {
        // TODO: Return a beautiful Error boundary component
        return <>Error...</>
    }

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
                            <InvestorLiveBuySaleDatatable
                                data={investorLiveTopBuy?.data}
                                columns={investorLiveBuySaleClientsColumns}
                            />
                        </CardContent>
                    </Card>
                ) : null}

                {investorLiveTopSale ? (
                    <Card className="col-span-12 md:col-span-6 shadow-xl bg-[#033e4a]">
                        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                            <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Twenty Seller <LiveIndicator /></CardTitle>
                        </CardHeader>
                        <CardContent className="mt-3">
                            <InvestorLiveBuySaleDatatable
                                data={investorLiveTopSale?.data}
                                columns={investorLiveBuySaleClientsColumns}
                            />
                        </CardContent>
                    </Card>
                ) : null}
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
                            <RealtimeTopRMTurnoverDataTable
                                data={realtimeTopRMTurnover?.data}
                                columns={adminRealTimeTopTurnoverColumns}
                            />
                        </CardContent>
                    </Card>
                ) : <NoDataFound title={"Investor Live Trade RM Wise "} />}
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
                <Card className="col-span-6 mb-2 shadow-xl bg-[#033e4a] mt-2">
                    <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
                        <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Investor Turnover <LiveIndicator /></CardTitle>
                        {/* <CardDescription className="text-white">
                      Client Details for Regional Managers
                    </CardDescription> */}
                    </CardHeader>
                    <CardContent className="mt-3">
                        <InvestorLiveTradeDataTable
                            data={investorLiveTrade?.data}
                            columns={investorLiveTradeClientsColumns}
                        />
                    </CardContent>
                </Card>
            ) : <NoDataFound title={"Investor Live Trade RM Wise "} />}

        </div>
    )

}

export default ActiveTradingCodesBoard;