"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { INetTradeClient } from "@/types/marginLoanUsage";

export type MarginLoanAllocationDataType = {
  name: string;
  amount: number;
};

export type ExposureControllingDataType = {
  exposure: string;
  investors: number;
  loanAmount: number;
};

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey));
  return numberToMillionsString(amount);
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

export const netTradeRmWiseColumns: ColumnDef<INetTradeClient>[] = [
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      return <div className="ml-2 text-left">{row.getValue("branchName")}</div>;
    },
  },
  {
    accessorKey: "investorCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Investor Code" />
    ),
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("investorCode")}</div>;
    },
  },
  {
    accessorKey: "rmName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RM" />
    ),
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("rmName")}</div>
    }
  },
  {
    accessorKey: "openingBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Opening Balance" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("openingBalance") as number < 0,
      })}>{cellNumberFormatter(row, "openingBalance")}</div >;
    },
  },
  {
    accessorKey: "endingBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ending Balance" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("endingBalance") as number < 0,
      })}>{cellNumberFormatter(row, "endingBalance")}</div >;
    },
  },
  {
    accessorKey: "netBuysell",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net Trade/Net Change" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("netBuysell") as number < 0,
      })}>{cellNumberFormatter(row, "netBuysell")}</div >;
    },
  },
];
