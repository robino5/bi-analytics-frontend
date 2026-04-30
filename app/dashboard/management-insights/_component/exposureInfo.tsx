type exposureInfoProps = {
  exposureInfo: any;
  region: string;
  branch: string;
};
export default function ExposureInfo({ exposureInfo, region, branch }: exposureInfoProps) {
  const isArray = Array.isArray(exposureInfo);

  const get = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  };

  const filteredList = (() => {
    if (!isArray) return Array.isArray(exposureInfo?.data) ? exposureInfo.data : [];
    return exposureInfo.filter((item: any) => {
      if (region && region !== '' && region !== 'All') {
        if (String(item.regionName).trim() !== String(region).trim()) return false;
      }
      if (region && branch && branch !== '' && branch !== 'All') {
        if (String(item.branchCode || item.branch_code || item.branch).trim() !== String(branch).trim()) return false;
      }
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
    green: isArray || Array.isArray(exposureInfo?.data) ? sumField(filteredList, 'green') : exposureInfo?.green || 0,
    yellow: isArray || Array.isArray(exposureInfo?.data) ? sumField(filteredList, 'yellow') : exposureInfo?.yellow || 0,
    red: isArray || Array.isArray(exposureInfo?.data) ? sumField(filteredList, 'red') : exposureInfo?.red || 0,
    negativeEquity: isArray || Array.isArray(exposureInfo?.data) ? sumField(filteredList, 'negativeEquity') : exposureInfo?.negativeEquity || 0,
  };

  return (
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          
          {/* Main Table Header */}
          <thead>
            <tr>
              <th className="bg-green-400 text-center py-2 border border-teal-600">
                Green
              </th>
              <th className="bg-yellow-400 text-center py-2 border border-teal-600">
                Yellow
              </th>
              <th className="bg-red-400  text-center py-2 border border-teal-600">
                Red
              </th>
               <th className="bg-purple-400  text-center py-2 border border-teal-600">
                (Negative)
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr className="">
              <td className="bg-green-200 text-center font-semibold py-2 border border-teal-700">
                {totals.green || 0}
              </td>
              <td className="bg-yellow-200 text-center py-2 border border-teal-700">
                {totals.yellow || 0}
              </td>
              <td className="bg-red-200 text-center py-2 border border-teal-700">
                {totals.red || 0}
              </td>
              <td className="bg-purple-200 text-center py-2 border border-teal-700">
                {totals.negativeEquity || 0}
              </td>
            </tr>
          </tbody>

        </table>
  );
}
