"use client";

import React from "react";

interface RsiProgressBarProps {
    value: number; // RSI value
}

const RsiProgressBar: React.FC<RsiProgressBarProps> = ({ value }) => {
    return (
        <div className="space-y-3">
            {/* RSI Value & Status */}
            <div className="flex justify-between text-sm font-medium">
                <span className="text-white">RSI: {value?.toFixed(2)}</span>
                <span className="text-white">
                    {value < 30
                        ? "Oversold"
                        : value > 70
                            ? "Overbought"
                            : "Neutral"}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-5 rounded-full overflow-hidden">
                {/* Oversold Zone (0–30) */}
                <div className="absolute left-0 top-0 h-full w-[30%] bg-gradient-to-r from-red-500 to-red-700"></div>

                {/* Neutral Zone (30–70) */}
                <div className="absolute left-[30%] top-0 h-full w-[40%] bg-gradient-to-r from-green-500 to-green-600"></div>

                {/* Overbought Zone (70–100) */}
                <div className="absolute left-[70%] top-0 h-full w-[30%] bg-gradient-to-r from-red-700 to-red-500"></div>

                {/* RSI Indicator Line */}
                <div
                    className="absolute top-0 h-full w-1 bg-black shadow-md transition-all duration-500"
                    style={{ left: `${Math.min(Math.max(value, 0), 100)}%` }}
                ></div>
            </div>
        </div>
    );
};

export default RsiProgressBar;
