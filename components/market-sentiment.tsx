import React from "react";
import { useQuery } from "@tanstack/react-query";
import { dseLiveTradeAPI } from "@/lib/services/dseLiveTrade";
import GaugeChart from "./Gaugechart";

export default function MarketSentiment() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dseDsexSumData"],
    queryFn: () => dseLiveTradeAPI.getLiveMarketSentiment(),
    refetchInterval: 30000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading market sentiment</div>;

  const value = data ?? 50;

  const ranges = [
    { label: "Bear", range: "0–20", min: 0, max: 20, color: "text-red-600" },
    { label: "Bear", range: "20–40", min: 20, max: 40, color: "text-orange-500" },
    { label: "Neutral", range: "40–60", min: 40, max: 60, color: "text-gray-600" },
    { label: "Bull", range: "60–80", min: 60, max: 80, color: "text-green-500" },
    { label: "Bull", range: "80–100", min: 80, max: 100, color: "text-green-700" },
  ];

  const activeRange = ranges.find(r => value >= r.min && value < r.max);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Gauge chart */}
      <div className="w-full">
        <GaugeChart data={value} />
      </div>
    </div>
  );
}
