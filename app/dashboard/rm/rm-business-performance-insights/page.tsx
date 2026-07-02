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
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LiveIndicator from "@/components/ui/live-indicator";
import { DataTable as RMClientsDataTable } from "./client/_clientsDataTable";
import { rmWiseClientsColumns } from "./client/_clientTableColumns";
import { DataTable as InvestorLiveTradeDataTable } from "./investor_live_trade/_investorLiveTradeTable";
import { investorLiveTradeClientsColumns } from "./investor_live_trade/_investorLiveTradeTableColumns";
import { investorLiveBuySaleClientsColumns } from "./investor_live_top_buya_sale/_investorLiveBuySaleTableColumns";
import { DataTable as InvestorLiveBuySaleDatatable } from "./investor_live_top_buya_sale/_investorLiveBuySaleTable";
import { IClientDetail, InvestorLiveTradeInfo } from "@/types/rmPerformance";
import { InvestorLiveTopBuySaleInfo } from "../../business-and-trade-management/types";
import { successResponse } from "@/lib/utils";
import { IResponse } from "@/types/utils";
import { BranchWiseNonePerformClient } from "@/types/dailyTurnoverPerformance";
import { branchWiseNonePerformingClientColumns } from ".//brach_wise_none_performing_client/_branchWiseNonePerformingClientColumns";
import { DataTable as BranchWiseNonePerformingClientDatatable } from "./brach_wise_none_performing_client/_branchWiseNonePerformingClientTable";

const RmBusinessPerformanceInsightsPage = () => {
  const { data: session } = useSession();

  const isRM = session?.user.role.toString() === RoleType.REGIONAL_MANAGER;
  const defaultBranch = isRM ? session?.user?.branchId : "";
  const defaultTrader = isRM ? session?.user.username : "";

  const branch = useBranchStore((state) => state.branch);
  const setBranch = useBranchStore((state) => state.setBranch);
  const trader = useTraderStore((state) => state.trader)
  const setTrader = useTraderStore((state) => state.setTrader);

  const [investorTopSaleData, setInvestorTopSaleData] = useState<InvestorLiveTopBuySaleInfo[]>();
  const [investorTopBuyData, setInvestorTopBuyData] = useState<InvestorLiveTopBuySaleInfo[]>();
  const [investorLiveTrade, setInvestorLiveTrade] = useState<InvestorLiveTradeInfo[]>();
  const [clients, setClients] = useState<IClientDetail[]>();
  const [nonePerformClient, setNonePerformClient] = useState<BranchWiseNonePerformClient[]>();

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

  useEffect(() => {
    if (branch && trader) {
      const fetchClientDetails = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/client-details/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<IClientDetail[]>;
          if (successResponse(result.status)) {
            setClients(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Client Details`,
            error
          );
        }
      };

      const fetchInvestorLiveTradeDetails = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/investor-live-trade-rm-wise/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<InvestorLiveTradeInfo[]>;
          if (successResponse(result.status)) {
            setInvestorLiveTrade(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Investor Live Trade Details`,
            error
          );
        }
      };

      const fetchTopInvestorSaleData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/live-investor-top-sale-rm-wise/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            InvestorLiveTopBuySaleInfo[]
          >;
          if (successResponse(result.status)) {
            setInvestorTopSaleData(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching top investor sale data`,
            error
          );
        }
      };

      const fetchTopInvestorBuyData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/live-investor-top-buy-rm-wise/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            InvestorLiveTopBuySaleInfo[]
          >;
          if (successResponse(result.status)) {
            setInvestorTopBuyData(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching top investor buy data`,
            error
          );
        }
      };

      const fetchNonePerformingClient = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/branchwise-none-performing-client/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<BranchWiseNonePerformClient[]>;
          if (successResponse(result.status)) {
            setNonePerformClient(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Non Performing clients`,
            error
          );
        }
      };

      fetchClientDetails();
      fetchInvestorLiveTradeDetails();
      fetchTopInvestorSaleData();
      fetchTopInvestorBuyData();
      fetchNonePerformingClient();
    }
  }, [branch, trader, session?.user?.accessToken]);



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

      <div className="grid grid-cols-12 gap-3 mt-3">
        <Card className="col-span-12 md:col-span-6 shadow-xl bg-[#033e4a]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Twenty buyer <LiveIndicator /></CardTitle>
          </CardHeader>
          <CardContent className="mt-3">
            <InvestorLiveBuySaleDatatable
              data={investorTopBuyData || []}
              columns={investorLiveBuySaleClientsColumns}
            />
          </CardContent>
        </Card>

        <Card className="col-span-12 md:col-span-6 shadow-xl bg-[#033e4a]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Twenty Seller <LiveIndicator /></CardTitle>
          </CardHeader>
          <CardContent className="mt-3">
            <InvestorLiveBuySaleDatatable
              data={investorTopSaleData || []}
              columns={investorLiveBuySaleClientsColumns}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3 mt-3">
        <Card className="col-span-1 shadow-xl bg-[#033e4a]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg flex items-center gap-2">Investor Live Trade RM Wise <LiveIndicator /></CardTitle>
          </CardHeader>
          <CardContent className="mt-3 overflow-auto">
            <InvestorLiveTradeDataTable
              data={investorLiveTrade || []}
              columns={investorLiveTradeClientsColumns}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 shadow-xl bg-[#033e4a]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg">Client Details Information</CardTitle>
          </CardHeader>
          <CardContent className="mt-3 overflow-auto">
            <RMClientsDataTable
              data={clients || []}
              columns={rmWiseClientsColumns}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#033e4a] mt-2">
        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
          <CardTitle className="text-white text-md text-lg">Non Performing clients-{nonePerformClient?.length || 0}</CardTitle>
        </CardHeader>
        <CardContent className="mt-3">
          <BranchWiseNonePerformingClientDatatable
            data={nonePerformClient || []}
            columns={branchWiseNonePerformingClientColumns}
          />
        </CardContent>
      </Card>

    </div>
  );
};

export default RmBusinessPerformanceInsightsPage;
