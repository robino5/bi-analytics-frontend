"use client";
import PageHeader from "@/components/PageHeader";
import BranchFilter from "@/components/branchFilter";
import TraderFilter, { ITrader } from "@/components/traderFilter";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import RMTurnoverPerformance from "./_rmTurnvoerPerformance";
import { DataTable as RMClientsDataTable } from "./client/_clientsDataTable";
import { rmWiseClientsColumns } from "./client/_clientTableColumns";
import { DataTable as InvestorLiveTradeDataTable } from "./investor_live_trade/_investorLiveTradeTable";
import { investorLiveTradeClientsColumns } from "./investor_live_trade/_investorLiveTradeTableColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { successResponse } from "@/lib/utils";
import { IClientDetail, InvestorLiveTradeInfo, ITurnoverPerformance } from "@/types/rmPerformance";
import { IResponse } from "@/types/utils";
import { RoleType } from "@/app/schemas";
import { InvestorLiveTopBuySaleInfo, TraderPerformance } from "../../business-and-trade-management/types";
import { investorLiveBuySaleClientsColumns } from "./investor_live_top_buya_sale/_investorLiveBuySaleTableColumns";
import { DataTable as InvestorLiveBuySaleDatatable } from "./investor_live_top_buya_sale/_investorLiveBuySaleTable";
import { useBranchStore } from "@/lib/stores/branchStore";
import { useTraderStore } from "@/lib/stores/rmStore";
import { useQuery } from "@tanstack/react-query";
import { performanceReport } from "./api";
import { RMPerformance} from "./_rmPerformanceSumm";
import LiveIndicator from "@/components/ui/live-indicator";

const RmPerformanceBoard = () => {
  const { data: session } = useSession();
  const isRM = session?.user.role.toString() === RoleType.REGIONAL_MANAGER;
  const defaultBranch = isRM ? "12" : "";
  const defaultTrader = isRM ? session.user.username : "";
  const branch = useBranchStore((state) => state.branch);
  const setBranch = useBranchStore((state) => state.setBranch);
  const trader = useTraderStore((state) => state.trader)
  const setTrader = useTraderStore((state) => state.setTrader);
  //const [traders, setTraders] = useState<ITrader[]>([]);
  const [turnoverPerformance, setTurnoverPerformance] = useState<
    ITurnoverPerformance[]
  >([]);
  const [clients, setClients] = useState<IClientDetail[]>([]);
  const [investorLiveTrade, setInvestorLiveTrade] = useState<InvestorLiveTradeInfo[]>([]);
  const [investorTopSaleData, setInvestorTopSaleData] = useState<
    InvestorLiveTopBuySaleInfo[]
  >();

  const [investorTopBuyData, setInvestorTopBuyData] = useState<
    InvestorLiveTopBuySaleInfo[]
  >();
    const [rmPerformaceSumm, setRMPerformanceSumm] = useState<
    TraderPerformance[]
  >();
  const handleBranchChange = async (branchId: string) => {
    setBranch(branchId);
    setTrader(trader);
  };

  const handleTraderChange = async (value: string) => {
    setTrader(value);
  };

    const { data: traders } = useQuery({
    queryKey: ["traders", branch],
    queryFn: () => performanceReport.getTraderWithBranchId(branch)
  });

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
    handleBranchChange('11')
  }
}, [branch, setBranch]);


useEffect(() => {
  if (!trader || trader === "" ) {
     if (traders?.data?.length) {
    handleTraderChange(traders.data[0].traderId);
  }
  }
}, [trader, setTrader,traders]);


  useEffect(() => {
    if (branch && trader) {
      const fetchTurnoverPerformance = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/turnover-performance/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            ITurnoverPerformance[]
          >;
          if (successResponse(result.status)) {
            setTurnoverPerformance(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };

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
            `Error Happened while fetching Turnover Performance`,
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
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      // top 20 inverstor Sale Date
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
          console.log(error)
          console.error(
            `Error Happened while ecrm Data`,
            error
          );
        }
      };

      // top 20 inverstor Buy Date
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
          console.log(error)
          console.error(
            `Error Happened while ecrm Data`,
            error
          );
        }
      };

      // top 20 inverstor Buy Date
      const fetchRMPerformanceData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/rm-performance-summary/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<TraderPerformance[]>;
          if (successResponse(result.status)) {
            setRMPerformanceSumm(result.data);
          }
        } catch (error) {
          console.log(error)
          console.error(
            `Error Happened while ecrm Data`,
            error
          );
        }
      };
      fetchRMPerformanceData();
      fetchTurnoverPerformance();
      fetchClientDetails();
      fetchInvestorLiveTradeDetails();
      fetchTopInvestorSaleData();
      fetchTopInvestorBuyData();
    }
  }, [trader]);
  return (
    <div className="mx-4">
      <PageHeader name="RM Performance Report">
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
        <TraderFilter
          traders={traders?.data || []}
          currentTrader={trader}
          onChange={handleTraderChange}
        />
      </PageHeader>
      <div className="grid grid-col-6 gap-3 xl:grid-cols-6 mt-2">
        {/* Turnover Performance */}
        {turnoverPerformance ? (
          <RMTurnoverPerformance records={turnoverPerformance} />
        ) : null}
        {/* Client Details */}
             {rmPerformaceSumm ? (
          <RMPerformance data={rmPerformaceSumm?.[0]||{}} />
        ) : null}

        {investorTopBuyData ? (
          <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Twenty Buyer <LiveIndicator /></CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorTopBuyData}
                columns={investorLiveBuySaleClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}

        {investorTopSaleData ? (
          <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Twenty Seller <LiveIndicator /></CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorTopSaleData}
                columns={investorLiveBuySaleClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}
        {/* Investor Live Trade RM Wise */}
        {investorLiveTrade ? (
          <Card className="col-span-6 mb-2 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg flex items-center gap-2">Investor Live Trade RM Wise <LiveIndicator /></CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveTradeDataTable
                data={investorLiveTrade}
                columns={investorLiveTradeClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}
        {clients ? (
          <Card className="col-span-6 mb-2 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Client Details Information</CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <RMClientsDataTable
                data={clients}
                columns={rmWiseClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default RmPerformanceBoard;
