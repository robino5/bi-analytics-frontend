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
import { InvestorLiveTopBuySaleInfo } from "../../business-and-trade-management/types";
import { investorLiveBuySaleClientsColumns } from "./investor_live_top_buya_sale/_investorLiveBuySaleTableColumns";
import { DataTable as InvestorLiveBuySaleDatatable } from "./investor_live_top_buya_sale/_investorLiveBuySaleTable";

const RmPerformanceBoard = () => {
  const { data: session } = useSession();
  const isRM = session?.user.role.toString() === RoleType.REGIONAL_MANAGER;
  const defaultBranch = isRM ? "12" : "";
  const defaultTrader = isRM ? session.user.username : "";
  const [branch, setBranch] = useState(defaultBranch);
  const [trader, setTrader] = useState(defaultTrader);
  const [traders, setTraders] = useState<ITrader[]>([]);
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

  const handleBranchChange = async (branchId: string) => {
    setBranch(branchId);
    setTrader(traders[0]?.traderId);
  };

  const handleTraderChange = async (value: string) => {
    setTrader(value);
  };

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
      fetchTurnoverPerformance();
      fetchClientDetails();
      fetchInvestorLiveTradeDetails();
      fetchTopInvestorSaleData();
      fetchTopInvestorBuyData();
    }
  }, [trader]);

  useEffect(() => {
    if (branch) {
      // Fetch Traders
      const fetchTraderWithBranchId = async () => {
        try {
          let branchUrl;
          if (branch) {
            branchUrl = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/lov/traders/${branch}/`;
          } else {
            branchUrl = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/lov/traders/`;
          }
          const response = await fetch(branchUrl, {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          });

          const result = (await response.json()) as IResponse<ITrader[]>;
          if (successResponse(result.status)) {
            setTraders(result.data);
            setTrader(result.data[0].traderId);
          }
        } catch (error) {
          console.error(`Error fetching traders.`, error);
        }
      };
      // top 20 inverstor Sale Date
      const fetchTopInvestorSaleData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/live-investor-top-sale-rm-wise/?branch=${branch}`,
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
      const fetchTopInvestorBuyData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/live-investor-top-buy-rm-wise/?branch=${branch}`,
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
      fetchTraderWithBranchId();
      fetchTopInvestorSaleData();
      fetchTopInvestorBuyData();
    }
  }, [branch]);

  return (
    <div className="mx-4">
      <PageHeader name="RM Performance Report">
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
        <TraderFilter
          traders={traders}
          currentTrader={trader}
          onChange={handleTraderChange}
        />
      </PageHeader>
      <div className="grid grid-col-6 gap-3 xl:grid-cols-6 mt-2">
        {/* Turnover Performance */}
        {turnoverPerformance ? (
          <RMTurnoverPerformance records={turnoverPerformance} />
        ) : null}

        {investorTopBuyData ? (
          <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Top Twenty buyer ( DSE)</CardTitle>
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
          <Card className="col-span-12 md:col-span-3 shadow-xl bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Top Twenty Seller ( DSE)</CardTitle>
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
          <Card className="col-span-6 mb-2 shadow-xl bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Investor Live Trade RM Wise(DSE)</CardTitle>
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
          <Card className="col-span-6 mb-2 shadow-xl bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Client Details</CardTitle>
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
