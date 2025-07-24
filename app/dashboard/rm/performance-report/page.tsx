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

const RmPerformanceBoard = () => {
  const { data: session } = useSession();

  const isRM = session?.user.role.toString() === RoleType.REGIONAL_MANAGER;
  // TODO : Need to inject BranchCode in the session object
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

  const handleBranchChange = async (branchId: string) => {
    setBranch(branchId);
    setTrader(traders[0]?.traderId);
  };

  const handleTraderChange = async (value: string) => {
    setTrader(value);
  };

  // on page load
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
      fetchTurnoverPerformance();
      fetchClientDetails();
      fetchInvestorLiveTradeDetails();
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
      fetchTraderWithBranchId();
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
        {/* Investor Live Trade RM Wise */}
        {investorLiveTrade ? (
          <Card className="col-span-6 mb-2 shadow-xl bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Investor Live Trade RM Wise</CardTitle>
              {/* <CardDescription className="text-white">
                Client Details for Regional Managers
              </CardDescription> */}
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveTradeDataTable
                data={investorLiveTrade}
                columns={investorLiveTradeClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}

        {/* Client Details */}
        {clients ? (
          <Card className="col-span-6 mb-2 shadow-xl bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg">Client Details</CardTitle>
              {/* <CardDescription className="text-white">
                Client Details for Regional Managers
              </CardDescription> */}
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
