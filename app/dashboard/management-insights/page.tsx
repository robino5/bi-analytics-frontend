"use client";

import { useMemo, useState } from "react";
import { ManagementInsightsAPI } from "./api/management-insights";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import FilterSection from "./_component/FilterSection";
import { Card, CardContent } from "@/components/ui/card";
import EmployeeInfo from "./_component/EmployeeInfo";
import ClientInfo from "./_component/ClientInfo";
import EcrmInfo from "./_component/eCRMInfo";
import EkycInfo from "./_component/eKYCInfo";
import CardBoard from "@/components/CardBoard";
import LoadingButton from "@/components/loading";
import ClientTradesDataTable from "./_component/clientTradesDataTable";
import ThirdPartyInfo from "./_component/thirdPartyInfo";
import DepositWithdrawInfo from "./_component/depositWithdraw";
import ExposureInfo from "./_component/exposureInfo";

/* Return current fiscal quarter range like "Oct-2025 to Dec-2025" */
const getFiscalQuarterRange = (): string => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let start = 0;
    let end = 2;
    let startYear = year;
    let endYear = year;

    if (month >= 9) {
        // Oct - Dec
        start = 9; end = 11;
    } else if (month <= 2) {
        // Jan - Mar
        start = 0; end = 2;
    } else if (month <= 5) {
        // Apr - Jun
        start = 3; end = 5;
    } else {
        // Jul - Sep
        start = 6; end = 8;
    }

    return `${monthNames[start]}-${startYear} to ${monthNames[end]}-${endYear}`;
}

