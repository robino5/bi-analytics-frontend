"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./_marketRiskTableHeader";
import { AdminMarketRiskData } from "../../types";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value || 0);

const formatPercentage = (value: number) => `${(value || 0).toFixed(2)}%`;

export const marketRiskColumns: ColumnDef<AdminMarketRiskData>[] = [
  {
    id: "serial",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SI" />
    ),
    cell: ({ row, table }) => (
      <div className="text-right">
        {table.getSortedRowModel().rows.findIndex((sortedRow) => sortedRow.id === row.id) + 1}
      </div>
    ),
  },
  {
    accessorKey: "symbol",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Symbol" />
    ),
    cell: ({ row }) => <div className="text-left font-semibold">{row.original.symbol}</div>,
  },
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) => {
      const riskLevel = row.original.riskLevel.toUpperCase();
      const indicatorColor =
        riskLevel === "HIGH RISK"
          ? "bg-red-500"
          : riskLevel === "OBSERVATION"
            ? "bg-yellow-400"
            : "bg-green-500";

      return (
        <div className="flex justify-center">
          <span
            className={`h-3 w-3 rounded-full ${indicatorColor}`}
            aria-label={`${row.original.riskLevel} risk indicator`}
            title={row.original.riskLevel}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "riskLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Risk Level" />
    ),
    cell: ({ row }) => {
      const riskLevel = row.original.riskLevel.toUpperCase();
      const textColor =
        riskLevel === "HIGH RISK"
          ? "text-red-500"
          : riskLevel === "OBSERVATION"
            ? "text-yellow-500"
            : "text-green-500";

      return (
        <div className={`text-left font-bold ${textColor}`}>
          {row.original.riskLevel}
        </div>
      );
    },
  },
    {
    accessorKey: "lbsHoldingPercent",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title={"LBS\nHolding (%)"} />,
    cell: ({ row }) => (
      <div className="text-right">{formatPercentage(row.original.lbsHoldingPercent)}</div>
    ),
  },
  {
    accessorKey: "singleScripBar",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Single Scrip\n Bar (%)"} />
    ),
    cell: ({ row }) => (
      <div className="text-right">{formatPercentage(row.original.singleScripBar)}</div>
    ),
  },
  {
    accessorKey: "lbsFreeFloatSalable",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={"LBS \nTradable Qty"}
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">{formatNumber(row.original.lbsFreeFloatSalable)}</div>
    ),
  },
  {
    accessorKey: "buyQty",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Buy\n(live)"} />,
    cell: ({ row }) => <div className="text-right">{formatNumber(row.original.buyQty)}</div>,
  },
  {
    accessorKey: "sellQty",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Sell\n(live)"} />,
    cell: ({ row }) => <div className="text-right">{formatNumber(row.original.sellQty)}</div>,
  },
  {
    accessorKey: "blockPbContactToday",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Block/\nPB"} />,
    cell: ({ row }) => <div className="text-right">{formatNumber(row.original.blockPbContactToday)}</div>,
  },
  {
    accessorKey: "holdingLive",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Holding\n(Live)"} />,
    cell: ({ row }) => <div className="text-right">{formatNumber(row.original.holdingLive)}</div>,
  },
  {
    accessorKey: "freeFloatSalable",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Market\nTradable Qty "} />,
    cell: ({ row }) => <div className="text-right">{formatNumber(row.original.freeFloatSalable)}</div>,
  },
  {
    accessorKey: "marginQtyPercentage",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title={"LBS-Margin\nHolding(%)"} />,
    cell: ({ row }) => (
      <div className="text-right">{formatPercentage(row.original.marginQtyPercentage)}</div>
    ),
  },
  {
    accessorKey: "marketCategory",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Cate\ngory"} />,
  },
  {
    accessorKey: "dse30",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"DSE\n30" } />,
  },
  {
    accessorKey: "mLoanListed",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Scripts\nType"} />,
  },
  {
    accessorKey: "thirdPartyPercentage",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title={"3rd Party\ninvolvement"} />,
    cell: ({ row }) => (
      <div className="text-right">{formatPercentage(row.original.thirdPartyPercentage)}</div>
    ),
  },
  {
    accessorKey: "inHouseTransaction",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"In House\nTransaction"} />,
    cell: ({ row }) => (
      <div className="text-right">{formatNumber(row.original.inHouseTransaction)}</div>
    ),
  },
    {
    accessorKey: "sectorName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sector" />,
  },
];
