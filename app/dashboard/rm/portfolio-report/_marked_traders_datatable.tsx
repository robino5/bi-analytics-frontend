"use client";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { IMarkedClient } from "@/types/rmPortfolio";

interface Props {
  records: IMarkedClient[];
}

export default function MarkedTraderDataTable({ records }: Props) {
  return (
    <table className="w-full overflow-y-auto text-sm text-left ">
      <thead className="text-xs uppercase ">
        <tr>
          <th scope="col" className="px-6 py-3">
            Code
          </th>
          <th scope="col" className="px-6 py-3">
            Investor Name
          </th>
          <th scope="col" className="px-6 py-3">
            Ledger Balance
          </th>
          <th scope="col" className="px-6 py-3">
            RM
          </th>
        </tr>
      </thead>
      <tbody>
        {records?.map((record) => (
          <tr
            key={record.investorCode}
            className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
          >
            <td
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {record.investorCode}
            </td>
            <td className="px-6 py-2">{record.investorName}</td>
            <td
              className={cn("px-6 py-2", {
                "text-red-500": record.ledgerBalance < 0,
              })}
            >
              {numberToMillionsString(record.ledgerBalance)}
            </td>
            <td className="px-6 py-2">{record.rmName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
