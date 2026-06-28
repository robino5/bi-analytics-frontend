import { numberToMillionsString } from "@/lib/utils";

type thirdPartyInfoProps = {
  thirdPartyInfo: any;
  region: string;
  branch: string;
};

export default function ThirdPartyInfo({ thirdPartyInfo, region, branch }: thirdPartyInfoProps) {
  const isArray = Array.isArray(thirdPartyInfo);

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

  const filteredList = (() => {
    const rawList = isArray ? thirdPartyInfo : (Array.isArray(thirdPartyInfo?.data) ? thirdPartyInfo.data : []);
    return rawList.filter((item: any) => {
      const itemRegion = normalizeValue(item.regionName);
      const itemBranch = normalizeValue(item.branchCode || item.branch_code || item.branch || item.branchName);

      if (hasRegionFilter && itemRegion !== normalizeValue(region)) return false;
      if (hasBranchFilter && itemBranch !== normalizeValue(branch)) return false;

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
    totalParty: isArray || Array.isArray(thirdPartyInfo?.data) ? sumField(filteredList, 'totalParty') : thirdPartyInfo?.totalParty || 0,
    totalInvestor: isArray || Array.isArray(thirdPartyInfo?.data) ? sumField(filteredList, 'totalInvestor') : thirdPartyInfo?.totalInvestor || 0,
    totalTurnover: isArray || Array.isArray(thirdPartyInfo?.data) ? sumField(filteredList, 'totalTurnover') : thirdPartyInfo?.totalTurnover || 0,
    totalCommission: isArray || Array.isArray(thirdPartyInfo?.data) ? sumField(filteredList, 'totalCommission') : thirdPartyInfo?.totalCommission || 0,
  };

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
                {totals.totalParty || 0}
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
                {totals.totalInvestor || 0}
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(totals.totalTurnover || 0)}
              </td>
              <td className="text-center py-2 border border-teal-700">
                {numberToMillionsString(totals.totalCommission || 0)}
              </td>
            </tr>
          </tbody>
        </table>

  );
}
