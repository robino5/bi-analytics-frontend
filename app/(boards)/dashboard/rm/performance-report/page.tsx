"use client";

import PageHeader from "@/components/PageHeader";
import BranchFilter from "@/components/branchFilter";
import TraderFilter, { ITrader } from "@/components/traderFilter";
import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";
import RMTurnoverPerformance from "./_rmTurnvoerPerformance";

import { DataTable as RMClientsDataTable } from "./_clientsDataTable";
import { rmWiseClientsColumns } from "./_clientTableColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { successResponse } from "@/lib/utils";
import { IClientDetail, ITurnoverPerformance } from "@/types/rmPerformance";

const RmPerformanceBoard = () => {
  const { data: session } = useSession();

  const [trader, setTrader] = useState("");
  const [branch, setBranch] = useState("");
  const [traders, setTraders] = useState<ITrader[]>([]);

  const [turnoverPerformance, setTurnoverPerformance] = useState<
    ITurnoverPerformance[]
  >([]);
  const [clients, setClients] = useState<IClientDetail[]>([]);

  const handleBranchChange = async (branchId: string) => {
    setBranch(branchId);
    setTrader(traders[0]?.traderId);
  };

  const handleTraderChange = async (value: string) => {
    setTrader(value);
  };

  // on page load
  useEffect(() => {
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
      fetchTurnoverPerformance();
      fetchClientDetails();
    }
    fetchTraderWithBranchId();
  }, [branch]);

  // on trader change
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
      fetchTurnoverPerformance();
      fetchClientDetails();
    }
  }, [trader]);

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
        {/* Client Details */}
        {clients ? (
          <Card className="w-full col-span-6 mb-2 shadow-xl lg:col-span-3 bg-gradient-to-br from-gray-50 to-slate-50">
            <CardHeader>
              <CardTitle className="text-slate-600">Client Details</CardTitle>
              <CardDescription>
                Client Details for Regional Managers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RMClientsDataTable
                data={clients}
                columns={rmWiseClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}
        {/* Turnover Performance */}
        {turnoverPerformance ? (
          <RMTurnoverPerformance records={turnoverPerformance} />
        ) : null}
      </div>
    </div>
  );
};

export default RmPerformanceBoard;
