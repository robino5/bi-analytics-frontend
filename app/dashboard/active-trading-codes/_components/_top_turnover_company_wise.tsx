import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ExchnageSectorWiseTurnover, SectorWiseTurnoverTop20 } from "../types";
import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartHorizontalStack from "@/components/BarChartHorizontalStack";
import { BarColors } from "@/components/ui/utils/constants";

interface TopTurnoverCompanyProps {
    lbsldata: SectorWiseTurnoverTop20[];
    exchangeData: ExchnageSectorWiseTurnover[];
}

export default function TopTurnoverCompany({ lbsldata, exchangeData }: TopTurnoverCompanyProps) {

    const [activeTab, setActiveTab] = useState("LBSL");
    console.log(lbsldata);

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
        return activeTab === "LBSL" ? "LBSL-DSE Top 20 Turnover Company Wise" : "Exchange Top 20 Turnover Company Wise";
    };

    return (
        <Card className="col-span-3 overflow-auto bg-[#0e5e6f]">
            <Tabs defaultValue="LBSL" onValueChange={handleTabChange} className="w-full">
                <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-1 rounded-tl-lg rounded-tr-lg grid grid-cols-[4fr_1fr] items-center">
                    <CardTitle className="text-white text-lg font-semibold py-2">
                        {getTitle()}
                    </CardTitle>
                    <div className="text-right">
                        <TabsList className="bg-gray-200 p-1 rounded-lg text-dark">
                            <TabsTrigger value="LBSL">LBSL</TabsTrigger>
                            <TabsTrigger value="DSE">Exchange</TabsTrigger>
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
                        <BarChartHorizontal
                            data={exchangeData}
                            options={options}
                            colorArray = {["#4CAF50", "#FF5722", "#2196F3", "#FFEB3B", "#9C27B0"]}
                        />
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    );
}
