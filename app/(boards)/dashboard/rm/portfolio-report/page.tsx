"use client";

import PageHeader from "@/components/PageHeader";
import BranchFilter from "@/components/branchFilter";
import TraderFilter, { ITrader } from "@/components/traderFilter";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import RMFundCollectionTable from "./_rmFundCollection";
import PortfolioManagementStatusDataTable from "./_rmPortfolioStatus";
import CardBoard from "@/components/CardBoard";
import BarChartPositiveNegative from "@/components/BarChartPositiveNegative";
import { BarColors } from "@/components/ui/utils/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { successResponse } from "@/lib/utils";
import {
  IFundCollection,
  IMarkedClient,
  INetFundFlow,
  IPortfolioManagement,
} from "@/types/rmPortfolio";
import MarkedTraderDataTable from "./_marked_traders_datatable";
import SummarySkeletonCard from "@/components/skeletonCard";

const RmPortfolioBoard = () => {
  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // ===========================================
  const { data: session } = useSession();
  const [branch, setBranch] = useState("");
  const [trader, setTrader] = useState("");
  const [traders, setTraders] = useState<ITrader[]>([]);

  const [fundCollections, setFundCollection] = useState<IFundCollection[]>([]);
  const [redClients, setRedClients] = useState<IMarkedClient[]>([]);
  const [yellowClients, setYellowClients] = useState<IMarkedClient[]>([]);
  const [portfolio, setPortfolio] = useState<IPortfolioManagement[]>([]);
  const [netFundFlow, setNetFundFlow] = useState<INetFundFlow[]>([]);

  const handleBranchChange = (value: string) => {
    setBranch(value);
    setTrader(traders[0]?.traderId);
  };
  const handleTraderChange = (value: string) => {
    setTrader(value);
  };

  const dailyNetFundFlowOption = {
    dataKey: "tradingDate",
    valueKey: "amount",
    fill: BarColors.orange,
    stroke: "#c3ce",
    barLabel: true,
  };

  useEffect(() => {
    if (branch && trader) {
      const fetchFundCollections = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/fund-collections/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            IFundCollection[]
          >;
          if (successResponse(result.status)) {
            setFundCollection(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const fetchPortfolio = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/portfolio-management-status/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            IPortfolioManagement[]
          >;
          if (successResponse(result.status)) {
            setPortfolio(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };

      const fetchYellowClients = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/marked-clients/?branch=${branch}&category=yellow&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<IMarkedClient[]>;
          if (successResponse(result.status)) {
            setYellowClients(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const fetchRedClients = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/marked-clients/?branch=${branch}&category=red&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<IMarkedClient[]>;
          if (successResponse(result.status)) {
            setRedClients(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const fetchINetFundFlow = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/daily-net-fund-flow/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<INetFundFlow[]>;
          if (successResponse(result.status)) {
            setNetFundFlow(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      fetchFundCollections();
      fetchRedClients();
      fetchYellowClients();
      fetchPortfolio();
      fetchINetFundFlow();
    }
  }, [trader]);

  useEffect(() => {
    // Fetch Traders
    const fetchTraderWithBranchId = async (branchId: string) => {
      try {
        let branchUrl;
        if (branchId) {
          branchUrl = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/lov/traders/${branchId}/`;
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
      const fetchFundCollections = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/fund-collections/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            IFundCollection[]
          >;
          if (successResponse(result.status)) {
            setFundCollection(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const fetchPortfolio = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/portfolio-management-status/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            IPortfolioManagement[]
          >;
          if (successResponse(result.status)) {
            setPortfolio(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };

      const fetchYellowClients = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/marked-clients/?branch=${branch}&category=yellow&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<IMarkedClient[]>;
          if (successResponse(result.status)) {
            setYellowClients(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const fetchRedClients = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/marked-clients/?branch=${branch}&category=red&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<IMarkedClient[]>;
          if (successResponse(result.status)) {
            setRedClients(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      const fetchINetFundFlow = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rm/daily-net-fund-flow/?branch=${branch}&trader=${trader}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<INetFundFlow[]>;
          if (successResponse(result.status)) {
            setNetFundFlow(result.data);
          }
        } catch (error) {
          console.error(
            `Error Happened while fetching Turnover Performance`,
            error
          );
        }
      };
      fetchFundCollections();
      fetchRedClients();
      fetchYellowClients();
      fetchPortfolio();
      fetchINetFundFlow();
    }
    fetchTraderWithBranchId(branch);
  }, [branch]);

  return (
    <div className="mx-4">
      <PageHeader name="RM Portfolio Report">
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
        <TraderFilter
          traders={traders}
          currentTrader={trader}
          onChange={handleTraderChange}
        />
      </PageHeader>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-6 mt-4">
        {/* Daily Net Fund Flow Chart */}
        {netFundFlow ? (
          <CardBoard
            className="lg:col-span-3"
            title="Daily Net Fund Flow"
            subtitle="short summary of the portfolio"
            children={
              <BarChartPositiveNegative
                data={netFundFlow as any}
                options={dailyNetFundFlowOption}
              />
            }
          />
        ) : <SummarySkeletonCard className="col-span-3" />}
        {/* Zonal Marked Investors */}
        <Tabs defaultValue="red" className="col-span-3">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="red">Red</TabsTrigger>
            <TabsTrigger value="yellow">Yellow</TabsTrigger>
          </TabsList>
          <TabsContent value="red">
            <Card>
              <CardHeader>
                <CardTitle>Red</CardTitle>
                <CardDescription>red clients details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 overflow-y-auto max-h-[250px]">
                <MarkedTraderDataTable records={redClients} />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="yellow">
            <Card>
              <CardHeader>
                <CardTitle>Yellow</CardTitle>
                <CardDescription>yellow clients details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 overflow-y-auto max-h-[250px]">
                <MarkedTraderDataTable records={yellowClients} />
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Fund Collection Status */}
        {fundCollections ? (
          <RMFundCollectionTable records={fundCollections} />
        ) : <SummarySkeletonCard className="col-span-4" />}

        {/* Portfolio Management Status */}
        {portfolio ? (
          <PortfolioManagementStatusDataTable records={portfolio} />
        ) : <SummarySkeletonCard className="col-span-2" />}
      </div>
    </div>
  );
};

export default RmPortfolioBoard;
