"use client";

import { useEffect, useMemo, useState } from "react";
import { ManagementInsightsAPI } from "./api/management-insights";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import FilterSection from "./_component/FilterSection";

import EmployeeInfo from "./_component/EmployeeInfo";
import ClientInfo from "./_component/ClientInfo";
import EcrmInfo from "./_component/eCRMInfo";
import EkycInfo from "./_component/eKYCInfo";
import CardBoard from "@/components/CardBoard";
import ClientTradesDataTable from "./_component/clientTradesDataTable";
import ThirdPartyInfo from "./_component/thirdPartyInfo";
import DepositWithdrawInfo from "./_component/depositWithdraw";
import ExposureInfo from "./_component/exposureInfo";
import MarketStatistics from "./_component/MarketStatistics";
import BusinessPerformance from "./_component/BusinessPerformance";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format, parseISO } from "date-fns";
import { toast } from "@/components/ui/use-toast";

export default function RegionalBusinessPerformancePage() {
  const [region, setRegion] = useState("");
  const [branch, setBranch] = useState("");
  const [branchName, setBranchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [enableSecondaryQueries, setEnableSecondaryQueries] = useState(false);
  const queryClient = useQueryClient();

  // Stagger query loading to avoid overwhelming backend
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnableSecondaryQueries(true);
    }, 500); // 500ms delay before secondary queries start

    return () => clearTimeout(timer);
  }, []);

  const {
    data: regionsBranch,
    isLoading: regionsBranchLoading,
    isError: regionsBranchError,
  } = useQuery({
    queryKey: ["regionsBranch"],
    queryFn: () => ManagementInsightsAPI.getRegionsBranch(),
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

  const { data: branchClientInfo, isLoading: branchClientInfoLoading } =
    useQuery({
      queryKey: ["branchClientInfo"],
      queryFn: () =>
        ManagementInsightsAPI.getRegionalClientPerformanceNonPerformance(),
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: enableSecondaryQueries,
    });

  const { data: branchEmployeeInfo, isLoading: branchEmployeeInfoLoading } =
    useQuery({
      queryKey: ["branchEmployeeInfo"],
      queryFn: () => ManagementInsightsAPI.getRegionalEmployeeStructure(),
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: enableSecondaryQueries,
    });

  const { data: branchEcrmInfo, isLoading: branchEcrmInfoLoading } = useQuery({
    queryKey: ["branchEcrmInfo"],
    queryFn: () => ManagementInsightsAPI.getRegionalEcrmDetails(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: enableSecondaryQueries,
  });

  const { data: branchEkycInfo, isLoading: branchEkycInfoLoading } = useQuery({
    queryKey: ["branchEkycInfo"],
    queryFn: () => ManagementInsightsAPI.getRegionalEkycDetails(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: enableSecondaryQueries,
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
    enabled: enableSecondaryQueries,
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
    enabled: enableSecondaryQueries,
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
    enabled: enableSecondaryQueries,
  });

  const { data: branchExposureInfo, isLoading: branchExposureInfoLoading } =
    useQuery({
      queryKey: ["branchExposureInfo"],
      queryFn: () => ManagementInsightsAPI.getRegionalExposureDetails(),
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: enableSecondaryQueries,
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
    enabled: enableSecondaryQueries,
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
    enabled: enableSecondaryQueries,
  });

  const {
    data: exchangeWiseMarketStatistics,
    isLoading: exchangeWiseMarketStatisticsLoading,
  } = useQuery({
    queryKey: ["exchangeWiseMarketStatistics"],
    queryFn: () => ManagementInsightsAPI.getExchangeWiseMarketStatistics(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: enableSecondaryQueries,
  });

  const {
    data: branchWiseMarketStatistics,
    isLoading: branchWiseMarketStatisticsLoading,
  } = useQuery({
    queryKey: ["branchWiseMarketStatistics"],
    queryFn: () => ManagementInsightsAPI.getBranchWiseMarketStatistics(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: enableSecondaryQueries,
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
    enabled: enableSecondaryQueries,
  });

  const loading =
    regionsBranchLoading ||
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
    exchangeWiseMarketStatisticsLoading ||
    branchWiseMarketStatisticsLoading ||
    branchWiseRegionalBusinessPerformanceLoading;

  console.log("test", branchEmployeeInfo)

  const { mutate: processRegionWiseManagement, isPending } = useMutation({
    mutationFn: () =>
      ManagementInsightsAPI.processRegionWiseManagement(startDate, endDate),

    onSuccess: async () => {
      // Only invalidate specific queries instead of all at once to avoid cascade
      const queriesToInvalidate = [
        "branchPerformanceProcess",
        "exchangeWiseMarketStatistics",
        "branchWiseMarketStatistics",
        "branchWiseRegionalBusinessPerformance",
      ];

      for (const queryKey of queriesToInvalidate) {
        await queryClient.invalidateQueries({
          queryKey: [queryKey],
          exact: true,
        });
      }

      toast({
        description: "Processing Completed Successfully.",
        className: "bg-green-400 text-green-900",
      });
    },

    onError: (error) => {
      console.error("Process branch performance failed", error);
    },
  });

  const filteredOfficeSpaceList = useMemo(() => {
    const rawList = Array.isArray(branchOfficeSpaceInfo?.data)
      ? branchOfficeSpaceInfo.data
      : [];

    return rawList.filter((item: any) => {
      if (region && region !== "all" && item.regionName !== region) {
        return false;
      }
      if (
        branch &&
        branch !== "all" &&
        String(item.branchCode) !== String(branch)
      ) {
        return false;
      }
      return true;
    });
  }, [branchOfficeSpaceInfo, region, branch]);

  const totalBranchSpace = filteredOfficeSpaceList.reduce(
    (sum: number, item: any) => sum + Number(item?.officeSpace ?? 0),
    0,
  );
  const [officeSpaceOpen, setOfficeSpaceOpen] = useState(false);

  return (
    <div className="p-6">
      <PageHeader
        name="Regional Business Performance"
        period={`From: ${branchPerformanceProcess?.data?.dateFrom
          ? format(
            parseISO(branchPerformanceProcess.data.dateFrom),
            "dd-MMM-yyyy",
          )
          : ""
          } to ${branchPerformanceProcess?.data?.dateTo
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
        processRegionWiseManagement={processRegionWiseManagement}
        isPending={isPending}
        startDate={startDate}
        endDate={endDate}
      />

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
                    {Array.isArray(filteredOfficeSpaceList) &&
                      filteredOfficeSpaceList.length ? (
                      filteredOfficeSpaceList.map((b: any, idx: number) => (
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
          <ClientTradesDataTable
            records={branchChannelWiseTradeInfo.data}
            region={region}
            branch={branch}
          />
        )}

        {branchEcrmInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3 overflow-hidden"
            title={"eCRM"}
            children={
              <EcrmInfo
                eCRM={branchEcrmInfo.data}
                region={region}
                branch={branch}
              />
            }
          />
        )}
        <div className="rounded-md col-span-3 xl:col-span-3">
          {branchEmployeeInfo && (
            <EmployeeInfo
              employeeData={branchEmployeeInfo.data}
              region={region}
              branch={branch}
            />
          )}
        </div>
        <div className="rounded-md col-span-3 xl:col-span-3">
          {branchClientInfo && (
            <CardBoard
              className="col-span-6 xl:col-span-3"
              title={"Client Overview As on Date"}
              children={
                <ClientInfo
                  clientData={branchClientInfo.data}
                  region={region}
                  branch={branch}
                />
              }
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
                region={region}
                branch={branch}
              />
            }
          />
        )}
        {/* Col 5 */}
        {branchEkycInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"eKYC"}
            children={
              <EkycInfo
                eKYC={branchEkycInfo.data}
                region={region}
                branch={branch}
              />
            }
          />
        )}

        {branchDepositWithdrawDetailsInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Deposit & Withdraw Details"}
            children={
              <DepositWithdrawInfo
                depositWithdraw={branchDepositWithdrawDetailsInfo.data}
                region={region}
                branch={branch}
              />
            }
          />
        )}
        {branchExposureInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Exposure Information as on Date"}
            children={
              <ExposureInfo
                exposureInfo={branchExposureInfo.data}
                region={region}
                branch={branch}
              />
            }
          />
        )}
      </div>
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
