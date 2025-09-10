'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, Banknote } from "lucide-react";
import { TraderPerformance } from "../../business-and-trade-management/types";
import { numberToMillionsString } from "@/lib/utils";

export function RMPerformance({ data }: { data: TraderPerformance }) {
    return (
        <Card className="col-span-2 overflow-auto rounded-md shadow-md bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-1 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-white text-md text-lg">
                    RM Performance Summary (Yearly)
                </CardTitle>
            </CardHeader>

            <CardContent className="mt-3 grid grid-cols-2 gap-2">
                {/* Trader */}
                <div className="p-3 rounded-lg shadow-sm bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
                    <h3 className="flex items-center gap-1 font-semibold text-gray-800 mb-2 border-b border-blue-300 pb-1">
                        <Users className="h-4 w-4 text-blue-600" /> Trader
                    </h3>
                    <p className="font-medium text-black">{data.traderName}</p>
                    <p className="text-sm font-semibold text-gray-700">ID: {data.traderId}</p>
                    <p className="text-sm font-semibold text-gray-700">Emp#: {data.empNumber}</p>
                </div>

                {/* Performance */}
                <div className="p-3 rounded-lg shadow-sm bg-gradient-to-r from-green-100 via-green-200 to-green-300">
                    <h3 className="flex items-center gap-1 font-semibold text-gray-800 mb-2 border-b border-green-400 pb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" /> Performance
                    </h3>
                    <p className="text-black">Total TurnOver: <span className="font-semibold ">{numberToMillionsString(data.dailyTraded || 0)}</span></p>
                    <p className="text-black">Commission Earned: <span className="font-semibold">{numberToMillionsString(data.commission || 0)}</span></p>
                    <p className="text-black">New BO: <span className="font-semibold">{data.newBo}</span></p>
                </div>

                {/* Funds */}
                <div className="p-3 rounded-lg shadow-sm bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300">
                    <h3 className="flex items-center gap-1 font-semibold text-gray-800 mb-2 border-b border-pink-400 pb-1">
                        <Banknote className="h-4 w-4 text-yellow-600" /> Funds
                    </h3>
                    <p className="text-black">Total Deposit: <span className="font-semibold">{numberToMillionsString(data.totalDeposit || 0)}</span></p>
                    <p className="text-black">Total Withdrawal: <span className="font-semibold">{numberToMillionsString(data.totalWithdrawal || 0)}</span></p>
                    <p className="text-black">
                        Net Fund:{" "}
                        <span
                            className={`font-semibold ${(data.totalNetFund || 0) > 0
                                    ? "text-green-600"
                                    : (data.totalNetFund || 0) < 0
                                        ? "text-red-600"
                                        : "text-gray-700"
                                }`}
                        >
                            {numberToMillionsString(data.totalNetFund || 0)}
                        </span>
                    </p>
                </div>

                {/* Link Shares */}
                <div className="p-3 rounded-lg shadow-sm bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300">
                    <h3 className="flex items-center gap-1 font-semibold text-gray-800 mb-2 border-b border-yellow-400 pb-1">
                        <DollarSign className="h-4 w-4 text-purple-600" /> Link Shares
                    </h3>
                    <p className="text-black">In: <span className="font-semibold">{numberToMillionsString(data.totalLinkShareIn || 0)}</span></p>
                    <p className="text-black">Out: <span className="font-semibold">{numberToMillionsString(data.totalLinkShareOut || 0)}</span></p>
                    <p className="text-black">
                        Net:{" "}
                        <span
                            className={`font-semibold ${(data.totalNetLinkShare || 0) > 0
                                    ? "text-green-600"
                                    : (data.totalNetLinkShare || 0) < 0
                                        ? "text-red-600"
                                        : "text-gray-700"
                                }`}
                        >
                            {numberToMillionsString(data.totalNetLinkShare || 0)}
                        </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
