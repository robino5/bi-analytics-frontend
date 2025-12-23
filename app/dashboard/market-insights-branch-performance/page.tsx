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

  /* Return current fiscal quarter range like "Oct-2025 to Dec-2025" */
const getFiscalQuarterRange = (): string => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let start = 0;
    let end = 2;
    let startYear = year;
    let endYear = year;

    if (month >= 9) {
        // Oct - Dec
        start = 9; end = 11;
    } else if (month <= 2) {
        // Jan - Mar
        start = 0; end = 2;
    } else if (month <= 5) {
        // Apr - Jun
        start = 3; end = 5;
    } else {
        // Jul - Sep
        start = 6; end = 8;
    }

    return `${monthNames[start]}-${startYear} to ${monthNames[end]}-${endYear}`;
}


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

  return (
    <div className="p-6">
      <PageHeader name="Regional Business Performance" period={getFiscalQuarterRange()} />


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
