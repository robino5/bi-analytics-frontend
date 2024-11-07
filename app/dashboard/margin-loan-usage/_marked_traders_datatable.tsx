"use client";

import { numberToMillionsString, successResponse } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IMarkedClient } from "@/types/marginLoanUsage";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { IResponse } from "@/types/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MarkedTradersDataType {
  code: number;
  investorName: string;
  ledgerBalance: number;
  rmName: string;
}

interface Props {
  kind: keyof MarkedTraderPayloadType;
  branch?: string;
}

export type MarkedTraderPayloadType = {
  red: MarkedTradersDataType[];
  yellow: MarkedTradersDataType[];
  green: MarkedTradersDataType[];
};

async function fetchMarkedTraders(
  kind: keyof MarkedTraderPayloadType,
  session: Session | null,
  branch?: string
): Promise<IMarkedClient[]> {
  let url;
  if (branch) {
    url = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/zonewise-investors/?investor_type=${kind}&branch=${branch}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/zonewise-investors/?investor_type=${kind}`;
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = (await response.json()) as IResponse<IMarkedClient[]>;
  if (successResponse(result.status)) {
    return result.data;
  }
  throw Error(`Marked data fetching error`);
}

export default function MarkedTraderDataTable({ kind, branch }: Props) {
  const { data: session } = useSession();

  const [records, setRecords] = useState<IMarkedClient[]>([]);
  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetchMarkedTraders(kind, session, branch);
      setRecords(response);
    };
    fetchClients();
  }, []);
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-blue-500 hover:bg-blue-700">
          <TableHead className="w-auto text-white font-bold">Code</TableHead>
          <TableHead className="text-left text-white font-bold">Investor Name</TableHead>
          <TableHead className="text-right text-white font-bold">Ledger Balance</TableHead>
          <TableHead className="text-right text-white font-bold">RM</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record,index) => (
          <TableRow
            key={record.investorCode}
            className={`${
              index % 2 === 0 ? "bg-pink-200" : "bg-yellow-200"
            } hover:bg-green-300 transition-all duration-300`}
          >
            <TableCell className="font-medium py-1">
              {record.investorCode}
            </TableCell>
            <TableCell className="py-1 text-left">
              {record.investorName}
            </TableCell>
            <TableCell className="py-1 text-right">
              {numberToMillionsString(record.ledgerBalance)}
            </TableCell>
            <TableCell className="py-1 text-left">{record.rmName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
