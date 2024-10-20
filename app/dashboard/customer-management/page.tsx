"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PageHeader from "@/components/PageHeader";
import ClientSegmentationChart from "./_client_segmentation_chart";
import BranchWiseClientsNumberChart from "./_branch_wise_clients_number_chart";
import BranchWiseNonPerformerClientsChart from "./_branch_wise_non_performer_clients_chart";
import LBSLTurnOverSegmentationChart from "./_lbsl_turnover_segmentation_chart";
import EquityValueSegmentationChart from "./_equity_value_segmentation_chart";
import LedgerValueSegmentationChart from "./_ledger_value_segmentation_chart";
import DetailsMarketShareLBSLChart from "./_details_market_share_of_lbsl_chart";
import PortfolioValueSegmentationChart from "./_portfolio_value_segmentation";
import {
  ClientSegmentation,
  BranchWiseClintsNumber,
  BranchWiseNonPerformerClints,
  LBSLTurnoverSegmentation,
  EquityValueSegmentation,
  LedgerValueSegmentation,
  DetailsMarketShareLBSL,
  PortfolioValueSegmentation,
} from "@/types/customerManagement";
import { successResponse } from "@/lib/utils";
import { IResponse } from "@/types/utils";

export default function CustomerManagement() {
  const { data: session } = useSession();
  const [clientSegmentation, setClientSegmentation] = useState<
    ClientSegmentation[] | null
  >(null);
  const [branchClientRation, setBranchClientRation] = useState<
    BranchWiseClintsNumber[] | null
  >(null);
  const [branchNonPerformerClient, setBranchNonPerformerClient] = useState<
    BranchWiseNonPerformerClints[] | null
  >(null);
  const [lbslTurnoverSegmentation, setLBSLTurnoverSegmentation] = useState<
    LBSLTurnoverSegmentation[] | null
  >(null);
  const [equityValueSegmentation, setEquityValueSegmentation] = useState<
    EquityValueSegmentation[] | null
  >(null);
  const [ledgerValueSegmentation, setLedgerValueSegmentation] = useState<
    LedgerValueSegmentation[] | null
  >(null);
  const [detailsMarketShareLBSL, setDetailsMarketShareLBSL] = useState<
    DetailsMarketShareLBSL[] | null
  >(null);
  const [portfolioValueSegmentation, setPortfolioValueSegmentationL] = useState<
    PortfolioValueSegmentation[] | null
  >(null);
  // Fetch data on page load
  useEffect(() => {
    // fatching client segmentation
    const fetchClientSegmentation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/client-segmentations/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          ClientSegmentation[]
        >;

        if (successResponse(result.status)) {
          setClientSegmentation(result.data);
        }
      } catch (error) {
        console.error("Error fetching Client Segmentation", error);
      }
    };
    // fatching Brach wise Client Ratio
    const fetchBranchWiseClientRatio = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/branchwise-client-ratio/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          BranchWiseClintsNumber[]
        >;

        if (successResponse(result.status)) {
          setBranchClientRation(result.data);
        }
      } catch (error) {
        console.error("Error fetching Brach Wise Client Ratio", error);
      }
    };

    // fatching Brach wise Non Performer Client
    const fetchBranchWiseNonPerformerClient = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/branchwise-non-performers/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          BranchWiseNonPerformerClints[]
        >;

        if (successResponse(result.status)) {
          setBranchNonPerformerClient(result.data);
        }
      } catch (error) {
        console.error("Error fetching Brach Wise Non Performer Client", error);
      }
    };

    // fatching lbsl turnover segmentation
    const fetchLBSLTurnoverSegmentation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/turnover-segmentation/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          LBSLTurnoverSegmentation[]
        >;

        if (successResponse(result.status)) {
          setLBSLTurnoverSegmentation(result.data);
        }
      } catch (error) {
        console.error("Error fetching lbsl turnover segmentation", error);
      }
    };

    // fatching equity value segmentation
    const fetchEquityValueSegmentation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/equity-segmentation/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          EquityValueSegmentation[]
        >;

        if (successResponse(result.status)) {
          setEquityValueSegmentation(result.data);
        }
      } catch (error) {
        console.error("Error fetching equity value segmentation", error);
      }
    };

    // fatching ledger value segmentation
    const fetchLedgerValueSegmentation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/ledger-segmentation/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          LedgerValueSegmentation[]
        >;

        if (successResponse(result.status)) {
          setLedgerValueSegmentation(result.data);
        }
      } catch (error) {
        console.error("Error fetching ledger value segmentation", error);
      }
    };

    // fatching market share segmentation
    const fetchDetailsMarketShareLBSL = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/market-share-segmentation/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          DetailsMarketShareLBSL[]
        >;

        if (successResponse(result.status)) {
          setDetailsMarketShareLBSL(result.data);
        }
      } catch (error) {
        console.error("Error fetching market share segmentation", error);
      }
    };

    // fatching portfolio value segmentation
    const fetchPortfolioValueSegmentation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/tpv-segmentation/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          PortfolioValueSegmentation[]
        >;

        if (successResponse(result.status)) {
          setPortfolioValueSegmentationL(result.data);
        }
      } catch (error) {
        console.error("Error fetching portfolio value segmentation", error);
      }
    };

    fetchClientSegmentation();
    fetchBranchWiseClientRatio();
    fetchBranchWiseNonPerformerClient();
    fetchLBSLTurnoverSegmentation();
    fetchEquityValueSegmentation();
    fetchLedgerValueSegmentation();
    fetchDetailsMarketShareLBSL();
    fetchPortfolioValueSegmentation();
  }, []);
  return (
    <div className="mx-4">
      <title>Customer Management | LBSL</title>
      <meta
        name="description"
        content="Showing business and trade management"
      />
      <PageHeader name="Customer Management" />
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {clientSegmentation ? (
          <ClientSegmentationChart
            title="Client Segmentation"
            subtitle="Showing data for client segmentation"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={clientSegmentation as any}
            colors={["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"]}
          />
        ) : null}
        {branchClientRation ? (
          <BranchWiseClientsNumberChart
            title="Branch Wise Clients Number"
            subtitle="Showing data for branch wise clients number"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={branchClientRation as any}
          />
        ) : null}
        {branchNonPerformerClient ? (
          <BranchWiseNonPerformerClientsChart
            title="Non Performer Clients As on "
            subtitle="Showing data for non performer clients as on "
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={branchNonPerformerClient as any}
          />
        ) : null}
        {lbslTurnoverSegmentation ? (
          <LBSLTurnOverSegmentationChart
            title="LBSL TurnOver segmentation ( Customer wise)"
            subtitle="Showing data for lbsl turnOver segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={lbslTurnoverSegmentation as any}
            colors={["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"]}
          />
        ) : null}
        {portfolioValueSegmentation ? (
          <PortfolioValueSegmentationChart
            title="Portfolio Value segmentation ( Customer wise)"
            subtitle="Showing data for portfolio value segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={portfolioValueSegmentation as any}
            colors={["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"]}
            colors2={["#9C27B0", "#3F51B5"]}
          />
        ) : null}
        {equityValueSegmentation ? (
          <EquityValueSegmentationChart
            title="Equity Value segmentation ( Customer wise)"
            subtitle="Showing data for equity value segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={equityValueSegmentation as any}
            colors={["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"]}
          />
        ) : null}
        {ledgerValueSegmentation ? (
          <LedgerValueSegmentationChart
            title="Ledger Value segmentation ( Customer wise)"
            subtitle="Showing data for ledger value segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={ledgerValueSegmentation as any}
            colors={["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"]}
          />
        ) : null}
        {detailsMarketShareLBSL ? (
          <DetailsMarketShareLBSLChart
            title="Details Market Share of LBSL ( Foreign )"
            subtitle="Showing data for details  market share of LBSL ( Foreign )"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={detailsMarketShareLBSL as any}
          />
        ) : null}
      </div>
    </div>
  );
}
