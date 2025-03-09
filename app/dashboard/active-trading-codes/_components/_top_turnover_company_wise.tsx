import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExchnageSectorWiseTurnover, SectorWiseTurnoverTop20 } from "../types";
import BarChartHorizontalStack from "@/components/BarChartHorizontalStack";
import { BarColors } from "@/components/ui/utils/constants";
import BarChartHorizontalComprisonExchange from "@/components/BarChartHorizontalComprisonExchange";

interface TopTurnoverCompanyProps {
    lbsldata: SectorWiseTurnoverTop20[];
    exchangeData: ExchnageSectorWiseTurnover[];
}

export default function TopTurnoverCompany({ lbsldata, exchangeData }: TopTurnoverCompanyProps) {

    const [activeTab, setActiveTab] = useState("LBSL");

    const options = {
        legendName: "Quantity",
        dataKey: "name",
        valueKey: "value",
        fill: BarColors.blue,
        stroke: "purple",
        height: 700,
        barLabel: true,
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    const getTitle = () => {
        return activeTab === "LBSL" ? "LBSL-DSE Top 20 Turnover Company Wise" : "DSE vs LBSL Top 20 Turnover Comparison Company Wise";
    };

    return (
        <Card className="col-span-3 overflow-auto bg-[#0e5e6f] relative">
            <Tabs defaultValue="LBSL" onValueChange={handleTabChange} className="w-full">
                <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-1 rounded-tl-lg rounded-tr-lg grid grid-cols-[4fr_1fr] items-center">
                    <CardTitle className="text-white text-lg font-semibold py-2">
                        {getTitle()}
                    </CardTitle>
                    <div className="text-right mr-10">
                        <TabsList className="bg-gray-200 p-1 rounded-lg text-dark">
                            <TabsTrigger value="LBSL">LBSL</TabsTrigger>
                            <TabsTrigger value="DSE">DSE vs LBSL</TabsTrigger>
                        </TabsList>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="LBSL">
                        <BarChartHorizontalStack
                            data={lbsldata}
                            options={options}
                            colorArray={["#8BC34A","#E91E63"]}
                        />
                    </TabsContent>
                    <TabsContent value="DSE">
                        <BarChartHorizontalComprisonExchange
                            data={exchangeData}
                            options={{ legendNames: ["DSE", "LBSL"], barcolors: ["#A1DD70", "#FF4191"] }}
                        />
                    </TabsContent>
                    {activeTab === "DSE" && (
                        <p className="text-[#FF4191] text-lg font-bold">Note: LBSL's percentage represents its share of total DSE stock turnover value, based on one-to-one comparison.</p>
                    )}
                </CardContent>
            </Tabs>
        </Card>
    );
}
