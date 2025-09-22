"use client";

import React from "react";

interface RsiProgressBarProps {
  value: number; // RSI value
}

const RsiProgressBar: React.FC<RsiProgressBarProps> = ({ value }) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);

  const status =
    value < 30 ? "Oversold" : value > 70 ? "Overbought" : "Neutral";

  return (
    <div className="space-y-3">
      {/* RSI numeric value */}
      <div className="flex justify-between text-sm font-medium">
        <span className="text-white">RSI: {value?.toFixed(2)}</span>
      </div>

      {/* Status label above bar */}
      <div className="relative w-full">
        <div
          className="absolute -top-6  font-bold text-white text-center whitespace-nowrap"
          style={{ left: `${clampedValue}%`, transform: "translateX(-50%)" }}
        >
          {status}
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-5 rounded-full overflow-hidden">
          {/* Color zones */}
          <div className="absolute left-0 top-0 h-full w-[30%] bg-gradient-to-r from-red-500 to-red-700"></div>
          <div className="absolute left-[30%] top-0 h-full w-[40%] bg-gradient-to-r from-green-500 to-green-600"></div>
          <div className="absolute left-[70%] top-0 h-full w-[30%] bg-gradient-to-r from-red-700 to-red-500"></div>

          {/* Value marker */}
          <div
            className="absolute top-0 h-full w-2 bg-black shadow-md transition-all duration-500"
            style={{ left: `${clampedValue}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RsiProgressBar;
