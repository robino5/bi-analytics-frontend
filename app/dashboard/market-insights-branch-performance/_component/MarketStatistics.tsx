"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { numberToMillionsString } from "@/lib/utils";

interface MarketStatisticsProps {
    exchangeWiseMarketStatistics?: any;
    branchWiseMarketStatistics?: any;
    SelectedRegion?: string;
}
export default function MarketStatistics({ exchangeWiseMarketStatistics, branchWiseMarketStatistics,SelectedRegion }: MarketStatisticsProps) {
    console.log('Props - Exchange Wise Market Statistics:', exchangeWiseMarketStatistics);
    console.log('Props - Branch Wise Market Statistics:', branchWiseMarketStatistics);
    return (
        <Card className="w-full shadow-md bg-[#0e5e6f] p-2 mt-2">
            {/* Title Bar */}
            <div className="bg-yellow-400 text-center py-3 rounded-sm mb-6">
                <h2 className="text-lg font-bold">LBSL Market Statistics</h2>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Average Daily Turnover */}
                <Card className="border border-gray-300 bg-green-300">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold">
                            Average Daily Turnover (mn)
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">{exchangeWiseMarketStatistics?.rows?.[1].exchange}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(exchangeWiseMarketStatistics?.rows?.[1].avgTurnover)}</td>
                                </tr>
                                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">{exchangeWiseMarketStatistics?.rows?.[0].exchange}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(exchangeWiseMarketStatistics?.rows?.[0].avgTurnover)}</td>
                                </tr>
                                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">DSE+CSE</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(exchangeWiseMarketStatistics?.detail?.sumOfAvgTurnover)}</td>
                                </tr>
                                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">LBSL</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(exchangeWiseMarketStatistics?.detail?.sumOfLbslAvgTurnover)}</td>
                                </tr>
                                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">{SelectedRegion?SelectedRegion:"ALL"}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(branchWiseMarketStatistics?.detail?.sumOfAvgTurnover)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="text-center py-4 font-semibold text-lg border-t">
                            Total Trading Days: 63
                        </div>
                    </CardContent>
                </Card>

                {/* Total Turnover */}
                <Card className="border border-gray-300 bg-green-300">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold">
                            Total Turnover — Value (mn)
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">{exchangeWiseMarketStatistics?.rows?.[1].exchange}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(exchangeWiseMarketStatistics?.rows?.[1].totalTurnover)}</td>
                                </tr>
                                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">{exchangeWiseMarketStatistics?.rows?.[0].exchange}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(exchangeWiseMarketStatistics?.rows?.[0].totalTurnover)}</td>
                                </tr>
                                    <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">LBSL {exchangeWiseMarketStatistics?.rows?.[1].exchange}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(exchangeWiseMarketStatistics?.rows?.[1].lbslTotalTurnover)}</td>
                                </tr>
                                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">LBSL {exchangeWiseMarketStatistics?.rows?.[0].exchange}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(exchangeWiseMarketStatistics?.rows?.[0].lbslTotalTurnover)}</td>
                                </tr>
                                 <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">LBSL (DSE+CSE)</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(exchangeWiseMarketStatistics?.detail?.sumOfLbslTotalTurnover)}</td>
                                </tr>
                                 <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                    <td className="px-4 py-2 font-medium">{SelectedRegion?SelectedRegion:"ALL"}</td>
                                    <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(branchWiseMarketStatistics?.detail?.sumOfTotalTurnover)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* Market Share + Regional Contribution */}
                <div className="space-y-6">
                    {/* Market Share */}
                    <Card className="border border-gray-300 bg-green-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold">
                                Market Share (%)
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-0">
                            <table className="w-full text-sm">
                                <tbody>
                             
                                        <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                            <td className="px-4 py-2 font-medium">LBSL to DSE</td>
                                            <td className="px-4 py-2 text-right font-semibold">
                                                {((exchangeWiseMarketStatistics?.rows?.[1].lbslTotalTurnover/exchangeWiseMarketStatistics?.rows?.[1].totalTurnover)*100).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                                            <td className="px-4 py-2 font-medium">LBSL to CSE</td>
                                            <td className="px-4 py-2 text-right font-semibold">
                                                {((exchangeWiseMarketStatistics?.rows?.[0].lbslTotalTurnover/exchangeWiseMarketStatistics?.rows?.[0].totalTurnover)*100).toFixed(2)}
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                    {/* Regional Contribution */}
                    <Card className="border border-gray-300 bg-green-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold">
                                Regional Contribution
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-0">
                            <table className="w-full text-sm">
                                <tbody>
                                    <tr className="bg-green-50 border-b">
                                        <td className="px-4 py-2 font-medium">LBSL vs {SelectedRegion?SelectedRegion:"ALL"}</td>
                                        <td className="px-4 py-2 text-right font-semibold">
                                            {((branchWiseMarketStatistics?.detail?.sumOfTotalTurnover/exchangeWiseMarketStatistics?.detail?.sumOfLbslTotalTurnover)*100).toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Card>
    );
}
