"use client";
import BranchFilter from "@/components/branchFilter";
import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import { useBranchStore } from "@/lib/stores/branchStore";
import EkycInfo from "./_component/eKYCInfo";
import { useQuery } from "@tanstack/react-query";
import { OperationalManagementInsightsAPI } from "./api/operational-management-insights";
import ClientInfo from "./_component/ClientInfo";

const OperationalManagementInsights = () => {
  const branch = useBranchStore((state) => state.branch);
  const setBranch = useBranchStore((state) => state.setBranch);

  const { data: branchEkycInfo } = useQuery({
    queryKey: ["branchEkycInfo", branch],
    queryFn: () => OperationalManagementInsightsAPI.getRegionalEkycDetails(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

    const { data: branchClientInfo, isLoading: branchClientInfoLoading } =
      useQuery({
        queryKey: ["branchClientInfo"],
        queryFn: () =>
          OperationalManagementInsightsAPI.getRegionalClientPerformanceNonPerformance(),
        staleTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      });

  const handleBranchChange = (branchId: string) => {
    setBranch(branchId);
  };
  return (
    <div className="mx-4">
      <title>Operational Management Insights - LBSL</title>
      <meta
        name="description"
        content="operational management insights analytics"
      />
      <PageHeader name={`Operational Management Insights`}>
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 mt-3 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
        {branchEkycInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="eKYC"
            children={<EkycInfo eKYC={branchEkycInfo.data} branch={branch} />}
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
      </div>
    </div>
  );
};

export default OperationalManagementInsights;
