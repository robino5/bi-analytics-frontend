"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { regionalBusinessPerformanceAPI } from "./api/market-insights-branch-performance";
import { useQuery } from "@tanstack/react-query";
import FilterSection from "./_component/FilterSection";
import MarketStatistics from "./_component/MarketStatistics";

export default function RegionalBusinessPerformancePage() {
  const [region, setRegion] = useState("");
  const [branch, setBranch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  const { data: regionsBranch, isLoading: regionsBranchLoading, isError: regionsBranchError } = useQuery({
    queryKey: ["regionsBranch"],
    queryFn: () => regionalBusinessPerformanceAPI.getRegionsBranch()
  });

  // Unique regions
  const regionList = useMemo(() => {
    const unique = new Set(Array.isArray(regionsBranch?.data) ? regionsBranch.data.map((x) => x.regionName) : []);
    return Array.from(unique);
  }, [regionsBranch]);

  // Filtered branches
  const branchList = useMemo(() => {
    if (!region) return [];
    return Array.isArray(regionsBranch?.data) ? regionsBranch.data.filter((x) => x.regionName === region) : [];
  }, [region, regionsBranch]);

  const { data: exchangeWiseMarketStatistics } = useQuery({
    queryKey: ['exchangeWiseMarketStatistics'],
    queryFn: () => regionalBusinessPerformanceAPI.getExchangeWiseMarketStatistics(),
  });

  const { data: branchWiseMarketStatistics } = useQuery({
    queryKey: ['branchWiseMarketStatistics', branch, region],
    queryFn: () => regionalBusinessPerformanceAPI.getBranchWiseMarketStatistics(branch, region),
  });

  return (
    <div className="p-6">
      <PageHeader name="Regional Business Performance" />


      <Card className="mt-6 shadow-xl bg-gradient-to-br from-[#033e4a] to-[#055b6d] rounded-xl border border-teal-900">
        <CardContent className="p-6">
          <FilterSection
            region={region}
            branch={branch}
            fromDate={fromDate}
            toDate={toDate}
            regionList={regionList}
            branchList={branchList}
            setRegion={setRegion}
            setBranch={setBranch}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        </CardContent>
      </Card>

      {exchangeWiseMarketStatistics && branchWiseMarketStatistics &&

        <MarketStatistics
          exchangeWiseMarketStatistics={exchangeWiseMarketStatistics?.data}
          branchWiseMarketStatistics={branchWiseMarketStatistics?.data}
          SelectedRegion={region}
        />
      }
    </div>
  );
}
