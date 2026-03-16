"use client";

import { useState, useMemo, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { regionalBusinessPerformanceAPI } from "./api/market-insights-branch-performance";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const [exchangeWiseMarketStatistics, setExchangeWiseMarketStatistics] =
    useState<any>(null);
  const [branchWiseMarketStatistics, setBranchWiseMarketStatistics] =
    useState<any>(null);
  const [
    branchWiseRegionalBusinessPerformance,
    setBranchWiseRegionalBusinessPerformance,
  ] = useState<any>(null);
  const [branchPerformanceProcess, setBranchPerformanceProcess] =
    useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  // const { data: exchangeWiseMarketStatistics,refetch: refetchExchangeWiseMarketStatistics } = useQuery({
  //   queryKey: ["exchangeWiseMarketStatistics"],
  //   queryFn: () =>
  //     regionalBusinessPerformanceAPI.getExchangeWiseMarketStatistics(),
  // });

  // const { data: branchWiseMarketStatistics,refetch: refetchBranchWiseMarketStatistics } = useQuery({
  //   queryKey: ["branchWiseMarketStatistics", branch, region],
  //   queryFn: () =>
  //     regionalBusinessPerformanceAPI.getBranchWiseMarketStatistics(
  //       branch,
  //       region,
  //     ),
  // });

  // const { data: branchWiseRegionalBusinessPerformance,refetch: refetchBranchWiseRegionalBusinessPerformance } = useQuery({
  //   queryKey: ["branchWiseRegionalBusinessPerformance", branch, region],
  //   queryFn: () =>
  //     regionalBusinessPerformanceAPI.getBranchWiseRegionalBusinessPerformance(
  //       branch,
  //       region,
  //     ),
  // });

  // const { data: branchPerformanceProcess,refetch: refetchBranchPerformanceProcess } = useQuery({
  //   queryKey: ["branchPerformanceProcess"],
  //   queryFn: () => regionalBusinessPerformanceAPI.getBranchPerformanceProcess(),
  // });

  const { mutate: processBranchPerformance, isPending } = useMutation({
    mutationFn: () =>
      regionalBusinessPerformanceAPI.processBranchPerformanceWithDates(
        startDate,
        endDate,
      ),

    onSuccess: async () => {
      const fetchMarketStatistics = async () => {
        try {
          setLoading(true);

          const [
            exchangeWiseData,
            branchWiseMarketData,
            regionalPerformanceData,
            performanceProcessData,
          ] = await Promise.all([
            regionalBusinessPerformanceAPI.getExchangeWiseMarketStatistics(),
            regionalBusinessPerformanceAPI.getBranchWiseMarketStatistics(
              branch,
              region,
            ),
            regionalBusinessPerformanceAPI.getBranchWiseRegionalBusinessPerformance(
              branch,
              region,
            ),
            regionalBusinessPerformanceAPI.getBranchPerformanceProcess(),
          ]);

          setExchangeWiseMarketStatistics(exchangeWiseData);
          setBranchWiseMarketStatistics(branchWiseMarketData);
          setBranchWiseRegionalBusinessPerformance(regionalPerformanceData);
          setBranchPerformanceProcess(performanceProcessData);
        } catch (error) {
          console.error("Error fetching market statistics:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMarketStatistics();
         toast({
          description: "Processing Completed Successfully.",
           className: "bg-green-400 text-green-900 text-lg p-4",
        });
    },

    onError: (error) => {
      console.error("Process branch performance failed", error);
    },
  });

  useEffect(() => {
    const fetchMarketStatistics = async () => {
      try {
        setLoading(true);

        const [
          exchangeWiseData,
          branchWiseMarketData,
          regionalPerformanceData,
          performanceProcessData,
        ] = await Promise.all([
          regionalBusinessPerformanceAPI.getExchangeWiseMarketStatistics(),
          regionalBusinessPerformanceAPI.getBranchWiseMarketStatistics(
            branch,
            region,
          ),
          regionalBusinessPerformanceAPI.getBranchWiseRegionalBusinessPerformance(
            branch,
            region,
          ),
          regionalBusinessPerformanceAPI.getBranchPerformanceProcess(),
        ]);

        setExchangeWiseMarketStatistics(exchangeWiseData);
        setBranchWiseMarketStatistics(branchWiseMarketData);
        setBranchWiseRegionalBusinessPerformance(regionalPerformanceData);
        setBranchPerformanceProcess(performanceProcessData);
      } catch (error) {
        console.error("Error fetching market statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketStatistics();
  }, [branch, region]);

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
