"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { RMAuctionInfo, RMOffMarketInfo } from "@/types/rmPerformance";

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey) || 0);
  return numberToMillionsString(amount);
};

export const RMAuctionDataColumns: ColumnDef<RMAuctionInfo>[] = [
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "rmName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RM Name" />
    ),
  },
  {
    accessorKey: "auctionFund",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Turnover"
      />
    ),
    cell: ({ row }) => {
      return (
        <div
          className={cn("text-right ml-4", {
            "text-red-600": (row.getValue("auctionFund") as number) < 0,
          })}
        >
          {cellNumberFormatter(row, "auctionFund")}
        </div>
      );
    },
  },
  {
    accessorKey: "auctionIncome",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Income"
      />
    ),
    cell: ({ row }) => {
      return (
        <div
          className={cn("text-right ml-4", {
            "text-red-600": (row.getValue("auctionIncome") as number) < 0,
          })}
        >
          {cellNumberFormatter(row, "auctionIncome")}
        </div>
      );
    },
  }
];

export const RMOffMarketDataColumns: ColumnDef<RMOffMarketInfo>[] = [
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "rmName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RM Name" />
    ),
  },
  {
    accessorKey: "offMarketFund",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Turnover"
      />
    ),
    cell: ({ row }) => {
      return (
        <div
          className={cn("text-right ml-4", {
            "text-red-600": (row.getValue("offMarketFund") as number) < 0,
          })}
        >
          {cellNumberFormatter(row, "offMarketFund")}
        </div>
      );
    },
  },
  {
    accessorKey: "offMarketIncome",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="place-content-center"
        column={column}
        title="Income"
      />
    ),
    cell: ({ row }) => {
      return (
        <div
          className={cn("text-right ml-4", {
            "text-red-600": (row.getValue("offMarketIncome") as number) < 0,
          })}
        >
          {cellNumberFormatter(row, "offMarketIncome")}
        </div>
      );
    },
  }
];
