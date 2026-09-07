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
      <div className="text-center">
        {table.getSortedRowModel().rows.findIndex((sortedRow) => sortedRow.id === row.id) + 1}
      </div>
    ),
  },
  {
    accessorKey: "symbol",
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
    cell: ({ row }) => <div className="text-left">{row.original.riskLevel}</div>,
  },
  {
    accessorKey: "lbsFreeFloatSalable",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={"LBS Ledger\nQty Free Float"}
      />
    ),
    cell: ({ row }) => formatNumber(row.original.lbsFreeFloatSalable),
  },
  {
    accessorKey: "buyQty",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Inn_Buy\n(live)"} />,
    cell: ({ row }) => formatNumber(row.original.buyQty),
  },
  {
    accessorKey: "sellQty",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Inn_Sell\n(live)"} />,
    cell: ({ row }) => formatNumber(row.original.sellQty),
  },
  {
    accessorKey: "blockPbContactToday",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Block/\nPB"} />,
    cell: ({ row }) => formatNumber(row.original.blockPbContactToday),
  },
  {
    accessorKey: "holdingLive",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Holding (Live)" />,
    cell: ({ row }) => formatNumber(row.original.holdingLive),
  },
  {
    accessorKey: "freeFloatSalable",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Free Float\nShare Market"} />,
    cell: ({ row }) => formatNumber(row.original.freeFloatSalable),
  },
   {
    accessorKey: "lbsHoldingPercent",
    enableSorting: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title={"LBS\nHolding %"} />,
    cell: ({ row }) => formatPercentage(row.original.lbsHoldingPercent),
  },
  {
    accessorKey: "marginQtyPercentage",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"LBSHolding % in\nMargin account"} />,
    cell: ({ row }) => formatPercentage(row.original.marginQtyPercentage),
  },
  {
    accessorKey: "sectorName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Sector" />,
  },
  {
    accessorKey: "marketCategory",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Categ\nory"} />,
  },
  {
    accessorKey: "dse30",
    header: ({ column }) => <DataTableColumnHeader column={column} title="DSE30" />,
  },
  {
    accessorKey: "mLoanListed",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"Margin/Non\nMargin Scripts"} />,
  },
  {
    accessorKey: "thirdPartyPercentage",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"3rd Party\ninvolvement"} />,
    cell: ({ row }) => formatPercentage(row.original.thirdPartyPercentage),
  },
  {
    accessorKey: "inHouseTransaction",
    header: ({ column }) => <DataTableColumnHeader column={column} title={"In House\nTransaction"} />,
    cell: ({ row }) => formatNumber(row.original.inHouseTransaction),
  },
];
