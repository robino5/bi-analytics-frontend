"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

type InvestorLiveTopBuySaleInfo = {
  branchCode: number;
  branchName: string;
  rmName: string;
  investorCode: string;
  investorName: string;
  turnover: number;
}

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey));
  return numberToMillionsString(amount);
};

export const investorLiveBuySaleClientsColumns: ColumnDef<InvestorLiveTopBuySaleInfo>[] = [
  {
    accessorKey: "investorCode",
    header: "Investor Code",
    cell: ({ row }) => {
      return <div className="text-left ml-4">{row.getValue("investorCode")}</div>
    }
  },
  {
    accessorKey: "investorName",
    header: "Investor Name",
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("investorName")}</div>
    }
  },
  {
    accessorKey: "clientType",
    header: "Client Type",
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("clientType")}</div>
    }
  },
  {
    accessorKey: "turnover",
    header: "Turnover",
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("turnover") as number < 0,
      })}>{cellNumberFormatter(row, "turnover")}</div >;
    },
  },
  {
    accessorKey: "branchName",
    header: "RM Branch",
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("branchName")}</div>
    }
  },
  {
    accessorKey: "rmName",
    header: "RM",
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("rmName")}</div>
    }
  },
];
