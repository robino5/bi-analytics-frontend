"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { regionalBusinessPerformanceAPI } from "./api/market-insights-branch-performance";
import { useQuery } from "@tanstack/react-query";
import FilterSection from "./_component/FilterSection";
import MarketStatistics from "./_component/MarketStatistics";
import BusinessPerformance from "./_component/BusinessPerformance";

export default function RegionalBusinessPerformancePage() {
  const [region, setRegion] = useState("");
  const [branch, setBranch] = useState("");
  const [branchName, setBranchName] = useState("");


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

    const { data: branchWiseRegionalBusinessPerformance } = useQuery({
    queryKey: ['branchWiseRegionalBusinessPerformance', branch, region],
    queryFn: () => regionalBusinessPerformanceAPI.getBranchWiseRegionalBusinessPerformance(branch, region),
  });

  const getBusinessDate = () => {
  const date = new Date();
  const day = date.getDay(); 
  // 0 = Sunday, 5 = Friday, 6 = Saturday

  if (day === 0) {
    // Sunday → go back to Thursday
    date.setDate(date.getDate() - 3);
  } else if (day === 5) {
    // Friday → go back to Thursday
    date.setDate(date.getDate() - 1);
  } else if (day === 6) {
    // Saturday → go back to Thursday
    date.setDate(date.getDate() - 2);
  } else {
    // Normal day → yesterday
    date.setDate(date.getDate() - 1);
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


  return (
    <div className="p-6">
      <PageHeader name="Regional Business Performance" period={`As on Date: ${getBusinessDate()}`} />


      <Card className="mt-6 shadow-xl bg-gradient-to-br from-[#033e4a] to-[#055b6d] rounded-xl border border-teal-900">
        <CardContent className="p-6">
          <FilterSection
            region={region}
            branch={branch}
            regionList={regionList}
            branchList={branchList}
            setRegion={setRegion}
            setBranch={setBranch}
            setBranchName={setBranchName}
          />
        </CardContent>
      </Card>

      {exchangeWiseMarketStatistics && branchWiseMarketStatistics &&

        <MarketStatistics
          exchangeWiseMarketStatistics={exchangeWiseMarketStatistics?.data}
          branchWiseMarketStatistics={branchWiseMarketStatistics?.data}
          SelectedRegion={region}
          SelectedBranch={branchName}
        />
      }
      <br></br>
      {branchWiseRegionalBusinessPerformance &&
        <BusinessPerformance
          businessPerformance={branchWiseRegionalBusinessPerformance?.data} 
        />
      }
    </div>
  );
}
