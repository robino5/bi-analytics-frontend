"use client";

import { useMemo, useState } from "react";
import { ManagementInsightsAPI } from "./api/management-insights";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";

import EmployeeInfo from "./_component/EmployeeInfo";
import ClientInfo from "./_component/ClientInfo";
import EcrmInfo from "./_component/eCRMInfo";
import EkycInfo from "./_component/eKYCInfo";
import CardBoard from "@/components/CardBoard";
import ClientTradesDataTable from "./_component/clientTradesDataTable";
import ThirdPartyInfo from "./_component/thirdPartyInfo";
import DepositWithdrawInfo from "./_component/depositWithdraw";
import ExposureInfo from "./_component/exposureInfo";
import { useBranchStore } from "@/lib/stores/branchStore";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format, parseISO } from "date-fns";
import BranchFilter from "@/components/branchFilter";
import BusinessPerformance from "./_component/BusinessPerformance";

export default function RegionalBusinessPerformancePage() {
  const branch = useBranchStore((state) => state.branch);
  const setBranch = useBranchStore((state) => state.setBranch);

  const [officeSpaceOpen, setOfficeSpaceOpen] = useState(false);

  const handleBranchChange = (branchId: string) => {
    setBranch(branchId);
  };

  const { data: branchClientInfo, isLoading: branchClientInfoLoading } =
    useQuery({
      queryKey: ["branchClientInfo"],
      queryFn: () =>
        ManagementInsightsAPI.getRegionalClientPerformanceNonPerformance(),
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

  const { data: branchEmployeeInfo, isLoading: branchEmployeeInfoLoading } =
    useQuery({
      queryKey: ["branchEmployeeInfo"],
      queryFn: () => ManagementInsightsAPI.getRegionalEmployeeStructure(),
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

  const { data: branchEcrmInfo, isLoading: branchEcrmInfoLoading } = useQuery({
    queryKey: ["branchEcrmInfo"],
    queryFn: () => ManagementInsightsAPI.getRegionalEcrmDetails(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: branchEkycInfo, isLoading: branchEkycInfoLoading } = useQuery({
    queryKey: ["branchEkycInfo"],
    queryFn: () => ManagementInsightsAPI.getRegionalEkycDetails(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const {
    data: branchChannelWiseTradeInfo,
    isLoading: branchChannelWiseTradeInfoLoading,
  } = useQuery({
    queryKey: ["branchChannelWiseTradeInfo"],
    queryFn: () => ManagementInsightsAPI.getRegionalChannelWiseTrade(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const {
    data: branchDepositWithdrawDetailsInfo,
    isLoading: branchDepositWithdrawDetailsInfoLoading,
  } = useQuery({
    queryKey: ["branchDepositWithdrawDetailsInfo"],
    queryFn: () => ManagementInsightsAPI.getRegionalDepositWithdrawDetails(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const {
    data: branchPartyTurnoverCommissionInfo,
    isLoading: branchPartyTurnoverCommissionInfoLoading,
  } = useQuery({
    queryKey: ["branchPartyTurnoverCommissionInfo"],
    queryFn: () => ManagementInsightsAPI.getRegionalPartyTurnoverCommission(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: branchExposureInfo, isLoading: branchExposureInfoLoading } =
    useQuery({
      queryKey: ["branchExposureInfo"],
      queryFn: () => ManagementInsightsAPI.getRegionalExposureDetails(),
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

  const {
    data: branchOfficeSpaceInfo,
    isLoading: branchOfficeSpaceInfoLoading,
  } = useQuery({
    queryKey: ["branchOfficeSpaceInfo"],
    queryFn: () => ManagementInsightsAPI.getRegionalOfficeSpace(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const {
    data: branchPerformanceProcess,
    isLoading: branchPerformanceProcessLoading,
  } = useQuery({
    queryKey: ["branchPerformanceProcess"],
    queryFn: () => ManagementInsightsAPI.getBranchPerformanceProcess(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

    const {
      data: branchWiseRegionalBusinessPerformance,
      isLoading: branchWiseRegionalBusinessPerformanceLoading,
    } = useQuery({
      queryKey: ["branchWiseRegionalBusinessPerformance"],
      queryFn: () =>
        ManagementInsightsAPI.getBranchWiseRegionalBusinessPerformance(),
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

    const loading =
    branchClientInfoLoading ||
    branchEmployeeInfoLoading ||
    branchEcrmInfoLoading ||
    branchEkycInfoLoading ||
    branchChannelWiseTradeInfoLoading ||
    branchDepositWithdrawDetailsInfoLoading ||
    branchPartyTurnoverCommissionInfoLoading ||
    branchExposureInfoLoading ||
    branchOfficeSpaceInfoLoading ||
    branchPerformanceProcessLoading ||
    branchWiseRegionalBusinessPerformanceLoading;


  const filteredOfficeSpaceList = useMemo(() => {
    const rawList = Array.isArray(branchOfficeSpaceInfo?.data)
      ? branchOfficeSpaceInfo.data
      : [];

    return rawList.filter((item: any) => {

      if (
        branch &&
        branch !== "all" &&
        String(item.branchCode) !== String(branch)
      ) {
        return false;
      }
      return true;
    });
  }, [branchOfficeSpaceInfo, branch]);

  const totalBranchSpace = filteredOfficeSpaceList.reduce(
    (sum: number, item: any) => sum + Number(item?.officeSpace ?? 0),
    0,
  );

  return (
    <div className="p-6">
      <PageHeader
        name="Business and Trader Performance Insights "
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
      >
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
      </PageHeader>

      {/* Office Space */}
      <div className="bg-yellow-400 rounded-sm mb-2 mt-3 flex border border-black">
        <div className="w-1/2 text-center border-r border-black flex items-center justify-center py-3">
          <span className="text-lg font-semibold">Size of office space</span>
        </div>

        <div className="w-1/2 flex items-center justify-center py-3">
          <Dialog open={officeSpaceOpen} onOpenChange={setOfficeSpaceOpen}>
            <DialogTrigger asChild>
              <button className="text-lg font-bold underline">
                {(totalBranchSpace || 0).toLocaleString()} SFT
              </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl bg-[#033e4a]">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Branch Office Space Details
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-yellow-200">
                      <th className="px-3 py-2 border">Region</th>
                      <th className="px-3 py-2 border">Branch</th>
                      <th className="px-3 py-2 border text-right">
                        Office Space (SFT)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {Array.isArray(branchOfficeSpaceInfo?.data) &&
                    branchOfficeSpaceInfo?.data?.length ? (
                      branchOfficeSpaceInfo.data.map((b: any, idx: number) => (
                        <tr
                          key={idx}
                          className={
                            idx % 2 === 0 ? "bg-yellow-100" : "bg-yellow-50"
                          }
                        >
                          <td className="px-3 py-2 border">{b.regionName}</td>
                          <td className="px-3 py-2 border">{b.branchName}</td>
                          <td className="px-3 py-2 border text-right">
                            {Number(b.officeSpace || 0).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center py-4">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 mt-3 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
        {branchChannelWiseTradeInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="Channel Wise Clients & Trades"
            children={
              <ClientTradesDataTable
                records={branchChannelWiseTradeInfo.data}
                branch={branch}
              />
            }
          />
        )}

        {branchEcrmInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="eCRM"
            children={<EcrmInfo eCRM={branchEcrmInfo.data} branch={branch} />}
          />
        )}

        {branchEmployeeInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="Employee Structure"
            children={
              <EmployeeInfo
                employeeData={branchEmployeeInfo.data}
                branch={branch}
              />
            }
          />
        )}

        {branchClientInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="Client Overview As on Date"
            children={
              <ClientInfo clientData={branchClientInfo.data} branch={branch} />
            }
          />
        )}

        {branchPartyTurnoverCommissionInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="Busi. Aggregator Details Information"
            children={
              <ThirdPartyInfo
                thirdPartyInfo={branchPartyTurnoverCommissionInfo.data}
                branch={branch}
              />
            }
          />
        )}

        {branchEkycInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="eKYC"
            children={<EkycInfo eKYC={branchEkycInfo.data} branch={branch} />}
          />
        )}

        {branchDepositWithdrawDetailsInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="Deposit & Withdraw Details"
            children={
              <DepositWithdrawInfo
                depositWithdraw={branchDepositWithdrawDetailsInfo.data}
                branch={branch}
              />
            }
          />
        )}

        {branchExposureInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="Exposure Information"
            children={
              <ExposureInfo
                exposureInfo={branchExposureInfo.data}
                branch={branch}
              />
            }
          />
        )}
      </div>
         {branchWiseRegionalBusinessPerformance && (
                <BusinessPerformance
                  businessPerformance={branchWiseRegionalBusinessPerformance?.data}
                  branch={branch}
                />
              )}
    </div>
  );
}
