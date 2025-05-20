"use client";
import PageHeader from "@/components/PageHeader";
import ClientSegmentationChart from "./_components/_client_segmentation_chart";
import BranchWiseClientsNumberChart from "./_components/_branch_wise_clients_number_chart";
import BranchWiseNonPerformerClientsChart from "./_components/_branch_wise_non_performer_clients_chart";
import LBSLTurnOverSegmentationChart from "./_components/_lbsl_turnover_segmentation_chart";
import EquityValueSegmentationChart from "./_components/_equity_value_segmentation_chart";
import LedgerValueSegmentationChart from "./_components/_ledger_value_segmentation_chart";
import DetailsMarketShareLBSLChart from "./_components/_details_market_share_of_lbsl_chart";
import PortfolioValueSegmentationChart from "./_components/_portfolio_value_segmentation";
import GsecTurnoverComparisonChart from "./_components/_gsec_turnover_comparison_chart";
import GsecTurnoverChart from "./_components/_gsec_turnover_chart";

import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { customerManagementAPI } from "./api";
import LoadingButton from "@/components/loading";

export default function CustomerManagement() {
  const currentDate = new Date();
  const { data: clientSegmentation, isLoading: clientSegmentationLoading, isError: clientSegmentationError } = useQuery({
    queryKey: ["clientSegmentation"],
    queryFn: () => customerManagementAPI.getClientSegmentation()
  });

  const { data: branchClientRation, isLoading: branchClientRationLoading, isError: branchClientRationError } = useQuery({
    queryKey: ["branchClientRation"],
    queryFn: () => customerManagementAPI.getBranchWiseClientRatio()
  });

  const { data: branchNonPerformerClient, isLoading: branchNonPerformerClientLoading, isError: branchNonPerformerClientError } = useQuery({
    queryKey: ["branchNonPerformerClient"],
    queryFn: () => customerManagementAPI.getBranchWiseNonPerformerClient()
  });

  const { data: lbslTurnoverSegmentation, isLoading: lbslTurnoverSegmentationLoading, isError: lbslTurnoverSegmentationError } = useQuery({
    queryKey: ["lbslTurnoverSegmentation"],
    queryFn: () => customerManagementAPI.getLBSLTurnoverSegmentation()
  });
  const { data: equityValueSegmentation, isLoading: equityValueSegmentationLoading, isError: equityValueSegmentationError } = useQuery({
    queryKey: ["equityValueSegmentation"],
    queryFn: () => customerManagementAPI.getEquityValueSegmentation()
  });

  const { data: ledgerValueSegmentation, isLoading: ledgerValueSegmentationLoading, isError: ledgerValueSegmentationError } = useQuery({
    queryKey: ["ledgerValueSegmentation"],
    queryFn: () => customerManagementAPI.getLedgerValueSegmentation()
  });

  const { data: detailsMarketShareLBSL, isLoading: detailsMarketShareLBSLLoading, isError: detailsMarketShareLBSLError } = useQuery({
    queryKey: ["detailsMarketShareLBSL"],
    queryFn: () => customerManagementAPI.getDetailsMarketShareLBSL()
  });

  const { data: portfolioValueSegmentation, isLoading: portfolioValueSegmentationLoading, isError: portfolioValueSegmentationError } = useQuery({
    queryKey: ["portfolioValueSegmentation"],
    queryFn: () => customerManagementAPI.getPortfolioValueSegmentation()
  });

  const { data: gsecTurmover, isLoading: gsecTurmoverLoading, isError:gsecTurmoverError } = useQuery({
    queryKey: ["gsecTurmover"],
    queryFn: () => customerManagementAPI.getGsecTurmover()
  });
  const { data: gsecTurmoverComparison, isLoading: gsecTurmoverComparisonLoading, isError:gsecTurmoverComparisonError } = useQuery({
    queryKey: ["gsecTurmoverComparison"],
    queryFn: () => customerManagementAPI.getGsecTurmoverComparison()
  });

  

  const isLoading = clientSegmentationLoading || branchClientRationLoading || branchNonPerformerClientLoading || lbslTurnoverSegmentationLoading||equityValueSegmentationLoading
                     || ledgerValueSegmentationLoading || detailsMarketShareLBSLLoading || portfolioValueSegmentationLoading || gsecTurmoverLoading || gsecTurmoverComparisonLoading;

  const error = clientSegmentationError || branchClientRationError || branchNonPerformerClientError || lbslTurnoverSegmentationError || equityValueSegmentationError
                 || ledgerValueSegmentationError || detailsMarketShareLBSLError || portfolioValueSegmentationError || gsecTurmoverError || gsecTurmoverComparisonError;

  if (isLoading) {
    return <LoadingButton text="Loading..." />
  }

  if (error) {
    return <>Error...</>
  }

  return (
    <div className="mx-4">
      <title>Customer Management | LBSL</title>
      <meta
        name="description"
        content="Showing business and trade management"
      />
      <PageHeader name={`Customer Management (${formatDate(currentDate)})`} />
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {clientSegmentation?.data ? (
          <ClientSegmentationChart
            title="Client Segmentation"
            subtitle="Showing data for client segmentation"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={clientSegmentation?.data?.rows as any}
            details={clientSegmentation?.data?.detail as any}
            colors={[ "#ff6b6b ","#1e90ff ","#ffd166","#1dd1a1","#ee5253"]}
          />
        ) : null}
        {lbslTurnoverSegmentation?.data ? (
          <LBSLTurnOverSegmentationChart
            title="LBSL TurnOver (Customer wise)"
            subtitle="Showing data for lbsl turnOver segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={lbslTurnoverSegmentation?.data?.rows as any}
            details={lbslTurnoverSegmentation?.data?.detail as any}
            //colors={["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"]}
            colors={[ "#ff6b6b ","#1e90ff ","#ffd166","#1dd1a1","#ee5253"]}
          />
        ) : null}
        {equityValueSegmentation?.data ? (
          <EquityValueSegmentationChart
            title="Equity Value (Customer wise)"
            subtitle="Showing data for equity value segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={equityValueSegmentation?.data?.rows as any}
            details={equityValueSegmentation?.data?.detail as any}
            //colors={["#A4A0EB", "#FF9800", "#2196F3", "#9C27B0", "#F44336"]}
            colors={[ "#ff6b6b ","#1e90ff ","#ffd166","#1dd1a1","#ee5253"]}
          />
        ) : null}
        {ledgerValueSegmentation?.data ? (
          <LedgerValueSegmentationChart
            title="Ledger Value (Customer wise)"
            subtitle="Showing data for ledger value segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={ledgerValueSegmentation?.data?.rows as any}
            details={ledgerValueSegmentation?.data?.detail as any}
            //colors={["#4CAF50", "#C74272", "#2196F3", "#9C27B0", "#F44336"]}
            colors={[ "#ff6b6b ","#1e90ff ","#ffd166","#1dd1a1","#ee5253"]}
          />
        ) : null}
        {portfolioValueSegmentation?.data ? (
          <PortfolioValueSegmentationChart
            title="Portfolio Value (Customer wise)"
            subtitle="Showing data for portfolio value segmentation ( customer wise)"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={portfolioValueSegmentation?.data?.rows as any}
            details={portfolioValueSegmentation?.data?.detail as any}
            colors={[ "#ff6b6b ","#1e90ff ","#ffd166","#1dd1a1","#ee5253"]}
            colors2={["#DDB5EB", "#EB6122"]}
          />
        ) : null}
        {detailsMarketShareLBSL?.data ? (
          <DetailsMarketShareLBSLChart
            title="Details Market Share of LBSL ( Foreign )"
            subtitle="Showing data for details  market share of LBSL ( Foreign )"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={detailsMarketShareLBSL?.data?.rows as any}
            details={detailsMarketShareLBSL?.data?.detail as any}
          />
        ) : null}
          {gsecTurmover?.data ? (
          <GsecTurnoverChart
            title="GSEC Turnover"
            subtitle="Showing data for details  market share of LBSL ( Foreign )"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={gsecTurmover?.data?.rows as any}
            details={gsecTurmover?.data?.detail as any}
          />
        ) : null}
          {gsecTurmoverComparison?.data?.rows ? (
          <GsecTurnoverComparisonChart
            title="Comparison"
            subtitle="Showing data for details  market share of LBSL ( Foreign )"
            className="col-span1 overflow-y-auto lg:col-span-3 lg:row-span-3"
            data={gsecTurmoverComparison?.data?.rows as any}
            details={gsecTurmoverComparison?.data?.detail as any}
          />
        ) : null}
        {branchClientRation?.data ? (
          <BranchWiseClientsNumberChart
            title="Branch Wise Clients Number"
            subtitle="Showing data for branch wise clients number"
            className="col-span1 overflow-y-auto lg:col-span-6 lg:row-span-6"
            data={branchClientRation?.data?.rows as any}
            details={branchClientRation?.data?.detail as any}
          />
        ) : null}
        {branchNonPerformerClient?.data ? (
          <BranchWiseNonPerformerClientsChart
            title="Non Performer Clients As on "
            subtitle="Showing data for non performer clients as on "
            className="col-span1 overflow-y-auto lg:col-span-6 lg:row-span-6"
            data={branchNonPerformerClient?.data?.rows as any}
            details={branchNonPerformerClient?.data?.detail as any}
          />
        ) : null}
      </div>
    </div>
  );
}
