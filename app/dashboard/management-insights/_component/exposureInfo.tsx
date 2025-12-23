export default function ExposureInfo({ exposureInfo }: { exposureInfo: any }) {
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
                {exposureInfo?.detail?.sumOfTotalGreen || 0}
              </td>
              <td className="bg-yellow-200 text-center py-2 border border-teal-700">
                {exposureInfo?.detail?.sumOfTotalYellow || 0}
              </td>
              <td className="bg-red-200 text-center py-2 border border-teal-700">
                {exposureInfo?.detail?.sumOfMarginRed || 0}
              </td>
              <td className="bg-purple-200 text-center py-2 border border-teal-700">
                {exposureInfo?.detail?.sumOfNegativeEquity || 0}
              </td>
            </tr>
          </tbody>

        </table>
  );
}
