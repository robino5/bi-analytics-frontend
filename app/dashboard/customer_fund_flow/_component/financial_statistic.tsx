import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberToMillionsString } from "@/lib/utils";

interface FinancialStatisticProps {
  title: string;
  amount: number;
  color: string;
}

const FinancialStatistic: React.FC<FinancialStatisticProps> = ({
  title,
  amount,
  color
}) => {
  return (
    <Card
      className={`relative overflow-hidden border-[3px] ${color} border-l-[15px] 
    rounded-2xl shadow-xl  bg-[#033e4a]
    hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 ease-in-out`}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 via-cyan-400/10 to-indigo-500/20 opacity-60"></div>

      <CardHeader className="relative z-10 bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-700 p-2 ">
        <CardTitle className="text-lg font-semibold text-white tracking-wide drop-shadow-md">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 p-5">
        <p className="text-3xl font-bold text-white drop-shadow-sm tracking-wide">
          {numberToMillionsString(amount)}
        </p>
        <div className="mt-3 w-16 h-[3px] bg-gradient-to-r from-teal-400 to-sky-400 rounded-full"></div>
      </CardContent>
    </Card>

  );
};

export default FinancialStatistic;
