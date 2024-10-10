"use client";
import PageHeader from "@/components/PageHeader";
import BoardWiseTurnover from "./_board_wise_turnover";
import BoardWiseTurnoverBreakdown from "./_board_wise_turnover_breakdown";
import DetailsMarketShareLBSL from "./_details_market_share_of_lbsl";
import DetailsMarketShareSME from "./_details_market_share_of_lbsl_sme_atb";
import { useEffect, useState } from "react";
import {
  BoardWiseTurnoverData,
  BoardWiseTurnoverBreakdownData,
  MarketShareLBSl,
  MarketShareSME,
} from "@/types/businessTradManagement";
import { useSession } from "next-auth/react";
import { successResponse } from "@/lib/utils";
import { IResponse } from "@/types/utils";

export default function BusinessAndTradeManagement() {
  const { data: session } = useSession();
  const [boardTernoverData, setBoardTernoverData] = useState<
    BoardWiseTurnoverData[] | null
  >(null);
  const [boardTernoverBreakdownData, setBoardTernoverBreakdownData] = useState<
    BoardWiseTurnoverBreakdownData[] | null
  >(null);
  const [marketShareLBSL, setMarketShareLBSL] = useState<
    MarketShareLBSl[] | null
  >(null);
  const [marketShareSME, setMarketShareSME] = useState<MarketShareSME[] | null>(
    null
  );
  // on page load
  useEffect(() => {
    // board ternover data
    const fetchBoardTernoverData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/board-turnover/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          BoardWiseTurnoverData[]
        >;
        if (successResponse(result.status)) {
          setBoardTernoverData(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching bord wise turnover`,
          error
        );
      }
    };
    // board ternover breakdown data
    const fetchBoardTernoverBreakdownData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/board-turnovers-breakdown/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          BoardWiseTurnoverBreakdownData[]
        >;
        if (successResponse(result.status)) {
          setBoardTernoverBreakdownData(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching bord wise turnover breadown`,
          error
        );
      }
    };
    // board ternover details market share LBSL
    const fetchMarketShareLBSL = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/market-share-details/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<MarketShareLBSl[]>;
        if (successResponse(result.status)) {
          setMarketShareLBSL(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching details market share LBSL`,
          error
        );
      }
    };
    // board ternover details market share LBSL SME
    const fetchMarketShareSME = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/atb-market-share-details/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<MarketShareSME[]>;
        if (successResponse(result.status)) {
          setMarketShareSME(result.data);
        }
      } catch (error) {
        console.error(
          `Error Happened while fetching details market share LBSL SME`,
          error
        );
      }
    };
    fetchBoardTernoverData();
    fetchBoardTernoverBreakdownData();
    fetchMarketShareLBSL();
    fetchMarketShareSME();
  }, []);

  return (
    <div className="mx-4">
      <title>Business and Trade Management | LBSL</title>
      <meta
        name="description"
        content="Showing a  usiness and trade  management"
      />
      <PageHeader name="Business and Trade  Management"></PageHeader>
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {boardTernoverData ? (
          <BoardWiseTurnover datalist={boardTernoverData as any} />
        ) : null}

        {boardTernoverBreakdownData ? (
          <BoardWiseTurnoverBreakdown
            datalist={boardTernoverBreakdownData as any}
          />
        ) : null}

        {marketShareLBSL ? (
          <DetailsMarketShareLBSL datalist={marketShareLBSL as any} />
        ) : null}

        {marketShareSME ? (
          <DetailsMarketShareSME datalist={marketShareSME as any} />
        ) : null}
      </div>
    </div>
  );
}
