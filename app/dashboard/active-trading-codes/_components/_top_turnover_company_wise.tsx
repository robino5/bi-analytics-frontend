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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { activeTradingCodeAPI } from "../api";
import { useQuery } from "@tanstack/react-query";
import { SkeletonStatistics } from "@/components/skeletonCard";
import { format } from 'date-fns';



export default function TopTurnoverCompany({ default: defaultProp }: { default: any }) {
    const [activeTab, setActiveTab] = useState("LBSL");
    // Separate date states
    const [lbsDate, setLbsDate] = useState<any | null>(null);
    const [dseDate, setDseDate] = useState<any | null>(null);
    console.log("lbs_date", lbsDate)
    console.log("dse_date", dseDate)


    const { data: sectorwiseTrunovertop20, isLoading: sectorwiseTurnoverLoadingtop20, isError: sectorwiseTurnoverErrortop20 } = useQuery({
        queryKey: ["sectorwiseTurnovertop20",lbsDate],
                queryFn: () => {
                    const url = lbsDate
                        ? `dashboards/admin-realtime-turnover-top-20/?trading_date=${lbsDate}`
                        : "dashboards/admin-realtime-turnover-top-20/";
        
                    return activeTradingCodeAPI.getSectorwiseTurnoverTop20(url);
                }
    });

    const { data: exchangeSectorwiseTrunovertop20, isLoading: exchangeSectorwiseTurnoverLoadingtop20, isError: exchangeSectorwiseTurnoverErrortop20 } = useQuery({
        queryKey: ["exchangeSectorwiseTurnovertop20",dseDate],
        queryFn: () => {
            const url = dseDate
                ? `dashboards/admin-realtime-turnover-comparison-top20-sector-wise/?trading_date=${dseDate}`
                : "dashboards/admin-realtime-turnover-comparison-top20-sector-wise/";

            return activeTradingCodeAPI.getExchangeSectorwiseTurnoverTop20(url);
        }
    });


    console.log(exchangeSectorwiseTrunovertop20)


    const isWeekend = (date: Date) => date.getDay() === 5 || date.getDay() === 6;

    const today = new Date();
    const isValidDate = (date: Date) => {
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(today.getDate() - 9);
        return date >= tenDaysAgo && date <= today && !isWeekend(date);
    };

    const handleDateSelect = (selected: Date | undefined) => {
        if (!selected || !isValidDate(selected)) return;

        const formattedDate =  format(selected, 'yyyy-MM-dd');

        if (activeTab === "LBSL") {
            setLbsDate(formattedDate);
        } else {
            setDseDate(formattedDate);
        }
    };

    return (
        <>
            {sectorwiseTrunovertop20?.data && exchangeSectorwiseTrunovertop20?.data ? (
                <Card className="col-span-3 overflow-auto bg-[#033e4a] relative">
                    <Tabs value={activeTab} defaultValue="LBSL" onValueChange={setActiveTab} className="w-full">
                        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-1 rounded-tl-lg rounded-tr-lg grid grid-cols-[3fr_2fr] items-center">
                            <CardTitle className="text-white text-lg font-semibold py-2">
                                {activeTab === "LBSL"
                                    ? `Top 20 Turnover Company Wise ${lbsDate ? format(lbsDate, "dd-MMM-yyyy") : defaultProp.slice(0, 9)}`
                                    : `Top 20 Turnover Company Wise ${dseDate ? format(dseDate, "dd-MMM-yyyy") : defaultProp.slice(0, 9)}`}
                            </CardTitle>
                            <div className="flex items-center space-x-4">
                                {/* Popover for the calendar */}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="bg-white flex items-center space-x-2 text-gray-700"
                                        >
                                            <CalendarIcon className="w-5 h-5" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-lg">
                                        <Calendar
                                            mode="single"
                                            selected={activeTab === "LBSL" ? (lbsDate ? new Date(lbsDate) : undefined) : (dseDate ? new Date(dseDate) : undefined)}
                                            onSelect={handleDateSelect}
                                            className="rounded-md border bg-white"
                                            disabled={(date) => !isValidDate(date)}
                                        />
                                    </PopoverContent>
                                </Popover>

                                <TabsList className="bg-gray-200 p-1 rounded-lg text-dark">
                                    <TabsTrigger value="LBSL">LBSL</TabsTrigger>
                                    <TabsTrigger value="DSE">DSE vs LBSL</TabsTrigger>
                                </TabsList>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <TabsContent value="LBSL">
                                <BarChartHorizontalStack
                                    data={sectorwiseTrunovertop20?.data}
                                    options={{
                                        legendName: "Quantity",
                                        dataKey: "name",
                                        valueKey: "value",
                                        fill: BarColors.blue,
                                        stroke: "purple",
                                        height: 700,
                                        barLabel: true,
                                    }}
                                    colorArray={["#8BC34A", "#E91E63"]}
                                />
                            </TabsContent>
                            <TabsContent value="DSE">
                                <BarChartHorizontalComprisonExchange
                                    data={exchangeSectorwiseTrunovertop20?.data}
                                    options={{ legendNames: ["DSE", "LBSL"], barcolors: ["#A1DD70", "#FF4191"] }}
                                />
                            </TabsContent>
                            {activeTab === "DSE" && (
                                <p className="text-[#FF4191] text-lg font-bold">
                                    Note: LBSL's percentage represents its share of total DSE stock turnover value, based on one-to-one comparison.
                                </p>
                            )}
                        </CardContent>
                    </Tabs>
                </Card>
            ) : (
                 <SkeletonStatistics className="col-span-3 xl:col-span-3" />
            )}
        </>



    );
}
