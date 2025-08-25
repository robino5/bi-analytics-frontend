"use client";
import PageHeader from "@/components/PageHeader";
import BoardWiseTurnover from "./_components/_board_wise_turnover";
import BoardWiseTurnoverBreakdown from "./_components/_board_wise_turnover_breakdown";
import DetailsMarketShareLBSL from "./_components/_details_market_share_of_lbsl";
import DetailsMarketShareSME from "./_components/_details_market_share_of_lbsl_sme_atb";
import { DataTableCardInvestorWiseSaleableStock } from "./_components/investor-wise-total-saleable-stock/data-table";
import { SalableStockPercentageDataTableCard } from "./_components/salable-stock-percentage/data-table";
import { getHeaderDate } from "@/lib/utils";
import { SalableStockDataTableCard } from "./_components/salable-stock/data-table";
import { investorLiveBuySaleClientsColumns } from "./_components/investor_live_top_buya_sale/_investorLiveBuySaleTableColumns";
import { DataTable as InvestorLiveBuySaleDatatable } from "./_components/investor_live_top_buya_sale/_investorLiveBuySaleTable";
import {
  companyWiseSalableStock,
  SalableStockPercentage,
  InvestorWiseSalableStock,
} from "./_components/columns";
import { businessTradeManagementAPI } from "./api";
import { useQuery } from "@tanstack/react-query";
import LoadingButton from "@/components/loading";
import NoDataFound from "./_components/_no_data_found";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable as InvestorLiveTradeDataTable } from "./_components/investor_live_trade/_investorLiveTradeTable";
import { investorLiveTradeClientsColumns } from "./_components/investor_live_trade/_investorLiveTradeTableColumns";
import LiveIndicator from "@/components/ui/live-indicator";

