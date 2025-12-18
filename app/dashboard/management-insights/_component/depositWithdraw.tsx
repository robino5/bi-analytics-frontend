import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberToMillionsString } from "@/lib/utils";

export default function DepositWithdrawInfo({ depositWithdraw }: { depositWithdraw: any }) {
  return (
    <Card className="p-0 bg-[#033e4a] text-white border border-teal-800">

      {/* Card Header */}
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-700 to-teal-800 p-2 rounded-t-lg">
        <CardTitle className="text-white text-lg">
         Portfolio, Cash, Margin, Deposit & Withdraw Information
        </CardTitle>
      </CardHeader>

      <CardContent className="p-3">
        <table className="w-full border-collapse rounded-lg overflow-hidden">

          {/* Main Table Header */}
          {/* <thead>
            <tr>
              <th
                colSpan={2}
                className="bg-green-300 text-center font-semibold py-2 border border-teal-700"
              >
                Third Party
              </th>
              <th className="bg-green-300 text-center font-semibold border border-teal-700">
                {thirdPartyInfo?.detail?.sumOfTotalParty || 0}
              </th>
            </tr>

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
          </thead> */}

          {/* Table Body */}
          <tbody>
            <tr className="bg-yellow-100">
              <td className="text-center font-semibold py-2 border border-teal-700">
                Portfolio Size
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(
                  depositWithdraw?.detail?.sumOfTotalPortfolio || 0
                )}
              </td>
            </tr>
            <tr className="bg-yellow-50">
              <td className="text-center font-semibold py-2 border border-teal-700">
                Cash Balance
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(
                  depositWithdraw?.detail?.sumOfCashAvailable || 0
                )}
              </td>
            </tr>
            <tr className="bg-yellow-100">
              <td className="text-center font-semibold py-2 border border-teal-700">
                Margin Loan
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(
                  depositWithdraw?.detail?.sumOfMarginNegative || 0
                )}
              </td>
            </tr>
            <tr className="bg-yellow-50">
              <td className="text-center font-semibold py-2 border border-teal-700">

                Total Deposit
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(
                  depositWithdraw?.detail?.sumOfTotalDeposit || 0
                )}
              </td>
            </tr>
            <tr className="bg-yellow-100">
              <td className="text-center font-semibold py-2 border border-teal-700">

                Total Withdraw
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(
                  depositWithdraw?.detail?.sumOfTotalWithdrawal || 0
                )}
              </td>
            </tr>
          </tbody>

        </table>
      </CardContent>
    </Card>
  );
}
