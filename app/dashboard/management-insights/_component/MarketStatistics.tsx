"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { numberToMillionsString } from "@/lib/utils";

interface MarketStatisticsProps {
  exchangeWiseMarketStatistics?: any;
  branchWiseMarketStatistics?: any;
  SelectedRegion?: string;
  SelectedBranch?: string;
  selectedBracheCode: string;
}
export default function MarketStatistics({
  exchangeWiseMarketStatistics,
  branchWiseMarketStatistics,
  SelectedRegion,
  SelectedBranch,
  selectedBracheCode,
}: MarketStatisticsProps) {
  console.log(
    "Props - Exchange Wise Market Statistics:",
    exchangeWiseMarketStatistics,
  );
  console.log(
    "Props - Branch Wise Market Statistics:",
    branchWiseMarketStatistics,
  );
  // Normalize branch list and compute filtered aggregates
  const branchArray: any[] = Array.isArray(branchWiseMarketStatistics)
    ? branchWiseMarketStatistics
    : Array.isArray(branchWiseMarketStatistics?.detail)
    ? branchWiseMarketStatistics.detail
    : branchWiseMarketStatistics?.detail?.rows ||
      branchWiseMarketStatistics?.detail?.branches ||
      [];

  const filteredBranchList = (branchArray || []).filter((item: any) => {
    // Match region when SelectedRegion is provided
    if (SelectedRegion && String(item.regionName).trim() !== String(SelectedRegion).trim())
      return false;
    // Only apply branch filter when a region is selected
    if (SelectedRegion && selectedBracheCode && String(item.branchCode) !== String(selectedBracheCode))
      return false;
    return true;
  });

  const branchAvgSum = filteredBranchList.reduce((s: number, i: any) => s + (i.avgTurnover || 0), 0);
  const branchTotalSum = filteredBranchList.reduce((s: number, i: any) => s + (i.totalTurnover || 0), 0);
  const exchangeLbslSum = (exchangeWiseMarketStatistics || []).reduce((s: number, i: any) => s + (i.lbslTotalTurnover || 0), 0);
  const regionalContributionPercent = exchangeLbslSum ? (branchTotalSum / exchangeLbslSum) * 100 : 0;
  return (
    <Card className="w-full shadow-md bg-[#0e5e6f] mt-3">
      {/* Title Bar */}
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg ">
        <CardTitle className="text-white text-md text-lg">
          LBSL Market Statistics
        </CardTitle>
      </CardHeader>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-3">
        {/* Average Daily Turnover */}
        <Card className="w-full shadow-md bg-[#0e5e6f]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg text-white">
            <CardTitle className="text-base font-semibold">
              Average Daily Turnover (mn)
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <table className="w-full text-sm">
              <tbody>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">
                    {exchangeWiseMarketStatistics?.[1].exchange}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {numberToMillionsString(
                      exchangeWiseMarketStatistics?.[1].avgTurnover || 0,
                    )}
                  </td>
                </tr>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">
                    {exchangeWiseMarketStatistics?.[0].exchange}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {numberToMillionsString(
                      exchangeWiseMarketStatistics?.[0].avgTurnover,
                    )}
                  </td>
                </tr>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">DSE+CSE</td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {numberToMillionsString(
                      exchangeWiseMarketStatistics.reduce(
                        (sum: any, item: { avgTurnover: any }) =>
                          sum + item.avgTurnover,
                        0,
                      ),
                    )}
                  </td>
                </tr>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">LBSL</td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {numberToMillionsString(
                      exchangeWiseMarketStatistics.reduce(
                        (sum: any, item: { lbslAvgTurnover: any }) =>
                          sum + item.lbslAvgTurnover,
                        0,
                      ),
                    )}
                  </td>
                </tr>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">
                    {SelectedRegion
                      ? SelectedRegion +
                        (SelectedBranch ? " (" + SelectedBranch + ")" : "")
                      : "ALL"}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(branchAvgSum)}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
          <CardFooter className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-bl-lg rounded-br-lg">
            <div className=" text-white text-center font-semibold text-lg">
              Total Trading Days:&nbsp;
              {exchangeWiseMarketStatistics?.[0].tradeDay}
            </div>
          </CardFooter>
        </Card>

        {/* Total Turnover */}
        <Card className="w-full shadow-md bg-[#0e5e6f] pb-0">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 py-2 rounded-tl-lg rounded-tr-lg text-white">
            <CardTitle className="text-base font-semibold">
              Total Turnover — Value (mn)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm rounded-bl-lg rounded-br-lg overflow-hidden">
              <tbody>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">
                    {exchangeWiseMarketStatistics?.[1].exchange}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {numberToMillionsString(
                      exchangeWiseMarketStatistics?.[1].totalTurnover || 0,
                    )}
                  </td>
                </tr>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">
                    {exchangeWiseMarketStatistics?.[0].exchange}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {numberToMillionsString(
                      exchangeWiseMarketStatistics?.[0].totalTurnover || 0,
                    )}
                  </td>
                </tr>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">
                    LBSL {exchangeWiseMarketStatistics?.[1].exchange}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {numberToMillionsString(
                      exchangeWiseMarketStatistics?.[1].lbslTotalTurnover || 0,
                    )}
                  </td>
                </tr>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">
                    LBSL {exchangeWiseMarketStatistics?.[0].exchange}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {numberToMillionsString(
                      exchangeWiseMarketStatistics?.[0].lbslTotalTurnover || 0,
                    )}
                  </td>
                </tr>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">LBSL (DSE+CSE)</td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {numberToMillionsString(
                      exchangeWiseMarketStatistics.reduce(
                        (sum: any, item: { lbslTotalTurnover: any }) =>
                          sum + item.lbslTotalTurnover,
                        0,
                      ),
                    )}
                  </td>
                </tr>
                <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                  <td className="px-4 py-2 font-medium">
                    {SelectedRegion
                      ? SelectedRegion +
                        (SelectedBranch ? " (" + SelectedBranch + ")" : "")
                      : "ALL"}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">{numberToMillionsString(branchTotalSum)}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Market Share + Regional Contribution */}
        <div className="space-y-6">
          {/* Market Share */}
          <Card className="w-full shadow-md bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg text-white">
              <CardTitle className="text-base font-semibold">
                Market Share (%)
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <table className="w-full text-sm rounded-bl-lg rounded-br-lg overflow-hidden">
                <tbody>
                  <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                    <td className="px-4 py-2 font-medium">LBSL to DSE</td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {(
                        ((exchangeWiseMarketStatistics?.[1].lbslTotalTurnover /
                          exchangeWiseMarketStatistics?.[1].totalTurnover) *
                          100) /
                        2
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr className="even:bg-green-100 odd:bg-green-50 border-b">
                    <td className="px-4 py-2 font-medium">LBSL to CSE</td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {(
                        ((exchangeWiseMarketStatistics?.[0].lbslTotalTurnover /
                          exchangeWiseMarketStatistics?.[0].totalTurnover) *
                          100) /
                        2
                      ).toFixed(2)}
                    </td>
                  </tr>
                    <tr className="bg-green-50 border-b">
                    <td className="px-4 py-2 font-medium">
                      
                     LBSL Total
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                          {exchangeWiseMarketStatistics?.[1].totalTurnover+exchangeWiseMarketStatistics?.[0].totalTurnover > 0
                          ? ((((exchangeWiseMarketStatistics?.[1].lbslTotalTurnover + exchangeWiseMarketStatistics?.[0].lbslTotalTurnover) / (exchangeWiseMarketStatistics?.[1].totalTurnover + exchangeWiseMarketStatistics?.[0].totalTurnover)) * 100)/2).toFixed(2)
                          : "0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Regional Contribution */}
          <Card className="w-full shadow-md bg-[#0e5e6f]">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg text-white">
              <CardTitle className="text-base font-semibold">
                Regional Contribution
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <table className="w-full text-sm rounded-bl-lg rounded-br-lg overflow-hidden">
                <tbody>
                  <tr className="bg-green-50 border-b">
                    <td className="px-4 py-2 font-medium">
                      LBSL vs{" "}
                      {SelectedRegion
                        ? SelectedRegion +
                          (SelectedBranch ? " (" + SelectedBranch + ")" : "")
                        : "ALL"}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                        {regionalContributionPercent.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Card>
  );
}
