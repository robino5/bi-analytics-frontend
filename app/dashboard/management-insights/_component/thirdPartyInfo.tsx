import { numberToMillionsString } from "@/lib/utils";

export default function ThirdPartyInfo({ thirdPartyInfo }: { thirdPartyInfo: any }) {
  return (

        <table className="w-full border-collapse rounded-lg overflow-hidden">
          
          {/* Main Table Header */}
          <thead>
            <tr>
              <th
                colSpan={2}
                className="bg-green-300 text-center font-semibold py-2 border border-teal-700"
              >
                Total Busi. Aggregator
              </th>
              <th className="bg-green-300 text-center font-bold border border-teal-700 text-xl">
                {thirdPartyInfo?.totalParty || 0}
              </th>
            </tr>

            {/* Sub Header */}
            <tr>
              <th className="bg-yellow-200 text-center py-2 border border-teal-600">
                No of Client
              </th>
              <th className="bg-yellow-200 text-center py-2 border border-teal-600">
                Turnover
              </th>
              <th className="bg-yellow-200  text-center py-2 border border-teal-600">
                Net Commission
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr className="bg-yellow-100">
              <td className="text-center font-semibold py-2 border border-teal-700">
                {thirdPartyInfo?.totalInvestor || 0}
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(
                  thirdPartyInfo?.totalTurnover || 0
                )}
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(
                  thirdPartyInfo?.totalCommission || 0
                )}
              </td>
            </tr>
          </tbody>
        </table>

  );
}
