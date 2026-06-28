"use client";
import { RoleType } from "@/app/schemas";
import BranchFilter from "@/components/branchFilter";
import PageHeader from "@/components/PageHeader";
import TraderFilter from "@/components/traderFilter";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useBranchStore } from "@/lib/stores/branchStore";
import { useTraderStore } from "@/lib/stores/rmStore";
import { useQuery } from "@tanstack/react-query";
import CardBoard from "@/components/CardBoard";
import { rmBusinessPerformanceInsights } from "./api";
import ClientTradesDataTable from "./_component/clientTradesDataTable";
import EcrmInfo from "./_component/eCRMInfo";
import ClientInfo from "./_component/ClientInfo";
import RMPerformance from "./_component/RMPerformance";
import EkycInfo from "./_component/eKYCInfo";

const RmBusinessPerformanceInsightsPage = () => {
  const { data: session } = useSession();

  const isRM = session?.user.role.toString() === RoleType.REGIONAL_MANAGER;
  const defaultBranch = isRM ? session?.user?.branchId : "";
  const defaultTrader = isRM ? session?.user.username : "";

  const branch = useBranchStore((state) => state.branch);
  const setBranch = useBranchStore((state) => state.setBranch);
  const trader = useTraderStore((state) => state.trader)
  const setTrader = useTraderStore((state) => state.setTrader);

  const traceBranchChange = async (branchId: string) => {
    setBranch(branchId);
    setTrader(defaultTrader);
  };

  const handleTraderChange = async (value: string) => {
    setTrader(value);
  };

  useEffect(() => {
    if (session?.user?.role?.toString() === RoleType.REGIONAL_MANAGER) {
      setBranch(session.user.branchId);
    }
  }, [session, setBranch]);

  useEffect(() => {
    if (session?.user?.role?.toString() === RoleType.REGIONAL_MANAGER) {
      setTrader(session.user.username);
    }
  }, [session, setTrader]);

  useEffect(() => {
    if (!branch || branch === "") {
      if (isRM) {
        traceBranchChange(session?.user?.branchId || "")
      }
      else {
        traceBranchChange('11')
      }

    }
  }, [branch, setBranch]);

  const { data: traders } = useQuery({
    queryKey: ["traders", branch],
    queryFn: () => rmBusinessPerformanceInsights.getTraderWithBranchId(branch)
  });

  const { data: rmWiseEcrmInfo, isLoading: rmWiseEcrmInfoLoading } = useQuery({
    queryKey: ["rmWiseEcrmInfo"],
    queryFn: () => rmBusinessPerformanceInsights.getRegionalEcrmDetails(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: rmWiseEkycInfo, isLoading: rmWiseEkycInfoLoading } = useQuery({
    queryKey: ["rmWiseEkycInfo"],
    queryFn: () => rmBusinessPerformanceInsights.getRegionalEkycDetails(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const {
    data: rmWiseChannelWiseTradeInfo,
    isLoading: rmWiseChannelWiseTradeInfoLoading,
  } = useQuery({
    queryKey: ["rmWiseChannelWiseTradeInfo"],
    queryFn: () => rmBusinessPerformanceInsights.getRegionalChannelWiseTrade(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const {
    data: regionalManagerRMBusinessPerformance,
    isLoading: regionalManagerRMBusinessPerformanceLoading,
  } = useQuery({
    queryKey: ["regionalManagerRMBusinessPerformance"],
    queryFn: () =>
      rmBusinessPerformanceInsights.getRegionalManagerBusinessPerformance(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const { data: branchClientInfo, isLoading: branchClientInfoLoading } =
    useQuery({
      queryKey: ["branchClientInfo"],
      queryFn: () =>
        rmBusinessPerformanceInsights.getRegionalClientPerformanceNonPerformance(),
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });


  return (
    <div className="mx-4">
      <PageHeader name="RM Business and Performance Insight">
        <BranchFilter onChange={traceBranchChange} currentBranch={branch} />
        <TraderFilter
          traders={traders?.data || []}
          currentTrader={trader}
          onChange={handleTraderChange}
        />
      </PageHeader>
      <div className="grid grid-cols-2 gap-3 mt-3 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-6">
        {rmWiseChannelWiseTradeInfo && (

          <ClientTradesDataTable
            records={rmWiseChannelWiseTradeInfo.data}
            branch={branch}
            trader={trader}
          />

        )}

        {rmWiseEcrmInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="eCRM"
            children={<EcrmInfo eCRM={rmWiseEcrmInfo.data} branch={branch} trader={trader} />}
          />
        )}

        {branchClientInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="Client Overview As on Date"
            children={
              <ClientInfo clientData={branchClientInfo.data} branch={branch} trader={trader} />
            }
          />
        )}

        {rmWiseEkycInfo && (
          <CardBoard
            className="col-span-6 xl:col-span-3"
            title="eKYC"
            children={<EkycInfo eKYC={rmWiseEkycInfo.data} branch={branch} trader={trader} />}
          />
        )}
      </div>
      <br></br>
      {regionalManagerRMBusinessPerformance && (
        <RMPerformance
          rmPerformance={
            regionalManagerRMBusinessPerformance?.data
          }
          branch={branch}
          trader={trader}
        />
      )}

    </div>
  );
};

export default RmBusinessPerformanceInsightsPage;
