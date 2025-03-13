import { useState, useCallback } from "react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarChartHorizontalComparison from "@/components/BarChartHorizontalComprison";
import { activeTradingCodeAPI } from "../api";
import { useQuery } from "@tanstack/react-query";
import { SkeletonStatistics } from "@/components/skeletonCard";
import { FaCalendarAlt } from "react-icons/fa";

export default function TurnoverComparisonCard({ default: defaultProp }: { default: any }) {
    const [date, setDate] = useState<Date | null>(null);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const today = new Date();

    const { data: sectorwiseTrunoverComparison, isLoading, isError } = useQuery({
        queryKey: ["sectorwiseTrunoverComparison", date],
        queryFn: () => {
            const url = date
                ? `dashboards/admin-realtime-turnover-comparison-sector-wise/?trading_date=${format(date, "yyyy-MM-dd")}`
                : "dashboards/admin-realtime-turnover-comparison-sector-wise/";

            return activeTradingCodeAPI.getSectorWiseTurnoverComparison(url);
        },
    });

    const isWeekend = (date: Date) => date.getDay() === 5 || date.getDay() === 6;

    const isValidDate = (date: Date) => {
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(today.getDate() - 9);
        return date >= tenDaysAgo && date <= today && !isWeekend(date);
    };

    const toggleCalendar = useCallback(() => {
        setIsCalendarOpen((prev) => !prev);
    }, []);

    return (
        <>
            {sectorwiseTrunoverComparison?.data ? (
                <Card className="drop-shadow-md bg-[#0e5e6f] col-span-3 xl:col-span-3">
                    <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-1 rounded-tl-lg rounded-tr-lg grid grid-cols-[4fr_1fr] items-center">
                        <CardTitle className="text-white text-lg font-semibold py-2">
                            Turnover Comparison Sector Wise as on {date ? format(date, "dd-MMM-yyyy") : defaultProp.slice(0, 9)}
                        </CardTitle>
                        <div className="relative flex justify-end items-start mr-10">
                            <button
                                onClick={toggleCalendar}
                                className="bg-white text-black px-3 py-1 rounded-md border flex items-center"
                            >
                                <FaCalendarAlt />
                            </button>

                            {isCalendarOpen && (
                                <div className="absolute right-0 mt-8 z-50 bg-white border rounded-md shadow-md">
                                    <Calendar
                                        mode="single"
                                        selected={date ?? undefined}
                                        onSelect={(selected) => {
                                            if (selected && isValidDate(selected)) {
                                                setDate(selected);
                                                setIsCalendarOpen(false);
                                            }
                                        }}
                                        className="rounded-md border"
                                        disabled={(date) => !isValidDate(date)}
                                    />
                                </div>
                            )}
                        </div>

                    </CardHeader>
                    <CardContent className="flex justify-center items-center mt-4 mb-2">
                        <BarChartHorizontalComparison
                            data={sectorwiseTrunoverComparison.data}
                            options={{ legendNames: ["DSE", "LBSL"], barcolors: ["#c200fb", "#ff7a56"] }}
                            haveBreakdown={true}
                        />
                    </CardContent>
                </Card>
            ) : (
                <SkeletonStatistics className="col-span-3 xl:col-span-3" />
            )}
        </>
    );
}
