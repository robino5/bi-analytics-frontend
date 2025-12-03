"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { regionalBusinessPerformanceAPI } from "./api/regional-business-performance";
import { useQuery } from "@tanstack/react-query";
import FilterSection from "./_component/FilterSection";

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


    </div>
  );
}
