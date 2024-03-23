"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./_clientTableHeader";

export type RMClientDataType = {
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

export const rmWiseClientsColumns: ColumnDef<RMClientDataType>[] = [
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
