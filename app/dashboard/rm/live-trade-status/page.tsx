"use client"
import { DseLiveTrade } from "@/components/dse-live-trade"
import { Ticker } from "@/components/ticker"
import BranchFilter from "@/components/branchFilter"
import PageHeader from "@/components/PageHeader"
import { useBranchStore } from "@/lib/stores/branchStore"
import { rmActiveTradingCodeAPI } from "./api"
import { useQuery } from "@tanstack/react-query"
import ClientTradesDataTable from "./_components/clientTradesDataTable"
import { IActiveTradeDayWise, IActiveTradingToday } from "./types"
import PieChart from "./_components/pieChart";
import NoDataFound from "./_components/_no_data_found"
import { removeKeyFromObjects } from "@/utils"
import LoadingButton from "@/components/loading"
import CardBoard from "@/components/CardBoard"
import { SkeletonStatistics } from "@/components/skeletonCard"
import BarChartHorizontal from "@/components/BarChartHorizontal"
import { BarColors } from "@/components/ui/utils/constants"
import TraderFilter from "@/components/traderFilter"
import { useTraderStore } from "@/lib/stores/rmStore"
import { useSession } from "next-auth/react"
import { RoleType } from "@/app/schemas"
import { useEffect } from "react"


const BranchActiveTradingCodesBoard = () => {

    const sectorMarginCodeExposureOption = {
        legendName: "Quantity",
        dataKey: "name",
        valueKey: "value",
        fill: BarColors.blue,
        stroke: "purple",
        height: 700,
        barLabel: true,
    };
    const { data: session } = useSession();
    const isRM = session?.user.role.toString() === RoleType.REGIONAL_MANAGER;
    const defaultBranch = isRM ? session?.user?.branchId : "";
    const defaultTrader = isRM ? session?.user.username : "";

    const branch = useBranchStore((state) => state.branch);
    const setBranch = useBranchStore((state) => state.setBranch);
    const trader = useTraderStore((state) => state.trader)
    const setTrader = useTraderStore((state) => state.setTrader);

    const traceBranchChange = async (branchId: string) => {
        setBranch(branchId);
        setTrader(defaultTrader);
    };

    const handleTraderChange = async (value: string) => {
        setTrader(value);
    };

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
            if (isRM) {
                traceBranchChange(session?.user?.branchId || "")
            }
            else {
                traceBranchChange('11')
            }

        }
    }, [branch, setBranch]);

    const { data: traders } = useQuery({
        queryKey: ["traders", branch],
        queryFn: () => rmActiveTradingCodeAPI.getTraderWithBranchId(branch)
    });

    const { data: dayWiseSummaryResponse, isPending: dayWiseSummaryResponsePending, error: dayWiseSummaryResponseError } = useQuery({
        queryKey: ["dayWiseSummaryResponse", branch, trader],
        queryFn: () => rmActiveTradingCodeAPI.getBranchwiseClientTradeSummaryByToday(branch, trader),
        enabled: !!branch,
    });

      const { data: sectorwiseTrunoverComparison } = useQuery({
    queryKey: ['sectorwiseTrunoverComparison', branch, trader], // ✅ separate cache per branch+trader
    queryFn: () => rmActiveTradingCodeAPI.getRmWLiveTurnoverSectorWise(branch, trader),
    enabled: !!branch,
  });


    const isLoading = dayWiseSummaryResponsePending;

    const error = dayWiseSummaryResponseError;

    if (isLoading) {
        return <LoadingButton text="Loading..." />
    }

    if (error) {
        // TODO: Return a beautiful Error boundary component
        return <>Error...</>
    }

    const dayWiseSummary = dayWiseSummaryResponse?.data

    const sanitizedDayWiseSummary = removeKeyFromObjects(
        dayWiseSummary as IActiveTradeDayWise[],
        "channel",
        "TOTAL (DT+INTERNET)",

    );

    console.log("short", dayWiseSummary)
    return (
        <div className="mx-4">
            <PageHeader
                name={`Active Trading Codes as on ${dayWiseSummaryResponse?.data?.[0]?.pushDate ?? null}`}
                updateStatus="* This data is updated every 15 minutes."
            >
                <BranchFilter onChange={traceBranchChange} currentBranch={branch} />
                <TraderFilter
                    currentTrader={trader}
                    traders={traders?.data || []}
                    onChange={handleTraderChange}
                />
            </PageHeader>
            <Ticker />
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-6 mt-0">
                <div className="rounded-md xl:col-span-3 ">
                    <ClientTradesDataTable records={dayWiseSummary as IActiveTradingToday[]} />
                </div>
                <div className="rounded-md xl:col-span-3">
                    <DseLiveTrade />
                </div>
                {/* client  */}
                {sanitizedDayWiseSummary ? (
                    <div className="rounded-md xl:col-span-2">
                        <PieChart
                            title="Clients (Today)"
                            dataKey="totalClients"
                            data={sanitizedDayWiseSummary}
                        />
                    </div>
                ) :
                    <NoDataFound title="Clients (Today)" />}
                {sanitizedDayWiseSummary ? (
                    <div className="rounded-md xl:col-span-2">
                        <PieChart
                            title="Trades (Today)"
                            dataKey="trades"
                            data={sanitizedDayWiseSummary}
                        />
                    </div>
                ) : <NoDataFound title="Trades (Today)" />}

                {sanitizedDayWiseSummary ? (
                    <div className="rounded-md xl:col-span-2">
                        <PieChart
                            title="Turnover (Today)"
                            dataKey="totalTurnover"
                            data={sanitizedDayWiseSummary}
                        />
                    </div>
                ) : <NoDataFound title="Turnover (Today)" />}

                {sectorwiseTrunoverComparison?.data ? (
          <CardBoard
            className="col-span-6 row-span-2 xl:col-span-3"
            title="DSE Live Sector Wise Turnover"
            liveIndicator={true}
            // subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={(sectorwiseTrunoverComparison?.data ?? []).map((item: any) => ({
                  name: item.name,
                  value: item.primaryValue,   // taking primaryValue as value
                }))}
                options={sectorMarginCodeExposureOption}
                colorArray={["#c200fb",]}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}

        {sectorwiseTrunoverComparison?.data ? (
          <CardBoard
            className="col-span-6 row-span-2 xl:col-span-3"
            title="LBSL Live Sector Wise Turnover"
            liveIndicator={true}
            // subtitle="Shows analytics of marginal performance for comodities"
            children={
              <BarChartHorizontal
                data={sectorwiseTrunoverComparison?.data
                  ?.map((item: any) => ({
                    name: item.name,
                    value: item.secondaryValue,
                  }))
                  .sort((a: any, b: any) => b.value - a.value) // sort descending
                }
                options={sectorMarginCodeExposureOption}
                colorArray={["#ff7a56",]}
              />
            }
          />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}

            </div>
        </div>
    )
}
export default BranchActiveTradingCodesBoard
