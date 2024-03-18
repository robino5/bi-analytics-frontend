import { cn, numberToMillionsString } from "@/lib/utils";

export interface MarginTableDataType {
  branchName: string;
  marginUsed: number;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

interface Props {
  records: MarginTableDataType[];
}

export default function BranchWiseMarginDataTable({ records }: Props) {
  return (
    <table className="w-full text-sm text-left text-gray-500 border-collapse rtl:text-right dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr className="border">
          <th className="px-1 border " rowSpan={2}>
            Branch
          </th>
          <th className="px-1 text-center border" rowSpan={2}>
            Margin Used
          </th>
          <th className="px-1 text-center border" colSpan={4}>
            Turnover of Margin Clients
          </th>
        </tr>
        <tr>
          <th className="px-2 text-center border">Daily</th>
          <th className="px-2 text-center border">Weekly</th>
          <th className="px-2 text-center border">Monthly</th>
          <th className="px-2 text-center border">Yearly</th>
        </tr>
      </thead>
      <tbody className="border">
        {records.map((record, index) => (
          <tr
            key={index}
            className="text-[0.7rem] lg:text-[0.8rem] border odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-1 border">{record.branchName}</td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.marginUsed < 0,
                }
              )}
            >
              {numberToMillionsString(record.marginUsed)}
            </td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.daily < 0,
                }
              )}
            >
              {numberToMillionsString(record.daily)}
            </td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.weekly < 0,
                }
              )}
            >
              {numberToMillionsString(record.weekly)}
            </td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.monthly < 0,
                }
              )}
            >
              {numberToMillionsString(record.monthly)}
            </td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.yearly < 0,
                }
              )}
            >
              {numberToMillionsString(record.yearly)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
