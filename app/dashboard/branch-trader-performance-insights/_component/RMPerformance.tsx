import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { numberToMillionsString } from "@/lib/utils";
import { Download } from "lucide-react";
import Link from "next/link";

const RMPerformance = ({ rmPerformance, branch }: {
  rmPerformance: any;
  branch: string;
}) => {
  console.log("RM Performance Data:", rmPerformance);
  const performanceArray: any[] = Array.isArray(rmPerformance)
    ? rmPerformance
    : rmPerformance?.detail || rmPerformance?.rows || [];

  const filteredRMPerformance = (performanceArray || []).filter((item: any) => {
    // only apply branch filter when a branch is selected
    if (branch && String(item.branchCode) !== String(branch)) return false;
    return true;
  });
  return (
    <Card className="border border-gray-300 bg-[#0e5e6f] ">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2">
        <div className="flex items-center w-full">
          <CardTitle className="text-base font-semibold text-white">
            Trader Performance
          </CardTitle>

          {/* <Link
            href={(() => {
              try {
                const base = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/regional-business-performance-csv/`;
                const url = new URL(base);
                if (branch) url.searchParams.append("branch_code", branch);
                return url.toString();
              } catch (e) {
                // Fallback if URL constructor fails (malformed base)
                let href = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/regional-business-performance-csv/`;
                const params: string[] = [];
                if (branch) params.push(`branch_code=${encodeURIComponent(branch)}`);
                if (params.length) href += `?${params.join("&")}`;
                return href;
              }
            })()}
            className="ml-auto flex items-center"
          >
            <Download className="h-5 w-5 text-white hover:scale-110 transition" />
          </Link> */}
        </div>
      </CardHeader>
      <CardContent className="p-3 overflow-auto ">
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            {/* First header row */}
            <tr>
              <th
                rowSpan={2}
                className="border border-gray-300 bg-violet-400 px-3 py-2 text-center font-semibold"
              >
                Trader Name
              </th>

              <th
                colSpan={2}
                className="border border-gray-300 bg-yellow-400 px-3 py-2 text-center font-semibold"
              >
                Turnover
              </th>

              <th
                colSpan={2}
                className="border border-gray-300 bg-blue-400 px-3 py-2 text-center font-semibold text-white"
              >
                Fund
              </th>

              <th
                colSpan={2}
                className="border border-gray-300 bg-green-400 px-3 py-2 text-center font-semibold"
              >
                BO
              </th>

              <th
                rowSpan={2}
                className="border border-lime-400 bg-lime-300 px-3 py-2 text-center font-semibold"
              >
                CTC Times
               
              </th>

            </tr>

            {/* Second header row */}
            <tr>
              {/* Turnover */}
              <th className="border border-gray-300 bg-yellow-200 px-2 py-2 text-center">
                Target (mn)
              </th>
              <th className="border border-gray-300 bg-yellow-200 px-2 py-2 text-center">
                Turnover Percentage (%)
              </th>

              {/* Fund */}
              <th className="border border-gray-300 bg-blue-200 px-2 py-2 text-center">
                Fund Target (mn)
              </th>
              <th className="border border-gray-300 bg-blue-200 px-2 py-2 text-center">
                Fund Target (%)
              </th>

              {/* BO */}
              <th className="border border-gray-300 bg-green-200 px-2 py-2 text-center">
                BO opening Target
              </th>
              <th className="border border-gray-300 bg-green-200 px-2 py-2 text-center">
                Percentage (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRMPerformance?.map((item: any, index: number) => {
                const isEven = index % 2 === 0;

                return (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-gray-100"
                  >
                    {/* Branch */}
                    <td
                      className={`border border-gray-300 px-2 py-2 text-center font-medium
            ${isEven ? "bg-violet-200" : "bg-violet-300"}`}
                    >
                      {item.traderId}
                    </td>

                    {/* Turnover */}
                    <td
                      className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-yellow-100" : "bg-yellow-200"}`}
                    >
                      {numberToMillionsString(item.target)}
                    </td>
                    <td
                      className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-yellow-100" : "bg-yellow-200"}`}
                    >
                      {item.turnoverPercentage.toFixed(2)}
                    </td>

                    {/* Fund */}
                    <td
                      className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-blue-100" : "bg-blue-200"}`}
                    >
                      {numberToMillionsString(item.fundTarget)}
                    </td>
                    <td
                      className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-blue-100" : "bg-blue-200"}`}
                    >
                      {item.fundPercentage.toFixed(2)}
                    </td>

                    {/* BO */}
                    <td
                      className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-green-100" : "bg-green-200"}`}
                    >
                      {item.boOpeningTarget}
                    </td>
                    <td
                      className={`border border-gray-300 px-2 py-2 text-center
            ${isEven ? "bg-green-100" : "bg-green-200"}`}
                    >
                      {item.boPercentage.toFixed(2)}
                    </td>

                    {/* Total Expenses */}
                    <td
                      className={`border border-lime-400 px-2 py-2 text-center font-semibold
            ${isEven ? "bg-lime-100" : "bg-lime-200"}`}
                    >
                      {numberToMillionsString(item.ctcDaily, 2)}
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default RMPerformance;
