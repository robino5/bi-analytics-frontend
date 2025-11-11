"use client";
import PageHeader from "@/components/PageHeader";
import { customerFundFlowAPI } from "./api/customer_fund_flow";
import { useQuery } from "@tanstack/react-query";
import FinancialStatistic from "./_component/financial_statistic";
import ModeWiseDeposite from "./_component/mode_wise_deposit";
import ModeWiseWithdraw from "./_component/mode_wise_withdraw";
import MonthlyLineChart from "./_component/deposit_monthly";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DepositPieChart from "./_component/deposit_pie_chart";
import WithdrawalPieChart from "./_component/withdrawal_pie_chart";
import { DataTableCard } from "./_component/_branch_wise_total_fund/data-table";
import { branchWisetotalFundColumns } from "./_component/_branch_wise_total_fund/columns";


export default function CustomerFundFlowDashboardPage() {

  const { data: depositToday, isLoading: depositTodayLoading, isError: depositTodayError } = useQuery({
    queryKey: ["depositToday"],
    queryFn: () => customerFundFlowAPI.getTotalDepositToday()
  });

  const { data: deposithisYear, isLoading: deposithisYearLoading, isError: deposithisYearError } = useQuery({
    queryKey: ["deposithisYear"],
    queryFn: () => customerFundFlowAPI.getTotalDepositThisYear()
  });

  const { data: withdrawalToday, isLoading: withdrawalTodayLoading, isError: withdrawalTodayError } = useQuery({
    queryKey: ["withdrawalToday"],
    queryFn: () => customerFundFlowAPI.getTotalWithdrawalToday()
  });

  const { data: withdrawalThisYear, isLoading: withdrawalThisYearLoading, isError: withdrawalThisYearError } = useQuery({
    queryKey: ["withdrawalThisYear"],
    queryFn: () => customerFundFlowAPI.getTotalWithdrawalThisYear()
  });

  const { data: TotalDepositBranchWiseMonthly, isLoading: TotalDepositBranchWiseMonthlyLoading, isError: TotalDepositBranchWiseMonthlyError } = useQuery({
    queryKey: ["TotalDepositBranchWiseMonthly"],
    queryFn: () => customerFundFlowAPI.getTotalDepositBranchWiseMonthly()
  });

  const { data: TotalWithdrawBranchWiseMonthly, isLoading: TotalWithdrawBranchWiseMonthlyLoading, isError: TotalWithdrawBranchWiseMonthlyError } = useQuery({
    queryKey: ["TotalWithdrawBranchWiseMonthly"],
    queryFn: () => customerFundFlowAPI.getTotalWithdrawBranchWiseMonthly()
  });

  const withdrawalTotalToday = withdrawalToday?.data?.rows?.map((item) => ({
  branchName: item.branchName,
  total:
    item.cashDividendDeduction +
    item.cashWithdrawal +
    item.chequeWithdrawal +
    item.ipoMode +
    item.onlineRequisition +
    item.payOrder+
    item.rtsg,
}));


  const depositTotalToday = depositToday?.data?.rows?.map((item) => ({
  branchName: item.branchName,
  total:
    item.cashDeposit +
    item.chequeDeposit +
    item.scbDeposit +
    item.payOrder +
    item.cashDividend +
    item.ipoMode
}));

  return (
    <div className="p-6">
      <PageHeader name="Customer Fund Flow Dashboard" />
      <div className="grid grid-cols-4 gap-4 mt-3">
        <FinancialStatistic
          title="Deposit Today"
          amount={depositToday?.data?.detail?.totalDeposit ?? 0}
          color="border-blue-500"
        />
        <FinancialStatistic
          title="Deposit This Year"
          amount={deposithisYear?.data?.detail?.totalDeposit ?? 0}
          color="border-green-500"
        />
        <FinancialStatistic
          title="Withdrawal Today"
          amount={withdrawalToday?.data?.detail?.totalWithdrawal ?? 0}
          color="border-red-500"
        />
        <FinancialStatistic
          title="Withdrawal This Year"
          amount={withdrawalThisYear?.data?.detail?.totalWithdrawal ?? 0}
          color="border-orange-500"
        />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-3">
        <ModeWiseDeposite
          title="Deposit Today"
          data={depositToday?.data?.detail ?? {
            cashDeposit: 0,
            chequeDeposit: 0,
            scbDeposit: 0,
            payOrder: 0,
            cashDividend: 0,
            ipoMode: 0
          }}
          color="blue-500"
        />
        <div>
          <Card className=" border-[2px] border-green-500 shadow-md  bg-[#033e4a]">
            <CardHeader className="relative z-10 bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-700 p-3 ">
              <CardTitle className="text-lg font-semibold text-white">Deposit Today</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <DepositPieChart data={depositToday?.data?.detail ?? {}} />
            </CardContent>
          </Card>
        </div>
        <ModeWiseWithdraw
          title="Withdrawal Today"
          data={withdrawalToday?.data?.detail ?? {
            cashWithdrawal: 0,
            chequeWithdrawal: 0,
            onlineRequisition: 0,
            rtsg: 0,
            payOrder: 0,
            cashDividendDeduction: 0,
            ipoMode: 0
          }}
          color="red-500"
        />
        <div>
          <Card className=" border-[2px] border-orange-500 shadow-md  bg-[#033e4a]">
            <CardHeader className="relative z-10 bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-700 p-3 ">
              <CardTitle className="text-lg font-semibold text-white">Withdraw Today</CardTitle>
            </CardHeader>
            <CardContent className="">
              <WithdrawalPieChart data={withdrawalToday?.data?.detail ?? {}} />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-3">
        {/* Left Section — Chart (8 Columns) */}
        <div className="col-span-9">
          <Card className=" w-full shadow-md border border-gray-200  bg-[#033e4a]">
            <CardHeader className="relative z-10 bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-700 p-3">
              <CardTitle className="text-lg font-semibold text-white">
                Monthly Deposit Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <MonthlyLineChart
                monthlyWise={
                  (TotalDepositBranchWiseMonthly?.data as any)?.monthlyWise ?? {}
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Section — New Content (4 Columns) */}
        <div className="col-span-3">
        <DataTableCard
            title="Branch Wise Deposit Today"
            subtitle="show data for branch wise turnover"
            className="col-span-1  lg:col-span-1"
            columns={branchWisetotalFundColumns}
            data={depositTotalToday ?? []}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-3">
        {/* Left Section — Chart (8 Columns) */}
        <div className="col-span-9">
          <Card className=" w-full shadow-md border border-gray-200  bg-[#033e4a]">
            <CardHeader className="relative z-10 bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-700 p-3">
              <CardTitle className="text-lg font-semibold text-white">
                Monthly Withdraw Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-2">
              <MonthlyLineChart
                monthlyWise={
                  (TotalWithdrawBranchWiseMonthly?.data as any)?.monthlyWise ?? {}
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Section — New Content (4 Columns) */}
        <div className="col-span-3">
          <DataTableCard
            title="Branch Wise Withdraw Today"
            subtitle="show data for branch wise turnover"
            className="col-span-1  lg:col-span-1"
            columns={branchWisetotalFundColumns}
            data={withdrawalTotalToday ?? []}
          />
        </div>
      </div>


    </div>
  );
}
