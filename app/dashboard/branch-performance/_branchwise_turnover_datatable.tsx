import { cn, numberToMillionsString } from "@/lib/utils";

export interface BranchWiseTurnoverDataType {
  branchName: string;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

interface Props {
  records: BranchWiseTurnoverDataType[];
}

export default function BranchWiseTurnoverDataTable({ records }: Props) {
  return (
    <table className="w-full text-sm text-left">
      <thead className="text-xs uppercase">
        <tr>
          <th scope="col" className="px-6 py-3">
            Branch
          </th>
          <th scope="col" className="px-6 py-3">
            Daily
          </th>
          <th scope="col" className="px-6 py-3">
            Weekly
          </th>
          <th scope="col" className="px-6 py-3">
            Monthly
          </th>
          <th scope="col" className="px-6 py-3">
            Yearly
          </th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr
            key={index}
            className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              className="px-6 py-1 font-normal text-gray-900 whitespace-nowrap dark:text-white"
            >
              {record.branchName}
            </th>
            <td
              className={cn("px-6 py-1 font-[0.8rem] sm:font-[0.7rem]", {
                "text-red-500": record.daily < 0,
              })}
            >
              {numberToMillionsString(record.daily)}
            </td>
            <td
              className={cn("px-6 py-1 font-[0.8rem] sm:font-[0.8rem]", {
                "text-red-500": record.weekly < 0,
              })}
            >
              {numberToMillionsString(record.weekly)}
            </td>
            <td
              className={cn("px-6 py-1 font-[0.8rem] sm:font-[0.7rem]", {
                "text-red-500": record.monthly < 0,
              })}
            >
              {numberToMillionsString(record.monthly)}
            </td>
            <td
              className={cn("px-6 py-1 font-[0.8rem] sm:font-[0.7rem]", {
                "text-red-500": record.yearly < 0,
              })}
            >
              {numberToMillionsString(record.yearly)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
