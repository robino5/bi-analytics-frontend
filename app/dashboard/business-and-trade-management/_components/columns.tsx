"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../_components/salable-stock/data-table-column-header";
import {
  CompanyWiseTotalSelableStock,
  SelableStockPercentage,
  InvestorWiseTotalSelableStock,
} from "@/types/businessTradManagement";
import { Badge } from "@/components/ui/badge";

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
      className={cn("text-right font-medium ", {
        "text-red-600": amount < 0,
      })}
    >
      {numberToMillionsString(amount)}
    </div>
  );
};

export const companyWiseSalableStock: ColumnDef<CompanyWiseTotalSelableStock>[] =
  [
    {
      accessorKey: "companyName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company Name" />
      ),
    },
    {
      accessorKey: "stockAvailable",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Saleable Qty" />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "stockAvailable");
      },
    },
    {
      id: "gsecFlag",
      accessorKey: "gsecFlag",
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableHiding: true, 
      meta: {
        isVisible: false, 
      },
    },
  ];

export const SalableStockPercentage: ColumnDef<SelableStockPercentage>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company Name" />
    ),
  },
  {
    accessorKey: "branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch Name" />
    ),
  },
  {
    accessorKey: "stockAvailable",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qty" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "stockAvailable");
    },
  },
  {
    accessorKey: "stockAvailablePercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="(%)" />
    ),
    cell: ({ row }) => {
      return cellNumberFormatter(row, "stockAvailablePercentage");
    },
  },
 
];

export const InvestorWiseSalableStock: ColumnDef<InvestorWiseTotalSelableStock>[] =
  [
    {
      accessorKey: "companyName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company Name" />
      ),
    },
    {
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Branch Name" />
      ),
    },
    {
      accessorKey: "investorCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Investor Code" />
      ),
    },
    {
      accessorKey: "clientName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Client Name" />
      ),
    },
    {
      accessorKey: "rmName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="RM Name" />
      ),
    },
    {
      accessorKey: "stockAvailable",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Saleable Qty" />
      ),
      cell: ({ row }) => {
        return cellNumberFormatter(row, "stockAvailable");
      },
    },
  ];
