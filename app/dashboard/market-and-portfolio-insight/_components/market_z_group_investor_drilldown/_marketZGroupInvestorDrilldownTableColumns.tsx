"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MarketZGroupDataInvestorDrilldown } from "../../../trade-insights/types";
import { DataTableColumnHeader } from "./_marketZGroupInvestorDrilldownTableHeader";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);

export const marketZGroupInvestorDrilldownColumns: ColumnDef<MarketZGroupDataInvestorDrilldown>[] =
  [
    {
      accessorKey: "symbol",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Symbol" />
      ),
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.symbol}</div>
      ),
    },
    {
      accessorKey: "investorCode",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Investor\nCode"} />
      ),
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.investorCode}</div>
      ),
    },
    {
      accessorKey: "investorName",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Investor\nName"} />
      ),
      cell: ({ row }) => (
        <div className="max-w-[150px] whitespace-normal break-words">
          {row.original.investorName}
        </div>
      ),
    },
    {
      accessorKey: "accountType",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Account\nType"} />
      ),
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.accountType}</div>
      ),
    },
    {
      accessorKey: "currentBalance",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Current\nBalance"} />
      ),
      cell: ({ row }) => (
        <div className="text-right tabular-nums">
          {formatNumber(row.original.currentBalance)}
        </div>
      ),
    },
    {
      accessorKey: "ledgerBalance",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Ledger\nBalance"} />
      ),
      cell: ({ row }) => (
        <div className="text-right tabular-nums">
          {formatNumber(row.original.ledgerBalance)}
        </div>
      ),
    },
    {
      accessorKey: "usedExcessLbslFund",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"LBSL\nFund"} />
      ),
      cell: ({ row }) => (
        <div className="text-right tabular-nums">
          {formatNumber(row.original.usedExcessLbslFund)}
        </div>
      ),
    },
    {
      accessorKey: "zBuyQty",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Z-Group Buy\nQty"} />
      ),
      cell: ({ row }) => (
        <div className="whitespace-nowrap text-right tabular-nums">
          {row.original.zBuyQty.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "zBuyAmount",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Z-Group Buy\nAmount"} />
      ),
      cell: ({ row }) => (
        <div className="text-right tabular-nums">
          {formatNumber(row.original.zBuyAmount)}
        </div>
      ),
    },
    {
      accessorKey: "cashDeposit",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Cash\nDeposit"} />
      ),
      cell: ({ row }) => (
        <div className="text-right tabular-nums">
          {formatNumber(row.original.cashDeposit)}
        </div>
      ),
    },
    {
      accessorKey: "nonCashDeposit",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"Non-cash\nDeposit"} />
      ),
      cell: ({ row }) => (
        <div className="text-right tabular-nums">
          {formatNumber(row.original.nonCashDeposit)}
        </div>
      ),
    },
    {
      accessorKey: "rmBranch",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"RM\nBranch"} />
      ),
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.rmBranch}</div>
      ),
    },
    {
      accessorKey: "rmName",
      enableSorting: true,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={"RM\nName"} />
      ),
      cell: ({ row }) => (
        <div className="max-w-[150px] whitespace-normal break-words">
          {row.original.rmName}
        </div>
      ),
    },
  ];