export default function BusinessAndTradeManagement() {
  const { data: boardTernoverData, isLoading: boardTernoverDataLoading, isError: boardTernoverDataError } = useQuery({
    queryKey: ["boardTernoverData"],
    queryFn: () => businessTradeManagementAPI.getBoardTernoverData()
  });

  const { data: boardTernoverBreakdownData, isLoading: boardTernoverBreakdownDataLoading, isError: boardTernoverBreakdownDataError } = useQuery({
    queryKey: ["boardTernoverBreakdownData"],
    queryFn: () => businessTradeManagementAPI.getBoardTernoverBreakdownData()
  });

  const { data: marketShareLBSL, isLoading: marketShareLBSLLoading, isError: marketShareLBSLError } = useQuery({
    queryKey: ["marketShareLBSL"],
    queryFn: () => businessTradeManagementAPI.getMarketShareLBSL()
  });

  const { data: marketShareSME, isLoading: marketShareSMELoading, isError: marketShareSMEError } = useQuery({
    queryKey: ["marketShareSME"],
    queryFn: () => businessTradeManagementAPI.getMarketShareSME()
  });

  const { data: investorLiveTrade, isLoading: investorLiveTradeLoading, isError: investorLiveTradeError } = useQuery({
    queryKey: ["investorLiveTrade"],
    queryFn: () => businessTradeManagementAPI.getInvestorLiveTrade()
  });


  const { data: investorLiveTopBuy, isLoading: investorLiveTopBuyLoading, isError: investorLiveTopBuyError } = useQuery({
    queryKey: ["investorLiveTopBuy"],
    queryFn: () => businessTradeManagementAPI.getInvestorLiveTopBuy()
  });


  const { data: investorLiveTopSale, isLoading: investorLiveTopSaleLoading, isError: investorLiveTopSaleError } = useQuery({
    queryKey: ["investorLiveTopSale"],
    queryFn: () => businessTradeManagementAPI.getInvestorLiveTopSale()
  });

  const isLoading = boardTernoverDataLoading || boardTernoverBreakdownDataLoading || marketShareLBSLLoading || marketShareSMELoading || investorLiveTradeLoading || investorLiveTopBuyLoading || investorLiveTopSaleLoading;


  if (isLoading) {
    return <LoadingButton text="Loading..." />
  }

  return (
    <div className="mx-4">
      <title>Business and Trade Management | LBSL</title>
      <meta
        name="description"
        content="Showing a  usiness and trade  management"
      />
      <PageHeader
        name={`Business and Trade Management`}
      />
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {boardTernoverData?.data ? (
          <BoardWiseTurnover datalist={boardTernoverData?.data as any} />
        ) : <NoDataFound title="Board Wise Turnover" />}

        {boardTernoverBreakdownData?.data ? (
          <BoardWiseTurnoverBreakdown
            datalist={boardTernoverBreakdownData?.data as any}
          />
        ) : <NoDataFound title="Main Board Wise Turnover Breakdown" />}

        {marketShareLBSL?.data ? (
          <DetailsMarketShareLBSL datalist={marketShareLBSL?.data as any} />
        ) : <NoDataFound title="Details market share of LBSL" />}

        {marketShareSME?.data ? (
          <DetailsMarketShareSME datalist={marketShareSME?.data as any} />
        ) : <NoDataFound title="Details SME-ATB market share of LBSL" />}
      </div>
      <div className="grid grid-cols-12 gap-3 mt-2">
        {investorLiveTopBuy ? (
          <Card className="col-span-12 md:col-span-6 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-lg flex items-center gap-2">
                Top Twenty buyer
                <LiveIndicator />
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorLiveTopBuy?.data}
                columns={investorLiveBuySaleClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}

        {investorLiveTopSale ? (
          <Card className="col-span-12 md:col-span-6 shadow-xl bg-[#033e4a]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
              <CardTitle className="text-white text-md text-lg flex items-center gap-2">Top Twenty Seller <LiveIndicator /></CardTitle>
            </CardHeader>
            <CardContent className="mt-3">
              <InvestorLiveBuySaleDatatable
                data={investorLiveTopSale?.data}
                columns={investorLiveBuySaleClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}
      </div>

      {investorLiveTrade ? (
        <Card className="col-span-6 mb-2 shadow-xl bg-[#033e4a] mt-2">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg flex items-center gap-2">Investor Live Trade RM Wise <LiveIndicator /></CardTitle>
            {/* <CardDescription className="text-white">
                      Client Details for Regional Managers
                    </CardDescription> */}
          </CardHeader>
          <CardContent className="mt-3">
            <InvestorLiveTradeDataTable
              data={investorLiveTrade?.data}
              columns={investorLiveTradeClientsColumns}
            />
          </CardContent>
        </Card>
      ) : null}
      <div className="grid grid-cols-1 gap-3 mt-2 lg:grid-cols-4">
        <SalableStockDataTableCard
          title="CompanyWise Total Saleable Stock"
          subtitle="show data for CompanyWise Total Saleable Stock"
          className="col-span1 overflow-y-auto lg:col-span-2 lg:row-span-2"
          columns={companyWiseSalableStock}
          url="/dashboards/admin/companywise-saleable-stock/"
        />
        <SalableStockPercentageDataTableCard
          title="Saleable Percentage"
          subtitle="show data for Saleable Percentage"
          className="col-span1 overflow-y-auto lg:col-span-2 lg:row-span-2"
          columns={SalableStockPercentage}
          url="/dashboards/admin/companywise-saleable-stock-percentage/"
        />
      </div>
      <div className="grid grid-cols-12 gap-3 mt-2">
        <DataTableCardInvestorWiseSaleableStock
          title="Investor Wise Total Saleable Stock"
          subtitle="show data for investor wise total saleable stock "
          className="col-span-12 overflow-y-auto lg:col-span-12 lg:row-span-2"
          columns={InvestorWiseSalableStock}
          url="/dashboards/admin/investorwise-saleable-stock/"
        />
      </div>
    </div>
  );
}
