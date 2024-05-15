import { cn, numberToMillionsString } from "@/lib/utils";

export interface BranchWiseFundDataType {
  branchName: string;
  tpv: number;
  clients: number;
  fundIn: number;
  fundWidthdrawn: number;
  netFundflow: number;
}

interface Props {
  records: BranchWiseFundDataType[];
}

export default function BranchWiseFundDataTable({ records }: Props) {
  return (
    <table className="w-full text-sm text-left">
      <thead className="text-xs uppercase">
        <tr>
          <th scope="col" className="px-6 py-3">
            Branch
          </th>
          <th scope="col" className="px-6 py-3">
            Total Portfolio Value
          </th>
          <th scope="col" className="px-6 py-3">
            Total Clients
          </th>
          <th scope="col" className="px-6 py-3">
            Fund In
          </th>
          <th scope="col" className="px-6 py-3">
            Fund Withdraw
          </th>
          <th scope="col" className="px-6 py-3">
            Net Fund Inflow/(Outflow)
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
                "text-red-500": record.tpv < 0,
              })}
            >
              {numberToMillionsString(record.tpv)}
            </td>
            <td
              className={cn("px-6 py-1 font-[0.8rem] sm:font-[0.8rem]", {
                "text-red-500": record.clients < 0,
              })}
            >
              {numberToMillionsString(record.clients)}
            </td>
            <td
              className={cn("px-6 py-1 font-[0.8rem] sm:font-[0.7rem]", {
                "text-red-500": record.fundIn < 0,
              })}
            >
              {numberToMillionsString(record.fundIn)}
            </td>
            <td
              className={cn("px-6 py-1 font-[0.8rem] sm:font-[0.7rem]", {
                "text-red-500": record.fundWidthdrawn < 0,
              })}
            >
              {numberToMillionsString(record.fundWidthdrawn)}
            </td>
            <td
              className={cn("px-6 py-1 font-[0.8rem] sm:font-[0.7rem]", {
                "text-red-500": record.netFundflow < 0,
              })}
            >
              {numberToMillionsString(record.netFundflow)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
