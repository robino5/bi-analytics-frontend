"use client";

import { numberToMillionsString, successResponse } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IMarkedClient } from "@/types/marginLoanUsage";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface MarkedTradersDataType {
  code: number;
  investorName: string;
  ledgerBalance: number;
  rmName: string;
}

interface Props {
  kind: keyof MarkedTraderPayloadType;
}

export type MarkedTraderPayloadType = {
  red: MarkedTradersDataType[];
  yellow: MarkedTradersDataType[];
  green: MarkedTradersDataType[];
};

async function fetchMarkedTraders(
  kind: keyof MarkedTraderPayloadType,
  session: Session | null
): Promise<IMarkedClient[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/zonewise-investors/?investor_type=${kind}`,
    {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const result = (await response.json()) as IResponse<IMarkedClient[]>;
  if (successResponse(result.status)) {
    return result.data;
  }
  throw Error(`Marked data fetching error`);
}

export default function MarkedTraderDataTable({ kind }: Props) {
  const { data: session } = useSession();

  const [records, setRecords] = useState<IMarkedClient[]>([]);
  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetchMarkedTraders(kind, session);
      setRecords(response);
    };
    fetchClients();
  }, []);

  return (
    <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
