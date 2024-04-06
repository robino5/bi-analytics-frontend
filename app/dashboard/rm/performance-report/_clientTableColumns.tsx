"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./_clientTableHeader";
import { IClientDetail } from "@/types/rmPerformance";

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey));
  return (
    <div
      className={cn("text-right font-medium ", {
        "text-red-600": amount < 0,
      })}
    >
      {numberToMillionsString(amount)}
    </div>
  );
};

export const rmWiseClientsColumns: ColumnDef<IClientDetail>[] = [
  {
    accessorKey: "investorCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Investor Code" />
    ),
  },
  {
    accessorKey: "joinHolderName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Investor Name" />
    ),
  },
  {
    accessorKey: "tpv",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Portfolio Value" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "tpv");
    },
  },
  {
    accessorKey: "cv",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost Value" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "cv");
    },
  },
  {
    accessorKey: "availableCashBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cash Amount" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "availableCashBalance");
    },
  },
  {
    accessorKey: "loanBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Margin amount" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "loanBalance");
    },
  },
  {
    accessorKey: "equity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equity" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "equity");
    },
  },
  {
    accessorKey: "exposureOnEquity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exposure on Equity" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "exposureOnEquity");
    },
  },
  {
    accessorKey: "dailyTurnover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Daily TO" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "dailyTurnover");
    },
  },
  {
    accessorKey: "weeklyTurnover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weekly TO" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "weeklyTurnover");
    },
  },
  {
    accessorKey: "fortnightlyTurnover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fortnightly TO" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "fortnightlyTurnover");
    },
  },
  {
    accessorKey: "monthlyTurnover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monthly TO" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "monthlyTurnover");
    },
  },
];
