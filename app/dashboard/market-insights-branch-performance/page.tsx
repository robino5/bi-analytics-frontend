"use client";

import { useState, useMemo, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { regionalBusinessPerformanceAPI } from "./api/market-insights-branch-performance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FilterSection from "./_component/FilterSection";
import MarketStatistics from "./_component/MarketStatistics";
import BusinessPerformance from "./_component/BusinessPerformance";
import { format, parseISO } from "date-fns";
import { toast } from "@/components/ui/use-toast";

export default function RegionalBusinessPerformancePage() {
  const [region, setRegion] = useState("");
  const [branch, setBranch] = useState("");
  const [branchName, setBranchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const queryClient = useQueryClient();

  const {
    data: regionsBranch,
    isLoading: regionsBranchLoading,
    isError: regionsBranchError,
  } = useQuery({
    queryKey: ["regionsBranch"],
    queryFn: () => regionalBusinessPerformanceAPI.getRegionsBranch(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Unique regions
  const regionList = useMemo(() => {
    const unique = new Set(
      Array.isArray(regionsBranch?.data)
        ? regionsBranch.data.map((x) => x.regionName)
        : [],
    );
    return Array.from(unique);
  }, [regionsBranch]);

  // Filtered branches
  const branchList = useMemo(() => {
    if (!region) return [];
    return Array.isArray(regionsBranch?.data)
      ? regionsBranch.data.filter((x) => x.regionName === region)
      : [];
  }, [region, regionsBranch]);

  const { data: exchangeWiseMarketStatistics, isLoading: exchangeWiseMarketStatisticsLoading } = useQuery({
    queryKey: ["exchangeWiseMarketStatistics"],
    queryFn: () => regionalBusinessPerformanceAPI.getExchangeWiseMarketStatistics(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: branchWiseMarketStatistics, isLoading: branchWiseMarketStatisticsLoading } = useQuery({
    queryKey: ["branchWiseMarketStatistics"],
    queryFn: () => regionalBusinessPerformanceAPI.getBranchWiseMarketStatistics(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: branchWiseRegionalBusinessPerformance, isLoading: branchWiseRegionalBusinessPerformanceLoading } = useQuery({
    queryKey: ["branchWiseRegionalBusinessPerformance"],
    queryFn: () => regionalBusinessPerformanceAPI.getBranchWiseRegionalBusinessPerformance(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: branchPerformanceProcess, isLoading: branchPerformanceProcessLoading } = useQuery({
    queryKey: ["branchPerformanceProcess"],
    queryFn: () => regionalBusinessPerformanceAPI.getBranchPerformanceProcess(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  

  const loading =
    regionsBranchLoading ||
    exchangeWiseMarketStatisticsLoading ||
    branchWiseMarketStatisticsLoading ||
    branchWiseRegionalBusinessPerformanceLoading ||
    branchPerformanceProcessLoading;

  const { mutate: processBranchPerformance, isPending } = useMutation({
    mutationFn: () =>
      regionalBusinessPerformanceAPI.processBranchPerformanceWithDates(
        startDate,
        endDate,
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries();

      toast({
        description: "Processing Completed Successfully.",
        className: "bg-green-400 text-green-900 text-lg p-4",
      });
    },

    onError: (error) => {
      console.error("Process branch performance failed", error);
    },
  });

  return (
    <div className="p-6">
      <PageHeader
        name="Regional Business Performance"
        period={`From: ${
          branchPerformanceProcess?.data?.dateFrom
            ? format(
                parseISO(branchPerformanceProcess.data.dateFrom),
                "dd-MMM-yyyy",
              )
            : ""
        } to ${
          branchPerformanceProcess?.data?.dateTo
            ? format(
                parseISO(branchPerformanceProcess.data.dateTo),
                "dd-MMM-yyyy",
              )
            : ""
        }`}
      />

          <FilterSection
            region={region}
            branch={branch}
            regionList={regionList}
            branchList={branchList}
            setRegion={setRegion}
            setBranch={setBranch}
            setBranchName={setBranchName}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            processBranchPerformance={processBranchPerformance}
            isPending={isPending}
            startDate={startDate}
            endDate={endDate}
          />
    

      {exchangeWiseMarketStatistics && branchWiseMarketStatistics && (
        <MarketStatistics
          exchangeWiseMarketStatistics={exchangeWiseMarketStatistics?.data}
          branchWiseMarketStatistics={branchWiseMarketStatistics?.data}
          SelectedRegion={region}
          SelectedBranch={branchName}
          selectedBracheCode={branch}
        />
      )}
      <br></br>
      {branchWiseRegionalBusinessPerformance && (
        <BusinessPerformance
          businessPerformance={branchWiseRegionalBusinessPerformance?.data}
          branch={branch}
          region={region}
        />
      )}
    </div>
  );
}
