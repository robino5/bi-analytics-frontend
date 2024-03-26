"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
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
  const amount = parseFloat(row.getValue(accessorKey));
  return (
    <div
      className={cn("text-center font-medium ", {
        "text-red-600": amount < 0,
      })}
    >
      {numberToMillionsString(amount)}
    </div>
  );
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
      return cellNumberFormatter(row, "tpv");
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
      return cellNumberFormatter(row, "totalClients");
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
      return cellNumberFormatter(row, "fundIn");
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
      return cellNumberFormatter(row, "fundWithdrawl");
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
      return cellNumberFormatter(row, "netFundflow");
    },
  },
];
export const branchWiseTurnoverColumns: ColumnDef<ITurnoverStatus>[] = [
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "turnoverDaily",
    header: ({ column }) => (
      <DataTableColumnHeader
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
      <DataTableColumnHeader
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
      <DataTableColumnHeader
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
      <DataTableColumnHeader
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
