"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import {
  BranchWiseClintsNumber,
  BranchWiseNonPerformerClints,
  DetailsMarketShareLBSL,
} from "@/types/customerManagement";

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
  return (
    <div
      className={cn("text-center font-medium ", {
        "text-red-600": amount < 0,
      })}
    >
      {numberToMillionsString(amount)}
    </div>
  );
};

export const branchWiseClintsNumber: ColumnDef<BranchWiseClintsNumber>[] = [
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Name" />
    ),
  },
  {
    accessorKey: "totalClients",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Clients" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "totalClients");
    },
  },
  {
    accessorKey: "totalClientPercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch (%)" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "totalClientPercentage");
    },
  },
];

export const branchWiseNonPerformerClints: ColumnDef<BranchWiseNonPerformerClints>[] =
  [
    {
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch Name" />
      ),
    },
    {
      accessorKey: "totalClients",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Total Non Performer Clients"
        />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "totalClients");
      },
    },
    {
      accessorKey: "totalClientPercentage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch (%)" />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "totalClientPercentage");
      },
    },
  ];

export const detailsMarketShareLBSL: ColumnDef<DetailsMarketShareLBSL>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
  },
  {
    accessorKey: "month",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Month" />
    ),
  },
  {
    accessorKey: "turnoverDse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DSE FT TurnOver" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "turnoverDse");
    },
  },
  {
    accessorKey: "turnoverLbsl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LBSL FT TurnOver" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "turnoverLbsl");
    },
  },
  {
    accessorKey: "tradePercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trade(%)" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "tradePercentage");
    },
  },
];