export default function RegionalBusinessPerformancePage() {
    const [region, setRegion] = useState("");
    const [branch, setBranch] = useState("");


    const { data: regionsBranch, isLoading: regionsBranchLoading, isError: regionsBranchError } = useQuery({
        queryKey: ["regionsBranch"],
        queryFn: () => ManagementInsightsAPI.getRegionsBranch()
    });

    // Unique regions
    const regionList = useMemo(() => {
        const unique = new Set(Array.isArray(regionsBranch?.data) ? regionsBranch.data.map((x) => x.regionName) : []);
        return Array.from(unique);
    }, [regionsBranch]);

    // Filtered branches
    const branchList = useMemo(() => {
        if (!region) return [];
        return Array.isArray(regionsBranch?.data) ? regionsBranch.data.filter((x) => x.regionName === region) : [];
    }, [region, regionsBranch]);

    const { data: branchClientInfo, isPending: branchClientInfoPending } = useQuery({
        queryKey: ['branchClientInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalClientPerformanceNonPerformance(branch, region),
    });
    const { data: branchEmployeeInfo, isPending: branchEmployeeInfoPending } = useQuery({
        queryKey: ['branchEmployeeInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalEmployeeStructure(branch, region),
    });

    const { data: branchEcrmInfo, isPending: branchEcrmInfoPending } = useQuery({
        queryKey: ['branchEcrmInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalEcrmDetails(branch, region),
    });

    const { data: branchEkycInfo, isPending: branchEkycInfoPending } = useQuery({
        queryKey: ['branchEkycInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalEkycDetails(branch, region),
    });

    const { data: branchChannelWiseTradeInfo, isPending: branchChannelWiseTradeInfoPending } = useQuery({
        queryKey: ['branchChannelWiseTradeInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalChannelWiseTrade(branch, region),
    });

    const { data: branchDepositWithdrawDetailsInfo, isPending: branchDepositWithdrawDetailsInfoPending } = useQuery({
        queryKey: ['branchDepositWithdrawDetailsInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalDepositWithdrawDetails(branch, region),
    });

    const { data: branchPartyTurnoverCommissionInfo, isPending: branchPartyTurnoverCommissionInfoPending } = useQuery({
        queryKey: ['branchPartyTurnoverCommissionInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalPartyTurnoverCommission(branch, region),
    });

    const { data: branchExposureInfo, isPending: branchExposureInfoPending } = useQuery({
        queryKey: ['branchExposureInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalExposureDetails(branch, region),
    });

    const { data: branchOfficeSpaceInfo, isPending: branchOfficeSpaceInfoPending } = useQuery({
        queryKey: ['branchOfficeSpaceInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalOfficeSpace(branch, region),
    });

    const isLoading = regionsBranchLoading || branchClientInfoPending || branchEmployeeInfoPending || branchEcrmInfoPending ||
        branchEkycInfoPending || branchChannelWiseTradeInfoPending || branchDepositWithdrawDetailsInfoPending || branchPartyTurnoverCommissionInfoPending || branchExposureInfoPending
        || branchOfficeSpaceInfoPending;

    if (isLoading) {
        return <LoadingButton text="Loading..." />
    }

    return (
        <div className="p-6">
            <PageHeader name="Regional Business Performance" period={getFiscalQuarterRange()} />
            <Card className="mt-6 shadow-xl bg-gradient-to-br from-[#033e4a] to-[#055b6d] rounded-xl border border-teal-900">
                <CardContent className="p-6">
                    <FilterSection
                        region={region}
                        branch={branch}
                        regionList={regionList}
                        branchList={branchList}
                        setRegion={setRegion}
                        setBranch={setBranch}
                    />
                </CardContent>
            </Card>

            <div className="bg-yellow-400 rounded-sm mb-2 mt-3 flex items-stretch border border-black">
                {/* Left side */}
                <div className="w-1/2 text-center border-r border-black flex items-center justify-center py-3">
                    <span className="text-lg font-semibold">
                        Regional Size of office space
                    </span>
                </div>

                {/* Right side */}
                <div className="w-1/2 text-center flex items-center justify-center py-3">
                    <h2 className="text-lg font-bold">
                        {branchOfficeSpaceInfo?.data?.detail?.sumOfTotalOfficeArea || 0}
                        <span className="font-bold"> SFT</span>
                    </h2>
                </div>
            </div>


            <div className="grid grid-cols-12">
                {/* Col 4 */}
                <div className="col-span-6 p-4 rounded">
                    {
                        branchChannelWiseTradeInfo &&
                        <ClientTradesDataTable records={branchChannelWiseTradeInfo.data} />
                    }
                    <br></br>
                    {branchEmployeeInfo &&
                        <CardBoard
                            className="col-span-6 xl:col-span-3"
                            title={`Employee Structure-${branchEmployeeInfo.data?.detail?.sumOfPermanentTrader + branchEmployeeInfo.data?.detail?.sumOfContractualWithSalary + branchEmployeeInfo.data?.detail?.sumOfContractualWithoutSalary} As on Date`}
                            children={
                                <EmployeeInfo employeeData={branchEmployeeInfo.data} />
                            }
                        />
                    }
                    <br></br>
                    {branchEkycInfo &&
                        <CardBoard
                            className="col-span-6 xl:col-span-3"
                            title={"eKYC"}
                            children={
                                <EkycInfo eKYC={branchEkycInfo.data} />
                            }
                        />
                    }
                    <br></br>
                    {branchPartyTurnoverCommissionInfo &&
                        <CardBoard
                            className="col-span-6 xl:col-span-3"
                            title={"Busi. Aggregator Details Information"}
                            children={
                                <ThirdPartyInfo thirdPartyInfo={branchPartyTurnoverCommissionInfo.data} />
                            }
                        />
                    }
                </div>
                {/* Col 5 */}
                <div className="col-span-6 p-4 rounded">
                    {branchEcrmInfo &&
                        <CardBoard
                            className="col-span-6 xl:col-span-3"
                            title={"eCRM"}
                            children={
                                <EcrmInfo eCRM={branchEcrmInfo.data} />
                            }
                        />
                    }
                    <br></br>
                    {branchClientInfo &&
                        <CardBoard
                            className="col-span-6 xl:col-span-3"
                            title={"Client Overview As on Date"}
                            children={
                                <ClientInfo clientData={branchClientInfo.data} />
                            }
                        />
                    }
                    <br></br>
                    {branchDepositWithdrawDetailsInfo &&
                        <CardBoard
                            className="col-span-6 xl:col-span-3"
                            title={"Deposit & Withdraw Details"}
                            children={
                                <DepositWithdrawInfo depositWithdraw={branchDepositWithdrawDetailsInfo.data} />
                            }
                        />
                    }
                    <br></br>
                    {branchExposureInfo &&
                        <CardBoard
                            className="col-span-6 xl:col-span-3"
                            title={"Exposure Information"}
                            children={
                                <ExposureInfo exposureInfo={branchExposureInfo.data} />
                            }
                        />
                    }
                </div>
            </div>
        </div>
    )
}