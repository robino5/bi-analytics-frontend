"use client";

import { numberToMillionsString } from "@/lib/utils";

interface TradingSummaryBoardProps {
    clientTradeSummaryByToday?: any;
    sectorwiseTrunoverComparison?: any;
    realtimeTopRMTurnover?: any;
    investorLiveTrade?: any;
}

const TradingSummaryBoard: React.FC<TradingSummaryBoardProps> = ({
    clientTradeSummaryByToday,
    sectorwiseTrunoverComparison,
    realtimeTopRMTurnover,
    investorLiveTrade,
}) => {
    console.log("Client Trade Summary:", investorLiveTrade);
    return (
        <div className="grid grid-cols-12 gap-3">
            {/* Total Trade */}
            <div className="col-span-6 bg-teal-300 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl font-extrabold text-black">
                    {numberToMillionsString(
                        clientTradeSummaryByToday?.data[2]?.totalTurnover ?? 0
                    )}
                </h2>
                <p className="text-lg font-semibold text-black">Total Turnover Today</p>
            </div>

            {/* Top Company */}
            <div className="col-span-6 bg-teal-300 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-black">
                    {sectorwiseTrunoverComparison?.data?.[0]?.name}
                </h2>
                <p className="text-lg font-semibold text-black">
                    Turnover:{" "}
                    {numberToMillionsString(
                        sectorwiseTrunoverComparison?.data?.[0]?.value ?? 0
                    )}
                </p>
                <p className="text-sm text-black">Top Company (Today Turnover)</p>
            </div>

            {/* Top Trader */}
            <div className="col-span-6 bg-teal-300 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-black">
                    {realtimeTopRMTurnover?.data?.[0]?.rmName}
                </h2>
                <p className="text-lg font-semibold text-black">
                    Turnover:{" "}
                    {numberToMillionsString(
                        realtimeTopRMTurnover?.data?.[0]?.totalTurnOverToday ?? 0
                    )}
                </p>
                <p className="text-sm text-black">Top RM (Today Turnover)</p>
            </div>

            {/* Top Investor */}
            <div className="col-span-6 bg-teal-300 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-black">
                    {investorLiveTrade?.data?.[0]?.investorCode}
                </h2>
                <p className="text-lg font-semibold text-black">
                    Turnover:{" "}
                    {numberToMillionsString(investorLiveTrade?.data?.[0]?.turnover ?? 0)}
                </p>
                <p className="text-sm text-black">Top Investor (Turnover)</p>
            </div>
        </div>
    );
};

export default TradingSummaryBoard;
