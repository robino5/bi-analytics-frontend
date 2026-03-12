"use client";

import { useMemo, useState } from "react";
import { ManagementInsightsAPI } from "./api/management-insights";
import { useMutation, useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import FilterSection from "./_component/FilterSection";
import { Card, CardContent } from "@/components/ui/card";
import EmployeeInfo from "./_component/EmployeeInfo";
import ClientInfo from "./_component/ClientInfo";
import EcrmInfo from "./_component/eCRMInfo";
import EkycInfo from "./_component/eKYCInfo";
import CardBoard from "@/components/CardBoard";
import LoadingButton from "@/components/loading";
import ClientTradesDataTable from "./_component/clientTradesDataTable";
import ThirdPartyInfo from "./_component/thirdPartyInfo";
import DepositWithdrawInfo from "./_component/depositWithdraw";
import ExposureInfo from "./_component/exposureInfo";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format, parseISO } from "date-fns";

export default function RegionalBusinessPerformancePage() {
  const [region, setRegion] = useState("");
  const [branch, setBranch] = useState("");
    const [branchName, setBranchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: regionsBranch,
    isLoading: regionsBranchLoading,
    isError: regionsBranchError,
  } = useQuery({
    queryKey: ["regionsBranch"],
    queryFn: () => ManagementInsightsAPI.getRegionsBranch(),
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

  const { data: branchClientInfo, isPending: branchClientInfoPending,refetch: refetchBranchClientInfo } =
    useQuery({
      queryKey: ["branchClientInfo", branch, region],
      queryFn: () =>
        ManagementInsightsAPI.getRegionalClientPerformanceNonPerformance(
          branch,
          region,
        ),
    });
  const { data: branchEmployeeInfo, isPending: branchEmployeeInfoPending,refetch: refetchBranchEmployeeInfo } =
    useQuery({
      queryKey: ["branchEmployeeInfo", branch, region],
      queryFn: () =>
        ManagementInsightsAPI.getRegionalEmployeeStructure(branch, region),
    });

  const { data: branchEcrmInfo, isPending: branchEcrmInfoPending,refetch: refetchBranchEcrmInfo } = useQuery({
    queryKey: ["branchEcrmInfo", branch, region],
    queryFn: () => ManagementInsightsAPI.getRegionalEcrmDetails(branch, region),
  });

  const { data: branchEkycInfo, isPending: branchEkycInfoPending,refetch: refetchBranchEkycInfo } = useQuery({
    queryKey: ["branchEkycInfo", branch, region],
    queryFn: () => ManagementInsightsAPI.getRegionalEkycDetails(branch, region),
  });

  const {
    data: branchChannelWiseTradeInfo,
    isPending: branchChannelWiseTradeInfoPending,
    refetch: refetchBranchChannelWiseTradeInfo
  } = useQuery({
    queryKey: ["branchChannelWiseTradeInfo", branch, region],
    queryFn: () =>
      ManagementInsightsAPI.getRegionalChannelWiseTrade(branch, region),
  });

  const {
    data: branchDepositWithdrawDetailsInfo,
    isPending: branchDepositWithdrawDetailsInfoPending,
    refetch: refetchBranchDepositWithdrawDetailsInfo
  } = useQuery({
    queryKey: ["branchDepositWithdrawDetailsInfo", branch, region],
    queryFn: () =>
      ManagementInsightsAPI.getRegionalDepositWithdrawDetails(branch, region),
  });

  const {
    data: branchPartyTurnoverCommissionInfo,
    isPending: branchPartyTurnoverCommissionInfoPending,
    refetch: refetchBranchPartyTurnoverCommissionInfo
  } = useQuery({
    queryKey: ["branchPartyTurnoverCommissionInfo", branch, region],
    queryFn: () =>
      ManagementInsightsAPI.getRegionalPartyTurnoverCommission(branch, region),
  });

  const { data: branchExposureInfo, isPending: branchExposureInfoPending,refetch: refetchBranchExposureInfo } =
    useQuery({
      queryKey: ["branchExposureInfo", branch, region],
      queryFn: () =>
        ManagementInsightsAPI.getRegionalExposureDetails(branch, region),
    });

  const {
    data: branchOfficeSpaceInfo,
    isPending: branchOfficeSpaceInfoPending,
    refetch: refetchBranchOfficeSpaceInfo
  } = useQuery({
    queryKey: ["branchOfficeSpaceInfo", branch, region],
    queryFn: () => ManagementInsightsAPI.getRegionalOfficeSpace(branch, region),
  });

  const { data: branchPerformanceProcess,refetch: refetchBranchPerformanceProcess } = useQuery({
    queryKey: ["branchPerformanceProcess"],
    queryFn: () => ManagementInsightsAPI.getBranchPerformanceProcess(),
  });

  
    const { mutate: processRegionWiseManagement, isPending, } = useMutation({
    mutationFn: () =>
      ManagementInsightsAPI.processRegionWiseManagement(
        startDate,
        endDate
      ),

    onSuccess: async () => {
     await refetchBranchClientInfo();
     await refetchBranchEmployeeInfo();
      await refetchBranchEcrmInfo();
      await refetchBranchEkycInfo();
      await refetchBranchChannelWiseTradeInfo();
      await refetchBranchDepositWithdrawDetailsInfo();
      await refetchBranchExposureInfo();
      await refetchBranchPartyTurnoverCommissionInfo();
      await refetchBranchOfficeSpaceInfo();
      await refetchBranchPerformanceProcess();
    },

    onError: (error) => {
      console.error("Process branch performance failed", error);
    },
  });

  const data = Array.isArray(branchOfficeSpaceInfo?.data)
    ? branchOfficeSpaceInfo.data
    : [];

  const totalBranchSpace = data.reduce(
    (sum: number, item: any) => sum + Number(item?.officeSpace ?? 0),
    0,
  );
  const [officeSpaceOpen, setOfficeSpaceOpen] = useState(false);

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
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            processRegionWiseManagement={processRegionWiseManagement}
            isPending={isPending}
            startDate={startDate}
            endDate={endDate}
          />
        </CardContent>
      </Card>

      <div className="bg-yellow-400 rounded-sm mb-2 mt-3 flex items-stretch border border-black">
        {/* Left side */}
        <div className="w-1/2 text-center border-r border-black flex items-center justify-center py-3">
          <span className="text-lg font-semibold">Size of office space</span>
        </div>

        {/* Right side */}
        <div className="w-1/2 text-center flex items-center justify-center py-3">
          <Dialog open={officeSpaceOpen} onOpenChange={setOfficeSpaceOpen}>
            <DialogTrigger asChild>
              <button className="text-lg font-bold underline">
                {(totalBranchSpace || 0).toLocaleString()}
                <span className="font-bold"> SFT</span>
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
                      <th className="px-3 py-2 text-left border">Region</th>
                      <th className="px-3 py-2 text-left border">Branch</th>
                      <th className="px-3 py-2 text-right border">
                        Office Space (SFT)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(branchOfficeSpaceInfo?.data) &&
                    branchOfficeSpaceInfo.data.length ? (
                      branchOfficeSpaceInfo.data.map((b: any, idx: number) => (
                        <tr
                          key={idx}
                          className={
                            idx % 2 === 0 ? "bg-yellow-100" : "bg-yellow-50"
                          }
                        >
                          <td className="px-3 py-2 border">{b.regionName}</td>
                          <td className="px-3 py-2 border">{b.branchName}</td>
                          <td className="px-3 py-2 text-right border">
                            {Number(b.officeSpace || 0).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-3 py-4 text-center">
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

      <div className="grid grid-cols-2 gap-3 mt-3 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
        {/* Col 4 */}
        {branchChannelWiseTradeInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3 overflow-hidden"
            title={"Channel Wise Clients & Trades"}
            children={
              <ClientTradesDataTable
                records={branchChannelWiseTradeInfo.data}
              />
            }
          />
        )}

        {branchEcrmInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3 overflow-hidden"
            title={"eCRM"}
            children={<EcrmInfo eCRM={branchEcrmInfo.data} />}
          />
        )}
        <div className="rounded-md col-span-3 xl:col-span-3">
          {branchEmployeeInfo && (
            <CardBoard
              className="col-span-6 xl:col-span-3 overflow-hidden"
              title={`Employee Structure-${branchEmployeeInfo.data?.permanentTrader + branchEmployeeInfo.data?.contractualWithSalary + branchEmployeeInfo.data?.contractualWithoutSalary} As on Date`}
              children={<EmployeeInfo employeeData={branchEmployeeInfo.data} />}
            />
          )}
        </div>
        <div className="rounded-md col-span-3 xl:col-span-3">
          {branchClientInfo && (
            <CardBoard
              className="col-span-6 xl:col-span-3"
              title={"Client Overview As on Date"}
              children={<ClientInfo clientData={branchClientInfo.data} />}
            />
          )}
        </div>
        {branchPartyTurnoverCommissionInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Busi. Aggregator Details Information"}
            children={
              <ThirdPartyInfo
                thirdPartyInfo={branchPartyTurnoverCommissionInfo.data}
              />
            }
          />
        )}
        {/* Col 5 */}
        {branchEkycInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"eKYC"}
            children={<EkycInfo eKYC={branchEkycInfo.data} />}
          />
        )}

        {branchDepositWithdrawDetailsInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Deposit & Withdraw Details"}
            children={
              <DepositWithdrawInfo
                depositWithdraw={branchDepositWithdrawDetailsInfo.data}
              />
            }
          />
        )}
        {branchExposureInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Exposure Information as on Date"}
            children={<ExposureInfo exposureInfo={branchExposureInfo.data} />}
          />
        )}
      </div>
    </div>
  );
}
