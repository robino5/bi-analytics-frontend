"use client";

import { useSession } from "next-auth/react";

import PageHeader from "@/components/PageHeader";
import { netTradeRmWiseColumns } from "./columns";
import { DataTable as NetTradeTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MarginLoanAllocationDataTable from "./_margin_loan_allocation_datatable";
import ExposureControllingDataTable from "./_exposure_controlling_datatable";
import { getHeaderDate } from "@/lib/utils";
import BranchFilter from "@/components/branchFilter";
import NegativeEquityInvestorCodeDataTable from "./_negative_equity_investor_code_datatable";
import { useBranchStore } from "@/lib/stores/branchStore";
import { marginLoanUsageAPI } from "./api";
import { useQuery } from "@tanstack/react-query";

export default function MarginLoanUsage() {
  const { data: session } = useSession();

  const branch = useBranchStore((state) => state.branch);
  const setBranch = useBranchStore((state) => state.setBranch);

  const { data: marginLoanAllocation } = useQuery({
    queryKey: ["marginLoanAllocation", branch],
    queryFn: () => marginLoanUsageAPI.getMarginLoanAllocation(branch)
  });

    const { data: exposureSummary } = useQuery({
    queryKey: ["exposureSummary", branch],
    queryFn: () => marginLoanUsageAPI.getExposureSummary(branch)
  });

     const { data: netTradeClients } = useQuery({
    queryKey: ["netTradeClients", branch],
    queryFn: () => marginLoanUsageAPI.getNetTradeClients(branch)
  });

     const { data: negativeEquityInvestor } = useQuery({
    queryKey: ["negativeEquityInvestor", branch],
    queryFn: () => marginLoanUsageAPI.getNegativeEquityInvistor(branch)
  });

      const { data: turnoverPerformance } = useQuery({
    queryKey: ["turnoverPerformance", branch],
    queryFn: () => marginLoanUsageAPI.getDailyTurnoverPerformance()
  });


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
      <title>Margin Loan Usage - LBSL</title>
      <meta name="description" content="analytics for margin loan usage" />
      <PageHeader name={`Margin Loan Usage (${headerDate ?? ""})`}>
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
      </PageHeader>
      <div className="grid grid-cols-1 gap-3 my-2 lg:grid-cols-6">
        <MarginLoanAllocationDataTable
          className="col-span-3"
          records={marginLoanAllocation?.data || []}
        />
        <ExposureControllingDataTable
          className="col-span-3"
          records={exposureSummary?.data || []}
          branch={branch}
        />
        {negativeEquityInvestor?.data && (
          <div className="col-span-3">
            <NegativeEquityInvestorCodeDataTable records={negativeEquityInvestor?.data} />
          </div>
        )}
        <Card className="w-full col-span-1 mb-2 shadow-xl lg:col-span-3 bg-[#033e4a]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg">RM Wise Net Trade</CardTitle>
            {/* <CardDescription className="text-white">
              Net Trade for Regional Managers
            </CardDescription> */}
          </CardHeader>
          <CardContent className="mt-3">
            <NetTradeTable
              data={netTradeClients?.data || []}
              columns={netTradeRmWiseColumns}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
