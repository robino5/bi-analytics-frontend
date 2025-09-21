"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./_clientTableHeader";
import { IClientDetail } from "@/types/rmPerformance";

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey));
  return numberToMillionsString(amount);
};

export const rmWiseClientsColumns: ColumnDef<IClientDetail>[] = [
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
    accessorKey: "tpv",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Portfolio Value" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("tpv") as number < 0,
      })}>{cellNumberFormatter(row, "tpv")}</div >;
    },
  },
  {
    accessorKey: "cv",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cost Value" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("cv") as number < 0,
      })}>{cellNumberFormatter(row, "cv")}</div >;
    },
  },
  {
    accessorKey: "availableCashBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cash Amount" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("availableCashBalance") as number < 0,
      })}>{cellNumberFormatter(row, "availableCashBalance")}</div >;
    },
  },
  {
    accessorKey: "loanBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Margin amount" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("loanBalance") as number < 0,
      })}>{cellNumberFormatter(row, "loanBalance")}</div >;
    },
  },
  {
    accessorKey: "equity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equity" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("equity") as number < 0,
      })}>{cellNumberFormatter(row, "equity")}</div >;
    },
  },
  {
    accessorKey: "exposureOnEquity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exposure on Equity" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("exposureOnEquity") as number < 0,
      })}>{cellNumberFormatter(row, "exposureOnEquity")}</div >;
    },
  },
  {
    accessorKey: "dailyTurnover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Daily TO" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("dailyTurnover") as number < 0,
      })}>{cellNumberFormatter(row, "dailyTurnover")}</div >;
    },
  },
  {
    accessorKey: "weeklyTurnover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weekly TO" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("weeklyTurnover") as number < 0,
      })}>{cellNumberFormatter(row, "weeklyTurnover")}</div >;
    },
  },
  {
    accessorKey: "fortnightlyTurnover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fortnightly TO" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("fortnightlyTurnover") as number < 0,
      })}>{cellNumberFormatter(row, "fortnightlyTurnover")}</div >;
    },
  },
  {
    accessorKey: "monthlyTurnover",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monthly TO" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("monthlyTurnover") as number < 0,
      })}>{cellNumberFormatter(row, "monthlyTurnover")}</div >;
    },
  },
];
