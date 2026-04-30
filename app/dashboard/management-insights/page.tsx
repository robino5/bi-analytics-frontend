"use client";

import { useEffect, useMemo, useState } from "react";
import { ManagementInsightsAPI } from "./api/management-insights";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const [branchClientInfo, setBranchClientInfo] = useState<any>(null);
  const [branchEmployeeInfo, setBranchEmployeeInfo] = useState<any>(null);
  const [branchEcrmInfo, setBranchEcrmInfo] = useState<any>(null);
  const [branchEkycInfo, setBranchEkycInfo] = useState<any>(null);
  const [branchChannelWiseTradeInfo, setBranchChannelWiseTradeInfo] =
    useState<any>(null);
  const [
    branchDepositWithdrawDetailsInfo,
    setBranchDepositWithdrawDetailsInfo,
  ] = useState<any>(null);
  const [
    branchPartyTurnoverCommissionInfo,
    setBranchPartyTurnoverCommissionInfo,
  ] = useState<any>(null);
  const [branchExposureInfo, setBranchExposureInfo] = useState<any>(null);
  const [branchOfficeSpaceInfo, setBranchOfficeSpaceInfo] = useState<any>(null);
  const [branchPerformanceProcess, setBranchPerformanceProcess] =
    useState<any>(null);

  const [loading, setLoading] = useState(false);

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

  // const {
  //   data: branchClientInfo,
  //   isPending: branchClientInfoPending,
  //   refetch: refetchBranchClientInfo,
  // } = useQuery({
  //   queryKey: ["branchClientInfo", branch, region],
  //   queryFn: () =>
  //     ManagementInsightsAPI.getRegionalClientPerformanceNonPerformance(
  //       branch,
  //       region,
  //     ),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });
  // const {
  //   data: branchEmployeeInfo,
  //   isPending: branchEmployeeInfoPending,
  //   refetch: refetchBranchEmployeeInfo,
  // } = useQuery({
  //   queryKey: ["branchEmployeeInfo", branch, region],
  //   queryFn: () =>
  //     ManagementInsightsAPI.getRegionalEmployeeStructure(branch, region),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  // const {
  //   data: branchEcrmInfo,
  //   isPending: branchEcrmInfoPending,
  //   refetch: refetchBranchEcrmInfo,
  // } = useQuery({
  //   queryKey: ["branchEcrmInfo", branch, region],
  //   queryFn: () => ManagementInsightsAPI.getRegionalEcrmDetails(branch, region),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  // const {
  //   data: branchEkycInfo,
  //   isPending: branchEkycInfoPending,
  //   refetch: refetchBranchEkycInfo,
  // } = useQuery({
  //   queryKey: ["branchEkycInfo", branch, region],
  //   queryFn: () => ManagementInsightsAPI.getRegionalEkycDetails(branch, region),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  // const {
  //   data: branchChannelWiseTradeInfo,
  //   isPending: branchChannelWiseTradeInfoPending,
  //   refetch: refetchBranchChannelWiseTradeInfo,
  // } = useQuery({
  //   queryKey: ["branchChannelWiseTradeInfo", branch, region],
  //   queryFn: () =>
  //     ManagementInsightsAPI.getRegionalChannelWiseTrade(branch, region),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  // const {
  //   data: branchDepositWithdrawDetailsInfo,
  //   isPending: branchDepositWithdrawDetailsInfoPending,
  //   refetch: refetchBranchDepositWithdrawDetailsInfo,
  // } = useQuery({
  //   queryKey: ["branchDepositWithdrawDetailsInfo", branch, region],
  //   queryFn: () =>
  //     ManagementInsightsAPI.getRegionalDepositWithdrawDetails(branch, region),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  // const {
  //   data: branchPartyTurnoverCommissionInfo,
  //   isPending: branchPartyTurnoverCommissionInfoPending,
  //   refetch: refetchBranchPartyTurnoverCommissionInfo,
  // } = useQuery({
  //   queryKey: ["branchPartyTurnoverCommissionInfo", branch, region],
  //   queryFn: () =>
  //     ManagementInsightsAPI.getRegionalPartyTurnoverCommission(branch, region),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  // const {
  //   data: branchExposureInfo,
  //   isPending: branchExposureInfoPending,
  //   refetch: refetchBranchExposureInfo,
  // } = useQuery({
  //   queryKey: ["branchExposureInfo", branch, region],
  //   queryFn: () =>
  //     ManagementInsightsAPI.getRegionalExposureDetails(branch, region),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  // const {
  //   data: branchOfficeSpaceInfo,
  //   isPending: branchOfficeSpaceInfoPending,
  //   refetch: refetchBranchOfficeSpaceInfo,
  // } = useQuery({
  //   queryKey: ["branchOfficeSpaceInfo", branch, region],
  //   queryFn: () => ManagementInsightsAPI.getRegionalOfficeSpace(branch, region),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  // const {
  //   data: branchPerformanceProcess,
  //   refetch: refetchBranchPerformanceProcess,
  // } = useQuery({
  //   queryKey: ["branchPerformanceProcess"],
  //   queryFn: () => ManagementInsightsAPI.getBranchPerformanceProcess(),
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  const { mutate: processRegionWiseManagement, isPending } = useMutation({
    mutationFn: () =>
      ManagementInsightsAPI.processRegionWiseManagement(startDate, endDate),

    onSuccess: async () => {
      // await refetchBranchClientInfo();
      // await refetchBranchEmployeeInfo();
      // await refetchBranchEcrmInfo();
      // await refetchBranchEkycInfo();
      // await refetchBranchChannelWiseTradeInfo();
      // await refetchBranchDepositWithdrawDetailsInfo();
      // await refetchBranchExposureInfo();
      // await refetchBranchPartyTurnoverCommissionInfo();
      // await refetchBranchOfficeSpaceInfo();
      // await refetchBranchPerformanceProcess();
      const fetchAllData = async () => {
        try {
          setLoading(true);

          const [
            clientInfo,
            employeeInfo,
            ecrmInfo,
            ekycInfo,
            tradeInfo,
            depositWithdrawInfo,
            partyTurnoverInfo,
            exposureInfo,
            officeSpaceInfo,
            performanceProcess,
          ] = await Promise.all([
            ManagementInsightsAPI.getRegionalClientPerformanceNonPerformance(),
            ManagementInsightsAPI.getRegionalEmployeeStructure(),
            ManagementInsightsAPI.getRegionalEcrmDetails(),
            ManagementInsightsAPI.getRegionalEkycDetails(),
            ManagementInsightsAPI.getRegionalChannelWiseTrade(branch, region),
            ManagementInsightsAPI.getRegionalDepositWithdrawDetails(),
            ManagementInsightsAPI.getRegionalPartyTurnoverCommission(),
            ManagementInsightsAPI.getRegionalExposureDetails(),
            ManagementInsightsAPI.getRegionalOfficeSpace(branch, region),
            ManagementInsightsAPI.getBranchPerformanceProcess(),
          ]);

          setBranchClientInfo(clientInfo);
          setBranchEmployeeInfo(employeeInfo);
          setBranchEcrmInfo(ecrmInfo);
          setBranchEkycInfo(ekycInfo);
          setBranchChannelWiseTradeInfo(tradeInfo);
          setBranchDepositWithdrawDetailsInfo(depositWithdrawInfo);
          setBranchPartyTurnoverCommissionInfo(partyTurnoverInfo);
          setBranchExposureInfo(exposureInfo);
          setBranchOfficeSpaceInfo(officeSpaceInfo);
          setBranchPerformanceProcess(performanceProcess);
        } catch (error) {
          console.error("Error fetching dashboard data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAllData();

      toast({
        description: "Processing Completed Successfully.",
        className: "bg-green-400 text-green-900",
      });
    },

    onError: (error) => {
      console.error("Process branch performance failed", error);
    },
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [
          clientInfo,
          employeeInfo,
          ecrmInfo,
          ekycInfo,
          tradeInfo,
          depositWithdrawInfo,
          partyTurnoverInfo,
          exposureInfo,
          officeSpaceInfo,
          performanceProcess,
        ] = await Promise.all([
          ManagementInsightsAPI.getRegionalClientPerformanceNonPerformance(),
          ManagementInsightsAPI.getRegionalEmployeeStructure(),
          ManagementInsightsAPI.getRegionalEcrmDetails(),
          ManagementInsightsAPI.getRegionalEkycDetails(),
          ManagementInsightsAPI.getRegionalChannelWiseTrade(branch, region),
          ManagementInsightsAPI.getRegionalDepositWithdrawDetails(),
          ManagementInsightsAPI.getRegionalPartyTurnoverCommission(),
          ManagementInsightsAPI.getRegionalExposureDetails(),
          ManagementInsightsAPI.getRegionalOfficeSpace(branch, region),
          ManagementInsightsAPI.getBranchPerformanceProcess(),
        ]);

        setBranchClientInfo(clientInfo);
        setBranchEmployeeInfo(employeeInfo);
        setBranchEcrmInfo(ecrmInfo);
        setBranchEkycInfo(ekycInfo);
        setBranchChannelWiseTradeInfo(tradeInfo);
        setBranchDepositWithdrawDetailsInfo(depositWithdrawInfo);
        setBranchPartyTurnoverCommissionInfo(partyTurnoverInfo);
        setBranchExposureInfo(exposureInfo);
        setBranchOfficeSpaceInfo(officeSpaceInfo);
        setBranchPerformanceProcess(performanceProcess);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [branch, region]);

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
            children={<EcrmInfo eCRM={branchEcrmInfo.data} region={region} branch={branch} />}
          />
        )}
        <div className="rounded-md col-span-3 xl:col-span-3">
          {branchEmployeeInfo && (
            <CardBoard
              className="col-span-6 xl:col-span-3 overflow-hidden"
              title={`Employee Structure-${branchEmployeeInfo.data?.permanentTrader + branchEmployeeInfo.data?.contractualWithSalary + branchEmployeeInfo.data?.contractualWithoutSalary} As on Date`}
              children={<EmployeeInfo employeeData={branchEmployeeInfo.data} region={region} branch={branch} />}
            />
          )}
        </div>
        <div className="rounded-md col-span-3 xl:col-span-3">
          {branchClientInfo && (
            <CardBoard
              className="col-span-6 xl:col-span-3"
              title={"Client Overview As on Date"}
              children={<ClientInfo clientData={branchClientInfo.data} region={region} branch={branch} />}
            />
          )}
        </div>
        {branchPartyTurnoverCommissionInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Busi. Aggregator Details Information"}
            children={
              <ThirdPartyInfo thirdPartyInfo={branchPartyTurnoverCommissionInfo.data} region={region} branch={branch} />
            }
          />
        )}
        {/* Col 5 */}
        {branchEkycInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"eKYC"}
            children={<EkycInfo eKYC={branchEkycInfo.data} region={region} branch={branch} />}
          />
        )}

        {branchDepositWithdrawDetailsInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Deposit & Withdraw Details"}
            children={
              <DepositWithdrawInfo
                depositWithdraw={branchDepositWithdrawDetailsInfo.data} region={region} branch={branch}
              />
            }
          />
        )}
        {branchExposureInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title={"Exposure Information as on Date"}
            children={<ExposureInfo exposureInfo={branchExposureInfo.data} region={region} branch={branch} />}
          />
        )}
      </div>
    </div>
  );
}
