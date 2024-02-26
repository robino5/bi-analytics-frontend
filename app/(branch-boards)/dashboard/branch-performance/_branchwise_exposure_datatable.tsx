export interface WrapperObjectType {
  investors: number;
  exposureRatio: string;
}

export interface BranchWiseExposureTableDataType {
  branchName: string;
  exposures: {
    green: WrapperObjectType;
    yellow: WrapperObjectType;
    red: WrapperObjectType;
  };
}

interface Props {
  records: BranchWiseExposureTableDataType[];
}

export default function BranchWiseExposureDataTable({ records }: Props) {
  return (
    <table className="w-full text-sm text-left text-gray-500 border-collapse rtl:text-right dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th rowSpan={2} className="p-1 border">
            Branch
          </th>
          <th colSpan={2} className="text-center border">
            Green <br /> (100% and above)
          </th>
          <th colSpan={2} className="text-center border">
            Yellow <br /> (50% and Below 100%)
          </th>
          <th colSpan={2} className="text-center border">
            Red <br /> (Less than 50%)
          </th>
        </tr>
        <tr>
          <th className="text-center border">No. of code</th>
          <th className="text-center border">% ratio</th>
          <th className="text-center border">No. of code</th>
          <th className="text-center border">% ratio</th>
          <th className="text-center border">No. of code</th>
          <th className="text-center border">% ratio</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr
            key={index}
            className="text-[0.7rem] lg:text-[0.8rem] border odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="p-1 border">{record.branchName}</td>
            <td className="text-center border">
              {record.exposures.green.investors}
            </td>
            <td className="text-center border">
              {record.exposures.green.exposureRatio}
            </td>
            <td className="text-center border">
              {record.exposures.yellow.investors}
            </td>
            <td className="text-center border">
              {record.exposures.yellow.exposureRatio}
            </td>
            <td className="text-center border">
              {record.exposures.red.investors}
            </td>
            <td className="text-center border">
              {record.exposures.red.exposureRatio}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
