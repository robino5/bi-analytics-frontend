"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";

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

export const branchWiseFundColumns: ColumnDef<BranchWiseFundDataType>[] = [
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
    accessorKey: "clients",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Total Clients"
      />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "clients");
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
    accessorKey: "fundWidthdrawn",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Fund Withdraw"
      />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "fundWidthdrawn");
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
export const branchWiseTurnoverColumns: ColumnDef<BranchWiseTurnoverDataType>[] =
  [
    {
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch" />
      ),
    },
    {
      accessorKey: "daily",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="place-content-center"
          column={column}
          title="Daily"
        />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "daily");
      },
    },
    {
      accessorKey: "weekly",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="place-content-center"
          column={column}
          title="Weekly"
        />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "weekly");
      },
    },
    {
      accessorKey: "monthly",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="place-content-center"
          column={column}
          title="Monthly"
        />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "monthly");
      },
    },
    {
      accessorKey: "yearly",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="place-content-center"
          column={column}
          title="Yearly"
        />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "yearly");
      },
    },
  ];
