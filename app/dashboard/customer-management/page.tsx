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
import GsecTurnoverComparisonChart from "./_gsec_turnover_comparison_chart";
import GsecTurnoverChart from "./_gsec_turnover_chart";
import {
  ClientSegmentation,
  ClientSegmentationDetails,
  BranchWiseClintsNumber,
  BranchWiseClintsNumberDetails,
  BranchWiseNonPerformerClints,
  BranchWiseNonPerformerClintsDetails,
  LBSLTurnoverSegmentation,
  LBSLTurnoverSegmentationDetails,
  EquityValueSegmentation,
  EquityValueSegmentationDetails,
  LedgerValueSegmentation,
  LedgerValueSegmentationDetails,
  DetailsMarketShareLBSL,
  DetailsMarketShareLBSLDetails,
  PortfolioValueSegmentation,
  PortfolioValueSegmentationDetails,
  GsecTurnoverDetails,
  GsecTurnover,
  GsecTurnoverComparisonDetails,
  GsecTurnoverComparison
} from "@/types/customerManagement";
import { formatDate, successResponse } from "@/lib/utils";
import { IResponse } from "@/types/utils";

interface ClientSegmentationData {
  detail: {
    sumOfClients: number;
  };
  rows: ClientSegmentation[];
}

interface LBSLTurnoverSegmentationData {
  detail: {
    sumOfTurnovers: number;
  };
  rows: LBSLTurnoverSegmentation[];
}

interface EquityValueSegmentationData {
  detail: {
    sumOfEquity: number;
  };
  rows: EquityValueSegmentation[];
}

interface LedgerValueSegmentationData {
  detail: {
    sumOfMargin: number;
  };
  rows: LedgerValueSegmentation[];
}

interface LedgerValueSegmentationData {
  detail: {
    sumOfMargin: number;
  };
  rows: LedgerValueSegmentation[];
}

interface PortfolioValueSegmentationData {
  detail: PortfolioValueSegmentationDetails;
  rows: PortfolioValueSegmentation[];
}

interface DetailsMarketShareLBSLData {
  detail: DetailsMarketShareLBSLDetails;
  rows: DetailsMarketShareLBSL[];
}

interface BranchWiseClintsNumberData {
  detail: BranchWiseClintsNumberDetails;
  rows: BranchWiseClintsNumber[];
}

interface BranchWiseNonPerformerClintsData {
  detail: BranchWiseNonPerformerClintsDetails;
  rows: BranchWiseNonPerformerClints[];
}

interface GsecTurnoverType {
  detail: GsecTurnoverDetails;
  rows: GsecTurnover[];
}

interface GsecTurnoverComparisonType {
  detail: GsecTurnoverComparisonDetails;
  rows: GsecTurnoverComparison[];
}

