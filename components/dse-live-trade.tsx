import React from "react";
import { useQuery } from "@tanstack/react-query";
import { dseLiveTradeAPI } from "@/lib/services/dseLiveTrade";
import { cn } from "@/lib/utils";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import LiveTradeChart from "./LiveTradeChart";

export function DseLiveTrade() {
    const { data: liveTradeData, isLoading, isError } = useQuery({
        queryKey: ["dseLiveTrade"],
        queryFn: () => dseLiveTradeAPI.getDseLiveTradeData(),
        refetchInterval: 60000,
    });

    if (isLoading) {
        return (
            <Card
                className={cn("overflow-hidden drop-shadow-md flex items-center justify-center", "bg-[#033e4a] h-[237px]")}
            >
                <div className="text-white text-lg font-semibold">Loading...</div>
            </Card>
        );
    }

    if (isError || !liveTradeData) {
        return <div>Error loading live trade data.</div>;
    }

    return (
        <Card
            className={cn("overflow-hidden drop-shadow-md", "bg-[#033e4a] h-[255px]")}
        >
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2">
                <CardTitle className="text-white text-md">
                    Live DSE Trade Statistics
                </CardTitle>
            </CardHeader>
            <CardContent className="text-white text-xs overflow-y-auto p-2">
                <div className="flex gap-4 items-start">
                    <div className="rounded-lg overflow-hidden shadow-sm min-w-[400px] border border-gray-300">
                        <table className="text-left border-collapse text-sm w-full text-black font-semibold">
                            <tbody>
                                <tr>
                                    <td className="p-1 text-md bg-yellow-100">Volume</td>
                                    <td className="bg-yellow-100">: {liveTradeData.volume.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="p-1 text-md bg-yellow-50">Value (mn.)</td>
                                    <td className="bg-yellow-50">: {liveTradeData.value}</td>
                                </tr>
                                <tr>
                                    <td className="p-1 text-md bg-yellow-100">Trades</td>
                                    <td className="bg-yellow-100">: {liveTradeData.trades}</td>
                                </tr>
                                <tr>
                                    <td className="p-1 text-md bg-yellow-50">Listed Companies</td>
                                    <td className="bg-yellow-50">: {liveTradeData.listedsymbol}</td>
                                </tr>
                                <tr>
                                    <td className="p-1 text-md bg-yellow-100">Symbols Traded</td>
                                    <td className="bg-yellow-100">: {liveTradeData.symbols}</td>
                                </tr>
                                <tr>
                                    <td className="p-1 text-md bg-yellow-50">
                                        Total Trading Day ({new Date().getFullYear()})
                                    </td>
                                    <td className="bg-yellow-50">: {liveTradeData.totaltradingday}</td>
                                </tr>
                                <tr>
                                    <td className="p-1 text-md bg-yellow-100">
                                        Average Turnover (mn.) ({new Date().getFullYear()})
                                    </td>
                                    <td className="bg-yellow-100">: {parseInt(liveTradeData.avgturnover).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex-1 h-[180px]">
                        <LiveTradeChart
                            priceUp={liveTradeData.priceupsymbols}
                            priceFlat={liveTradeData.priceflatsymbols}
                            priceDown={liveTradeData.pricedownsymbols}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
