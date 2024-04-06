import { cn, numberToMillionsString } from "@/lib/utils";
import { IBranchWiseMargin } from "@/types/branchPerformance";

interface Props {
  records: IBranchWiseMargin[];
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
            <td className="p-1 border text-gray-700 font-semibold">
              {record.branchName}
            </td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.loanUsed < 0,
                }
              )}
            >
              {numberToMillionsString(record.loanUsed)}
            </td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.turnoverDaily < 0,
                }
              )}
            >
              {numberToMillionsString(record.turnoverDaily)}
            </td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.turnoverWeekly < 0,
                }
              )}
            >
              {numberToMillionsString(record.turnoverWeekly)}
            </td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.turnoverMonthly < 0,
                }
              )}
            >
              {numberToMillionsString(record.turnoverMonthly)}
            </td>
            <td
              className={cn(
                "border px-1 text-[0.7rem] lg:text-[0.8rem] text-center",
                {
                  "text-red-500": record.turnoverYearly < 0,
                }
              )}
            >
              {numberToMillionsString(record.turnoverYearly)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
