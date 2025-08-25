"use client";

import PageHeader from "@/components/PageHeader";
import BranchWiseMarginDataTable from "./_branchwise_margin_datatable";
import BranchWiseExposureDataTable from "./_branchwise_exposure_datatable";
import { DataTableCard } from "./data-table";
import { DataTableCardTurnover } from "./data-table-turnover"
import { branchWiseFundColumns, branchWiseTurnoverColumns } from "./columns";
import BranchFilter from "@/components/branchFilter";
import { useSession } from "next-auth/react";
import { getHeaderDate } from "@/lib/utils";
import { useBranchStore } from "@/lib/stores/branchStore";
import { useQuery } from "@tanstack/react-query";
import { branchPerformanceAPI } from "./api";
import LoadingButton from "@/components/loading";

export default function BranchPerformance() {
  const { data: session } = useSession();

  const branch = useBranchStore((state) => state.branch);
  const setBranch = useBranchStore((state) => state.setBranch);

  const { data: turnover, isPending: turnoverPending } = useQuery({
    queryKey: ["turnover", branch],
    queryFn: () => branchPerformanceAPI.getTurnoverStatus(branch)
  });

  const { data: branchWiseFund, isPending: branchWiseFundPending } = useQuery({
    queryKey: ["branchWiseFund", branch],
    queryFn: () => branchPerformanceAPI.getBranchWiseFundStatus(branch)
  });

  const { data: branchWiseMargin, isPending: branchWiseMarginPending } = useQuery({
    queryKey: ["branchWiseMargin", branch],
    queryFn: () => branchPerformanceAPI.getBranchWiseMarginStatus(branch)
  });

  const { data: branchWiseExposure, isPending: branchWiseExposurePending } = useQuery({
    queryKey: ["branchWiseExposure", branch],
    queryFn: () => branchPerformanceAPI.getBranchWiseExposureStatus(branch)
  });

  const { data: turnoverPerformance, isPending: turnoverPerformancePending } = useQuery({
    queryKey: ["turnoverPerformance", branch],
    queryFn: () => branchPerformanceAPI.getDailyTurnoverPerformance(branch)
  });

  const isLoading = turnoverPending || branchWiseFundPending || branchWiseMarginPending || branchWiseExposurePending || turnoverPerformancePending;

  if (isLoading) {
    return <LoadingButton text="Loading..." />
  }

  const handleBranchChange = (branchId: string) => {
    setBranch(branchId);
  };

  let headerDate = null;

  if (turnoverPerformance?.data) {
    headerDate = getHeaderDate(
      turnoverPerformance?.data[turnoverPerformance?.data.length - 1],
      "tradingDate"
    );
  }

  return (
    <div className="mx-4">
      <title>Branch Performance - LBSL</title>
      <meta name="description" content="branch performance analytics" />
      <PageHeader name={`Branch Performance (${headerDate ?? ""})`}>
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
      </PageHeader>
      <div className="grid grid-cols-1 gap-3 mt-2 lg:grid-cols-4">
        {/* Branch Wise Turnover Status */}
        <DataTableCardTurnover
          title="Branch Wise Turnover Status"
          subtitle="show data for branch wise turnover"
          className="col-span-1  lg:col-span-2"
          columns={branchWiseTurnoverColumns}
          data={turnover?.data || []}
        />

        {/* Branch Wise Margin Status */}

        {branchWiseMargin?.data &&
          <BranchWiseMarginDataTable records={branchWiseMargin?.data || []} />
        }


        {/* Branch Wise Exposure Status */}
        {branchWiseExposure?.data &&
          <BranchWiseExposureDataTable records={branchWiseExposure?.data || []} />
        }
        {/* Branch Wise Fund Status */}
        <DataTableCard
          className="col-span-2 mb-2"
          title="Branch Wise Fund Status(Till Today)"
          subtitle="summary of fund status branch wise"
          columns={branchWiseFundColumns}
          data={branchWiseFund?.data || []}
        />
      </div>
    </div>
  );
}