export default function CustomerManagement() {
  const { data: session } = useSession();
  const [clientSegmentation, setClientSegmentation] = useState<
    ClientSegmentation[] | null
  >(null);
  const [clientSegmentationDetails, setClientSegmentationDetails] =
    useState<ClientSegmentationDetails | null>(null);
  const [branchClientRation, setBranchClientRation] = useState<
    BranchWiseClintsNumber[] | null
  >(null);
  const [branchClientRationDetails, setBranchClientRationDetails] =
    useState<BranchWiseClintsNumberDetails | null>(null);
  const [branchNonPerformerClient, setBranchNonPerformerClient] = useState<
    BranchWiseNonPerformerClints[] | null
  >(null);
  const [branchNonPerformerClientDetails, setBranchNonPerformerClientDetails] =
    useState<BranchWiseNonPerformerClintsDetails | null>(null);
  const [lbslTurnoverSegmentation, setLBSLTurnoverSegmentation] = useState<
    LBSLTurnoverSegmentation[] | null
  >(null);
  const [lbslTurnoverSegmentationDetails, setLBSLTurnoverSegmentationDetails] =
    useState<LBSLTurnoverSegmentationDetails | null>(null);
  const [equityValueSegmentation, setEquityValueSegmentation] = useState<
    EquityValueSegmentation[] | null
  >(null);
  const [equityValueSegmentationDetails, setEquityValueSegmentationDetails] =
    useState<EquityValueSegmentationDetails | null>(null);
  const [ledgerValueSegmentation, setLedgerValueSegmentation] = useState<
    LedgerValueSegmentation[] | null
  >(null);
  const [ledgerValueSegmentationDetails, setLedgerValueSegmentationDetails] =
    useState<LedgerValueSegmentationDetails | null>(null);
  const [detailsMarketShareLBSL, setDetailsMarketShareLBSL] = useState<
    DetailsMarketShareLBSL[] | null
  >(null);
  const [detailsMarketShareLBSLDetails, setDetailsMarketShareLBSLDetails] =
    useState<DetailsMarketShareLBSLDetails | null>(null);
  const [portfolioValueSegmentation, setPortfolioValueSegmentationL] = useState<
    PortfolioValueSegmentation[] | null
  >(null);
  const [
    portfolioValueSegmentationDetails,
    setPortfolioValueSegmentationLDetails,
  ] = useState<PortfolioValueSegmentationDetails | null>(null);
  const [gsecTurmoverDetails,setGsecTurmoverDetails] = useState<GsecTurnoverDetails | null>(null);
  const [gsecTurmover,setGsecTurmover] = useState<GsecTurnover[] | null>(null);
  
  const [gsecTurmoverComparisonDetails,setGsecTurmoverComparisonDetails] = useState<GsecTurnoverComparisonDetails | null>(null);
  const [gsecTurmoverComparison,setGsecTurmoverComparison] = useState<GsecTurnoverComparison[] | null>(null);
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
          },
        );
        const result =
          (await response.json()) as IResponse<ClientSegmentationData>;

        if (successResponse(result.status)) {
          setClientSegmentation(result.data.rows);
          setClientSegmentationDetails(result.data.detail);
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
          },
        );
        const result =
          (await response.json()) as IResponse<BranchWiseClintsNumberData>;

        if (successResponse(result.status)) {
          setBranchClientRation(result.data.rows);
          setBranchClientRationDetails(result.data.detail);
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
          },
        );
        const result =
          (await response.json()) as IResponse<BranchWiseNonPerformerClintsData>;

        if (successResponse(result.status)) {
          setBranchNonPerformerClient(result.data.rows);
          setBranchNonPerformerClientDetails(result.data.detail);
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
          },
        );
        const result =
          (await response.json()) as IResponse<LBSLTurnoverSegmentationData>;

        if (successResponse(result.status)) {
          setLBSLTurnoverSegmentation(result.data.rows);
          setLBSLTurnoverSegmentationDetails(result.data.detail);
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
          },
        );
        const result =
          (await response.json()) as IResponse<EquityValueSegmentationData>;

        if (successResponse(result.status)) {
          setEquityValueSegmentation(result.data.rows);
          setEquityValueSegmentationDetails(result.data.detail);
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
          },
        );
        const result =
          (await response.json()) as IResponse<LedgerValueSegmentationData>;

        if (successResponse(result.status)) {
          setLedgerValueSegmentation(result.data.rows);
          setLedgerValueSegmentationDetails(result.data.detail);
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
          },
        );
        const result =
          (await response.json()) as IResponse<DetailsMarketShareLBSLData>;

        if (successResponse(result.status)) {
          setDetailsMarketShareLBSL(result.data.rows);
          setDetailsMarketShareLBSLDetails(result.data.detail);
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
          },
        );
        const result =
          (await response.json()) as IResponse<PortfolioValueSegmentationData>;

        if (successResponse(result.status)) {
          setPortfolioValueSegmentationL(result.data.rows);
          setPortfolioValueSegmentationLDetails(result.data.detail);
        }
      } catch (error) {
        console.error("Error fetching portfolio value segmentation", error);
      }
    };

        // fatching gsec turnover
        const fetchGsecTurmover = async () => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/gsec-turnover/`,
              {
                headers: {
                  Authorization: `Bearer ${session?.user.accessToken}`,
                  "Content-Type": "application/json",
                },
              },
            );
            const result =
              (await response.json()) as IResponse<GsecTurnoverType>;
    
            if (successResponse(result.status)) {
              setGsecTurmover(result.data.rows);
              setGsecTurmoverDetails(result.data.detail);
            }
          } catch (error) {
            console.error("Error fetching portfolio value segmentation", error);
          }
        };

        // fatching gsec turnover
        const fetchGsecTurmoverComparison = async () => {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/admin/customer-management/gsec-turnover-comparison/`,
              {
                headers: {
                  Authorization: `Bearer ${session?.user.accessToken}`,
                  "Content-Type": "application/json",
                },
              },
            );
            const result =
              (await response.json()) as IResponse<GsecTurnoverComparisonType>;
    
            if (successResponse(result.status)) {
              setGsecTurmoverComparison(result.data.rows);
              setGsecTurmoverComparisonDetails(result.data.detail);
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
    fetchGsecTurmover();
    fetchGsecTurmoverComparison();
  }, []);

  const currentDate = new Date();

  return (
    <div className="mx-4">
      <title>Customer Management | LBSL</title>
      <meta
        name="description"
        content="Showing business and trade management"
      />
      <PageHeader name={`Customer Management (${formatDate(currentDate)})`} />
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {clientSegmentation ? (
          <ClientSegmentationChart
            title="Client Segmentation"
            subtitle="Showing data for client segmentation"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={clientSegmentation as any}
            details={clientSegmentationDetails as any}
            colors={[ "#ff6b6b ","#1e90ff ","#ffd166","#1dd1a1","#ee5253"]}
          />
        ) : null}
        {lbslTurnoverSegmentation ? (
          <LBSLTurnOverSegmentationChart
            title="LBSL TurnOver (Customer wise)"
            subtitle="Showing data for lbsl turnOver segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={lbslTurnoverSegmentation as any}
            details={lbslTurnoverSegmentationDetails as any}
            colors={["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"]}
          />
        ) : null}
        {equityValueSegmentation ? (
          <EquityValueSegmentationChart
            title="Equity Value (Customer wise)"
            subtitle="Showing data for equity value segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={equityValueSegmentation as any}
            details={equityValueSegmentationDetails as any}
            colors={["#A4A0EB", "#FF9800", "#2196F3", "#9C27B0", "#F44336"]}
          />
        ) : null}
        {ledgerValueSegmentation ? (
          <LedgerValueSegmentationChart
            title="Ledger Value (Customer wise)"
            subtitle="Showing data for ledger value segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={ledgerValueSegmentation as any}
            details={ledgerValueSegmentationDetails as any}
            colors={["#4CAF50", "#C74272", "#2196F3", "#9C27B0", "#F44336"]}
          />
        ) : null}
        {portfolioValueSegmentation ? (
          <PortfolioValueSegmentationChart
            title="Portfolio Value (Customer wise)"
            subtitle="Showing data for portfolio value segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={portfolioValueSegmentation as any}
            details={portfolioValueSegmentationDetails as any}
            colors={["#c200fb", "#F689A6", "#2196F3", "#9C27B0", "#F44336"]}
            colors2={["#DDB5EB", "#EB6122"]}
          />
        ) : null}
        {detailsMarketShareLBSL ? (
          <DetailsMarketShareLBSLChart
            title="Details Market Share of LBSL ( Foreign )"
            subtitle="Showing data for details  market share of LBSL ( Foreign )"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={detailsMarketShareLBSL as any}
            details={detailsMarketShareLBSLDetails as any}
          />
        ) : null}
          {gsecTurmover ? (
          <GsecTurnoverChart
            title="GSEC Turnover"
            subtitle="Showing data for details  market share of LBSL ( Foreign )"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={gsecTurmover as any}
            details={gsecTurmoverDetails as any}
          />
        ) : null}
          {gsecTurmoverComparison ? (
          <GsecTurnoverComparisonChart
            title="Comparison"
            subtitle="Showing data for details  market share of LBSL ( Foreign )"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={gsecTurmoverComparison as any}
            details={gsecTurmoverComparisonDetails as any}
          />
        ) : null}
        {branchClientRation ? (
          <BranchWiseClientsNumberChart
            title="Branch Wise Clients Number"
            subtitle="Showing data for branch wise clients number"
            className="col-span1 overflow-y-auto lg:col-span-6 lg:row-span-6"
            data={branchClientRation as any}
            details={branchClientRationDetails as any}
          />
        ) : null}
        {branchNonPerformerClient ? (
          <BranchWiseNonPerformerClientsChart
            title="Non Performer Clients As on "
            subtitle="Showing data for non performer clients as on "
            className="col-span1 overflow-y-auto lg:col-span-6 lg:row-span-6"
            data={branchNonPerformerClient as any}
            details={branchNonPerformerClientDetails as any}
          />
        ) : null}
      </div>
    </div>
  );
}
