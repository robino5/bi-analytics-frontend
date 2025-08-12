"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./_investorLiveTradeTableHeader";
import { InvestorLiveTradeInfo } from "@/types/rmPerformance";

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey));
  return numberToMillionsString(amount);
};

export const investorLiveTradeClientsColumns: ColumnDef<InvestorLiveTradeInfo>[] = [
  {
    accessorKey: "investorCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Investor Code" />
    ),
    cell: ({ row }) => {
      return <div className="text-left ml-4">{row.getValue("investorCode")}</div>
    }
  },
  {
    accessorKey: "joinHolderName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Investor Name" />
    ),
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("joinHolderName")}</div>
    }
  },
    {
    accessorKey: "investorType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Client Type" />
    ),
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("investorType")}</div>
    }
  },
  {
    accessorKey: "buy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buy" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("buy") as number < 0,
      })}>{cellNumberFormatter(row, "buy")}</div >;
    },
  },
  {
    accessorKey: "sell",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sell" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("sell") as number < 0,
      })}>{cellNumberFormatter(row, "sell")}</div >;
    },
  },
   {
    accessorKey: "net",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net-amount" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("net") as number < 0,
      })}>{cellNumberFormatter(row, "net")}</div >;
    },
  },
    {
    accessorKey: "ledgerBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available Balance" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("ledgerBalance") as number < 0,
      })}>{cellNumberFormatter(row, "ledgerBalance")}</div >;
    },
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("mobile")}</div>
    },
  },
    {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("email")}</div>
    },
  },
];
