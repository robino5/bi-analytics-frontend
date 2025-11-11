"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";

export type IBranchWiseFund = {
  branchName: string;
  total: number;
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
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Total"
      />
    ),
    cell: ({ row }) => {
      return <div className={cn("text-right ml-4", {
        "text-red-600": row.getValue("total") as number < 0,
      })}>{cellNumberFormatter(row, "total")}</div >;
    },
  },
];
