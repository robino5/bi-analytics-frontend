"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./_branchWiseNonePerformingClientTableHeader";
import { BranchWiseNonePerformClient } from "@/types/dailyTurnoverPerformance";

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey));
  return numberToMillionsString(amount);
};

export const branchWiseNonePerformingClientColumns: ColumnDef<BranchWiseNonePerformClient>[] = [
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
    accessorKey: "investorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Investor Name" />
    ),
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("investorName")}</div>
    }
  },
  {
    accessorKey: "availableBalance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Available Balance" />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("availableBalance") as number < 0,
      })}>{cellNumberFormatter(row, "availableBalance")}</div >;
    },
  },
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RM Branch" />
    ),
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("branchName")}</div>
    }
  },
  {
    accessorKey: "rmName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RM Name" />
    ),
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("rmName")}</div>
    }
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
