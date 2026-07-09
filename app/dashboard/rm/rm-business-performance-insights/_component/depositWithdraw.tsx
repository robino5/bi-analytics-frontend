import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberToMillionsString } from "@/lib/utils";

type DepositWithdrawInfoProps = {
  depositWithdraw: any;
  region?: string;
  branch?: string;
  trader?: string;
};

export default function DepositWithdrawInfo({ depositWithdraw, region, branch, trader }: DepositWithdrawInfoProps) {
  console.log("DepositWithdrawInfo", { depositWithdraw });
  const isArray = Array.isArray(depositWithdraw);

  const get = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  const normalizeValue = (value: any) => String(value ?? '').trim();
  const isAllValue = (value: any) => {
    const normalized = normalizeValue(value).toLowerCase();
    return normalized === '' || normalized === 'all';
  };

  const hasRegionFilter = !isAllValue(region);
  const hasBranchFilter = !isAllValue(branch);
  const hasTraderFilter = !isAllValue(trader);

  const filteredList = (() => {
    const rawList = isArray ? depositWithdraw : (Array.isArray(depositWithdraw?.data) ? depositWithdraw.data : []);
    return rawList.filter((item: any) => {
      const itemRegion = normalizeValue(item.regionName);
      const itemBranch = normalizeValue(item.branchCode || item.branch_code || item.branch || item.branchName);
      const itemTrader = normalizeValue(item.traderId || item.trader_id || item.trader || item.traderName);

      if (hasRegionFilter && itemRegion !== normalizeValue(region)) return false;
      if (hasBranchFilter && itemBranch !== normalizeValue(branch)) return false;
      if (hasTraderFilter && itemTrader !== normalizeValue(trader)) return false;

      return true;
    });
  })();

  const sumField = (arr: any[], path: string) => {
    return arr.reduce((s, it) => {
      const v = get(it, path);
      const n = typeof v === 'number' ? v : Number(v || 0);
      return s + (isNaN(n) ? 0 : n);
    }, 0);
  };

  const totals = {
    totalPortfolio: sumField(filteredList, 'totalPortfolio'),
    cashAvailable: sumField(filteredList, 'cashAvailable'),
    marginNegative: sumField(filteredList, 'marginNegative'),
    totalDeposit: sumField(filteredList, 'totalDeposit'),
    totalWithdrawal: sumField(filteredList, 'totalWithdrawal'),
  };

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
                Portfolio Size (as on Date)
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(totals.totalPortfolio || 0)}
              </td>
            </tr>
            <tr className="bg-yellow-50">
              <td className="text-center font-semibold py-2 border border-teal-700">
                Cash Balance (as on Date)
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(totals.cashAvailable || 0)}
              </td>
            </tr>
            <tr className="bg-yellow-100">
              <td className="text-center font-semibold py-2 border border-teal-700">
                Margin Loan (as on Date)
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(totals.marginNegative || 0)}
              </td>
            </tr>
            <tr className="bg-yellow-50">
              <td className="text-center font-semibold py-2 border border-teal-700">

                Total Deposit
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(totals.totalDeposit || 0)}
              </td>
            </tr>
            <tr className="bg-yellow-100">
              <td className="text-center font-semibold py-2 border border-teal-700">

                Total Withdraw
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(totals.totalWithdrawal || 0)}
              </td>
            </tr>
          </tbody>

        </table>
  
  );
}
