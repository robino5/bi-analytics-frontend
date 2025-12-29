import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { numberToMillionsString } from "@/lib/utils";

const BusinessPerformance = (businessPerformance: { businessPerformance: any }) => {
    return (
        <Card className="border border-gray-300 bg-[#0e5e6f] ">
            <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2">
                <CardTitle className="text-base font-semibold text-white">
                    Business Performance
                </CardTitle>
            </CardHeader>
            <CardContent className="p-3 overflow-auto max-h-[600px]">
                <table className="w-full border border-gray-300 text-sm">
                    <thead>
                        {/* First header row */}
                        <tr>
                            <th
                                rowSpan={2}
                                className="border border-gray-300 bg-violet-400 px-3 py-2 text-center font-semibold"
                            >
                                Branch
                            </th>

                            <th
                                colSpan={3}
                                className="border border-gray-300 bg-yellow-400 px-3 py-2 text-center font-semibold"
                            >
                                Turnover
                            </th>

                            <th
                                colSpan={4}
                                className="border border-gray-300 bg-blue-400 px-3 py-2 text-center font-semibold text-white"
                            >
                                Fund
                            </th>

                            <th
                                colSpan={3}
                                className="border border-gray-300 bg-green-400 px-3 py-2 text-center font-semibold"
                            >
                                BO
                            </th>

                            <th
                                rowSpan={2}
                                className="border border-lime-400 bg-lime-300 px-3 py-2 text-center font-semibold"
                            >
                                Total Expenses<br />(mn)
                            </th>

                            <th
                                rowSpan={2}
                                className="border border-gray-300 bg-emerald-500 px-3 py-2 text-center font-semibold"
                            >
                                P/L (mn)
                            </th>
                        </tr>

                        {/* Second header row */}
                        <tr>
                            {/* Turnover */}
                            <th className="border border-gray-300 bg-yellow-200 px-2 py-2 text-center">
                                Target (mn)
                            </th>
                            <th className="border border-gray-300 bg-yellow-200 px-2 py-2 text-center">
                                Turnover Achieved (mn)
                            </th>
                            <th className="border border-gray-300 bg-yellow-200 px-2 py-2 text-center">
                                Turnover Percentage (%)
                            </th>

                            {/* Fund */}
                            <th className="border border-gray-300 bg-blue-200 px-2 py-2 text-center">
                                Fund Target (mn)
                            </th>
                            <th className="border border-gray-300 bg-blue-200 px-2 py-2 text-center">
                                Net Fund collected (mn)
                            </th>
                            <th className="border border-gray-300 bg-blue-200 px-2 py-2 text-center">
                                NetLink Share (mn)
                            </th>
                            <th className="border border-gray-300 bg-blue-200 px-2 py-2 text-center">
                                Fund Target (%)
                            </th>

                            {/* BO */}
                            <th className="border border-gray-300 bg-green-200 px-2 py-2 text-center">
                                BO opening Target
                            </th>
                            <th className="border border-gray-300 bg-green-200 px-2 py-2 text-center">
                                BO opened
                            </th>
                            <th className="border border-gray-300 bg-green-200 px-2 py-2 text-center">
                                Percentage (%)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {businessPerformance.businessPerformance?.map(
                            (item: any, index: number) => {
                                const isEven = index % 2 === 0;

                                return (
                                    <tr
                                        key={index}
                                        className="transition-colors hover:bg-gray-100"
                                    >
                                        {/* Branch */}
                                        <td className={`border border-gray-300 px-2 py-2 text-center font-medium
            ${isEven ? "bg-violet-200" : "bg-violet-300"}`}>
                                            {item.branchName}
                                        </td>

                                        {/* Turnover */}
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-yellow-100" : "bg-yellow-200"}`}>
                                            {numberToMillionsString(item.target)}
                                        </td>
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-yellow-100" : "bg-yellow-200"}`}>
                                            {numberToMillionsString(item.turnoverAchieved)}
                                        </td>
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-yellow-100" : "bg-yellow-200"}`}>
                                            {item.turnoverPercentage.toFixed(2)}
                                        </td>

                                        {/* Fund */}
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-blue-100" : "bg-blue-200"}`}>
                                            {numberToMillionsString(item.fundTarget)}
                                        </td>
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-blue-100" : "bg-blue-200"}`}>
                                            {numberToMillionsString(item.totalNetFund)}
                                        </td>
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-blue-100" : "bg-blue-200"}`}>
                                            {numberToMillionsString(item.totalNetLinkShare)}
                                        </td>
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-blue-100" : "bg-blue-200"}`}>
                                            {item.fundPercentage.toFixed(2)}
                                        </td>

                                        {/* BO */}
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-green-100" : "bg-green-200"}`}>
                                            {item.boOpeningTarget}
                                        </td>
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-green-100" : "bg-green-200"}`}>
                                            {item.boOpened}
                                        </td>
                                        <td className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-green-100" : "bg-green-200"}`}>
                                            {item.boPercentage.toFixed(2)}
                                        </td>

                                        {/* Total Expenses */}
                                        <td className={`border border-lime-400 px-2 py-2 text-center font-semibold
            ${isEven ? "bg-lime-100" : "bg-lime-200"}`}>
                                            {numberToMillionsString(item.totalExpenses)}
                                        </td>

                                        {/* P/L */}
                                        <td
                                            className={`border border-gray-300 px-2 py-2 text-center font-bold
              ${item.profitLoss >= 0
                                                    ? isEven
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-emerald-200 text-emerald-800"
                                                    : isEven
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-red-200 text-red-800"
                                                }`}
                                        >
                                            {numberToMillionsString(item.profitLoss)}
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>

                </table>
            </CardContent>
        </Card>
    )
};

export default BusinessPerformance;