"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";

export type IBranchWiseFund = {
  branchName: string;
  totalDeposit: number;
  totalWithdrawal: number;
};



const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey) || 0);
  return numberToMillionsString(amount);
};

export const branchWisetotalFundColumns: ColumnDef<IBranchWiseFund>[] = [
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "totalDeposit",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Deposit"
      />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("totalDeposit") as number < 0,
      })}>{cellNumberFormatter(row, "totalDeposit")}</div >;
    },
  },
  {
    accessorKey: "totalWithdrawal",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Withdrawal"
      />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("totalWithdrawal") as number < 0,
      })}>{cellNumberFormatter(row, "totalWithdrawal")}</div >;
    },
  },
];