"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableColumnHeaderTurnover } from "./data-table-column-header-turnover";
import { IBranchWiseFund, ITurnoverStatus } from "@/types/branchPerformance";

export type BranchWiseFundDataType = {
  branchName: string;
  tpv: number;
  clients: number;
  fundIn: number;
  fundWidthdrawn: number;
  netFundflow: number;
};

export type BranchWiseTurnoverDataType = {
  branchName: string;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
};

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey)||0);
  return numberToMillionsString(amount);
};

export const branchWiseFundColumns: ColumnDef<IBranchWiseFund>[] = [
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "tpv",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Total Portfolio Value"
      />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("tpv") as number < 0,
      })}>{cellNumberFormatter(row, "tpv")}</div >;
    },
  },
  {
    accessorKey: "totalClients",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Total Clients"
      />
    ),
    cell: ({ row }) => {
      return <div className="text-right ml-4">{row.getValue("totalClients")}</div >;
    },
  },
  {
    accessorKey: "fundIn",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Fund In"
      />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("fundIn") as number < 0,
      })}>{cellNumberFormatter(row, "fundIn")}</div >;
    },
  },
  {
    accessorKey: "fundWithdrawl",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Fund Withdraw"
      />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("fundWithdrawl") as number < 0,
      })}>{cellNumberFormatter(row, "fundWithdrawl")}</div >;
    },
  },
  {
    accessorKey: "netFundflow",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Net Fund Inflow/(Outflow)"
      />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("netFundflow") as number < 0,
      })}>{cellNumberFormatter(row, "netFundflow")}</div >;
    },
  },
];


export const branchWiseTurnoverColumns: ColumnDef<ITurnoverStatus>[] = [
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeaderTurnover column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "turnoverDaily",
    header: ({ column }) => (
      <DataTableColumnHeaderTurnover
        className="place-content-center"
        column={column}
        title="Daily"
      />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "turnoverDaily");
    },
  },
  {
    accessorKey: "turnoverWeekly",
    header: ({ column }) => (
      <DataTableColumnHeaderTurnover
        className="place-content-center"
        column={column}
        title="Weekly"
      />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "turnoverWeekly");
    },
  },
  {
    accessorKey: "turnoverMonthly",
    header: ({ column }) => (
      <DataTableColumnHeaderTurnover
        className="place-content-center"
        column={column}
        title="Monthly"
      />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "turnoverMonthly");
    },
  },
  {
    accessorKey: "turnoverYearly",
    header: ({ column }) => (
      <DataTableColumnHeaderTurnover
        className="place-content-center"
        column={column}
        title="Yearly"
      />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "turnoverYearly");
    },
  },
];
