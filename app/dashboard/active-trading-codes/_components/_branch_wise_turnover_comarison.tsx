import React, { useState } from "react";
import { BranchData } from "../types";
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OmsBranchwiseTurnover from "./_oms_branchwise_turnover";



export default function BranchWiseTurnoverComparison({ internetTurnover, dtTurnover }: { internetTurnover: BranchData, dtTurnover: BranchData }) {
    const [activeTab, setActiveTab] = useState("Internet");
    return (

        <Card className="col-span-3 overflow-auto bg-[#033e4a] max-h-[600px] relative">
            <Tabs value={activeTab} defaultValue="LBSL" onValueChange={setActiveTab} className="w-full">
                <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg grid grid-cols-[4fr_1fr] items-center">
                    <CardTitle className="text-white text-lg font-semibold py-2">
                        Client Branch Wise Turnover ({activeTab})
                    </CardTitle>
                    <div className="flex items-center space-x-4 mr-6">
                        <TabsList className="bg-gray-200 p-1 rounded-lg text-black mr-3">
                            <TabsTrigger value="Internet">Internet</TabsTrigger>
                            <TabsTrigger value="DT">DT</TabsTrigger>
                        </TabsList>
                    </div>
                    <div className="absolute top-3 right-2">
                        <Link
                            href={
                                activeTab === "Internet"
                                    ? "http://192.168.10.7:8080/api/v1/dashboards/admin-oms-branchwise-turnover-csv/"
                                    : "http://192.168.10.7:8080/api/v1/dashboards/admin-oms-branchwise-dt-turnover-csv/"
                            }
                            className="inline-flex items-center"
                        >
                            <Download className="h-5 w-5 text-white" />
                        </Link>
                    </div>
                </CardHeader>
                <CardContent className="mt-2">
                    <TabsContent value="Internet">
                        <OmsBranchwiseTurnover data={internetTurnover as any} />
                    </TabsContent>
                    <TabsContent value="DT">
                        <OmsBranchwiseTurnover data={dtTurnover as any} />
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    );
}