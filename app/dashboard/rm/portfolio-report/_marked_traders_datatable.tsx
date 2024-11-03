"use client";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { IMarkedClient } from "@/types/rmPortfolio";

interface Props {
  records: IMarkedClient[];
  clientType:string;
}

export default function MarkedTraderDataTable({ records,clientType }: Props) {
  return (
    <table className="w-full overflow-y-auto text-sm text-left ">
      <thead className="text-xs uppercase ">
        <tr className="bg-blue-500 hover:bg-blue-700">
          <th scope="col" className="px-6 py-3 text-white font-bold">
            Code
          </th>
          <th scope="col" className="px-6 py-3 text-white font-bold">
            Investor Name
          </th>
          <th scope="col" className="px-6 py-3 text-white font-bold">
            Ledger Balance
          </th>
          <th scope="col" className="px-6 py-3 text-white font-bold">
            RM
          </th>
        </tr>
      </thead>
      <tbody>
        {records?.map((record, index) => (
          <tr
            key={record.investorCode}
            className={`${clientType=="red"?
              (index % 2 === 0 ? "bg-red-300" : "bg-red-400"):(index % 2 === 0 ? "bg-yellow-300" : "bg-yellow-400")
            } ${clientType=="red"?"hover:bg-red-100 transition-all duration-300":"hover:bg-yellow-100 transition-all duration-300"}`}
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
                "text-green-500": record.ledgerBalance < 0,
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
