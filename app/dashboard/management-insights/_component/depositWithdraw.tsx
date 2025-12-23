import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberToMillionsString } from "@/lib/utils";

export default function DepositWithdrawInfo({ depositWithdraw }: { depositWithdraw: any }) {
  return (
    
        <table className="w-full border-collapse rounded-lg overflow-hidden">

          {/* Main Table Header */}
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-700">
              <th className="text-white text-center py-2 border border-teal-600">
                Particular
              </th>
              <th className="text-white text-center py-2 border border-teal-600">
                Amount
              </th>
            </tr>
          </thead>

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
  
  );
}
