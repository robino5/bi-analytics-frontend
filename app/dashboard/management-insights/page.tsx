"use client";

import { useMemo, useState } from "react";
import { ManagementInsightsAPI } from "./api/management-insights";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/components/PageHeader";
import FilterSection from "./_component/FilterSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmployeeInfo from "./_component/EmployeeInfo";
import ClientInfo from "./_component/ClientInfo";
import EcrmInfo from "./_component/eCRMInfo";
import EkycInfo from "./_component/eKYCInfo";
import CardBoard from "@/components/CardBoard";

export default function RegionalBusinessPerformancePage() {
    const [region, setRegion] = useState("");
    const [branch, setBranch] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


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

    const { data: branchClientInfo } = useQuery({
        queryKey: ['branchClientInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalClientPerformanceNonPerformance(branch, region),
    });
    const { data: branchEmployeeInfo } = useQuery({
        queryKey: ['branchEmployeeInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalEmployeeStructure(branch, region),
    });

    const { data: branchEcrmInfo } = useQuery({
        queryKey: ['branchEcrmInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalEcrmDetails(branch, region),
    });

    const { data: branchEkycInfo } = useQuery({
        queryKey: ['branchEkycInfo', branch, region],
        queryFn: () => ManagementInsightsAPI.getRegionalEkycDetails(branch, region),
    });


    return (
        <div className="p-6">
            <PageHeader name="Regional Business Performance" />
            <Card className="mt-6 shadow-xl bg-gradient-to-br from-[#033e4a] to-[#055b6d] rounded-xl border border-teal-900">
                <CardContent className="p-6">
                    <FilterSection
                        region={region}
                        branch={branch}
                        fromDate={fromDate}
                        toDate={toDate}
                        regionList={regionList}
                        branchList={branchList}
                        setRegion={setRegion}
                        setBranch={setBranch}
                        setFromDate={setFromDate}
                        setToDate={setToDate}
                    />
                </CardContent>
            </Card>

            {/* Title Bar */}
            <div className="bg-yellow-400 text-center py-3 rounded-sm mb-2 mt-3">
                <h2 className="text-lg font-bold"> Regional Size of office space – <span className="font-bold">8,570 SFT</span></h2>
            </div>
            <div className="grid grid-cols-12 gap-4">
                {/* Col 4 */}
                <div className="col-span-6 p-4 rounded">
                    {branchEmployeeInfo &&
                        <CardBoard
                            className="col-span-6 xl:col-span-3"
                            title={`Employee Structure-${branchEmployeeInfo.data?.detail?.sumOfPermanentTrader+branchEmployeeInfo.data?.detail?.sumOfContractualWithSalary+branchEmployeeInfo.data?.detail?.sumOfContractualWithoutSalary}`}
                            children={
                                <EmployeeInfo employeeData={branchEmployeeInfo.data} />
                            }
                        />
                    }
                    <br></br>
                    {branchClientInfo &&
                     <ClientInfo clientData={branchClientInfo.data} />   
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
                    {branchEkycInfo &&
                        <CardBoard
                            className="col-span-6 xl:col-span-3"
                            title={"eKYC"}
                            children={
                                <EkycInfo eKYC={branchEkycInfo.data} />
                            }
                        />
                    }
                </div>
            </div>


        </div>
    )
}