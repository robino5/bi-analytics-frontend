"use client";

import { Button } from "@/components/ui/button";
import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";

export type MarginLoanAllocationDataType = {
  name: string;
  amount: number;
};

export type ExposureControllingDataType = {
  exposure: string;
  investors: number;
  loanAmount: number;
};

export type NetTradeRmWiseDataType = {
  branch: string;
  code: string;
  openingBalance: number;
  endingBalance: number;
  netTrade: number;
  rmName: string;
};

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

export const marginLoanAllocationColumns: ColumnDef<MarginLoanAllocationDataType>[] =
  [
    {
      accessorKey: "name",
      header: "Particular Type",
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        return cellNumberFormatter(row, "amount");
      },
    },
  ];

export const exposureControllingColumns: ColumnDef<ExposureControllingDataType>[] =
  [
    {
      accessorKey: "exposure",
      header: () => <div className="text-start">Exposure</div>,
    },
    {
      accessorKey: "investors",
      header: () => <div className="text-right">Investors</div>,
      cell: ({ row }) => {
        return cellNumberFormatter(row, "investors");
      },
    },
    {
      accessorKey: "loanAmount",
      header: () => <div className="text-right">Loan Amount</div>,
      cell: ({ row }) => {
        return cellNumberFormatter(row, "loanAmount");
      },
    },
  ];

export const netTradeRmWiseColumns: ColumnDef<NetTradeRmWiseDataType>[] = [
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },
  {
    accessorKey: "openingBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Opening Balance" />
    ),
  },
  {
    accessorKey: "endingBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ending Balance" />
    ),
  },
  {
    accessorKey: "netTrade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net Trade/Net Change" />
    ),
  },
  {
    accessorKey: "rmName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RM" />
    ),
  },
];
