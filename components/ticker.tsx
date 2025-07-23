"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ticketAPI } from "@/lib/services/tickers";
import { MoveUp, MoveDown } from "lucide-react";

// 🛡️ Type declaration for <marquee> support
declare global {
    namespace JSX {
        interface IntrinsicElements {
            marquee: any;
        }
    }
}
type TickerItem = {
    mkistaT_INSTRUMENT_CODE: string;
    mkistaT_PUB_LAST_TRADED_PRICE: number;
    priceChange: number;
    priceChangePCT: number;
};

export function Ticker() {
    const {
        data: tickerResponse,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tickerData"],
        queryFn: () => ticketAPI.getTickerData(),
        refetchInterval: 66000,
        refetchOnWindowFocus: false,
    });

    const ticker: TickerItem[] = tickerResponse || [];

    const getColor = (value: number) => {
        if (value > 0) return "text-green-500";
        if (value < 0) return "text-red-500";
        return "text-blue-500";
    };

    if (isLoading || isError || !ticker.length) {
        return (
              <div className="py-3.5 overflow-hidden whitespace-nowrap">
            <marquee scrollAmount={5}>
                <span>{isLoading ? "Loading ticker..." : "Error loading ticker."}</span>
                </marquee>
            </div>
        );
    }

    return (
        <div className="py-1 overflow-hidden whitespace-nowrap">
            <marquee scrollAmount={5}>
                <div className="flex space-x-3">
                    {ticker.map((item, index) => {
                        const {
                            mkistaT_INSTRUMENT_CODE,
                            mkistaT_PUB_LAST_TRADED_PRICE,
                            priceChange,
                            priceChangePCT,
                        } = item;

                        const priceColor = getColor(priceChange);
                        const changeColor = getColor(priceChange);
                        const percentColor = getColor(priceChangePCT);

                        return (
                            <div
                                key={index}
                                className="bg-white rounded px-2 py-1 text-xs w-36 shadow flex-shrink-0 border border-gray-300"
                            >
                                {/* Top Row */}
                                <div className="flex justify-between">
                                    <span className="font-bold text-black">
                                        {mkistaT_INSTRUMENT_CODE}
                                    </span>
                                    <span className={`${priceColor} font-semibold`}>
                                        {mkistaT_PUB_LAST_TRADED_PRICE.toFixed(2)}
                                    </span>
                                </div>

                                {/* Bottom Row */}
                                <div className="flex justify-between mt-1">
                                    <span className={`flex items-center gap-1 ${changeColor}`}>
                                        {priceChange > 0 && <MoveUp size={12} />}
                                        {priceChange < 0 && <MoveDown size={12} />}
                                         {priceChange.toFixed(2)}
                                    </span>
                                    <span className={`${percentColor}`}>
                                        {priceChangePCT.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </marquee>
        </div>
    );
}
