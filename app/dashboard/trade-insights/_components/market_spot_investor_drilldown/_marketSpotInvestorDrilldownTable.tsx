"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { numberToMillionsString } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MarketSpotDataInvestorDrilldown } from "../../types";
import { marketSpotInvestorDrilldownColumns } from "./_marketSpotInvestorDrilldownTableColumns";
import { DataTablePagination } from "./_marketSpotInvestorDrilldownTablePagination";
import { DataTableToolbar } from "./_marketSpotInvestorDrilldownTableToolbar";

interface MarketSpotInvestorDrilldownDataTableProps {
  data: MarketSpotDataInvestorDrilldown[];
}

export function MarketSpotInvestorDrilldownDataTable({
  data,
}: MarketSpotInvestorDrilldownDataTableProps) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "usedExcessLbslFund", desc: true },
  ]);

  const table = useReactTable({
    data,
    columns: marketSpotInvestorDrilldownColumns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const totals = data.reduce(
    (summary, row) => ({
      spotBuyAmount: summary.spotBuyAmount + row.spotBuyAmount,
      cashDeposit: summary.cashDeposit + row.cashDeposit,
      nonCashDeposit: summary.nonCashDeposit + row.nonCashDeposit,
      usedExcessLbslFund: summary.usedExcessLbslFund + row.usedExcessLbslFund,
    }),
    {
      spotBuyAmount: 0,
      cashDeposit: 0,
      nonCashDeposit: 0,
      usedExcessLbslFund: 0,
    }
  );
  const formatTotal = (value: number) => numberToMillionsString(value);
  const totalByColumnId: Record<string, number> = {
    spotBuyAmount: totals.spotBuyAmount,
    cashDeposit: totals.cashDeposit,
    nonCashDeposit: totals.nonCashDeposit,
    usedExcessLbslFund: totals.usedExcessLbslFund,
  };
  const visibleColumns = table.getVisibleLeafColumns();
  const labelColumnId = visibleColumns.find(
    (column) => !(column.id in totalByColumnId)
  )?.id;

  return (
    <div className="w-full  space-y-4 overflow-hidden">
      <DataTableToolbar table={table} />
      <div className="w-full  overflow-x-auto rounded-md border">
        <div className="">
          <Table className="w-full table-fixed" wrapperClassName="overflow-visible">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-table-header hover:bg-table-header"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="h-auto min-h-[80px] max-w-[150px] whitespace-normal break-words border px-2 py-3 font-bold leading-tight text-black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={`${
                      index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                    } hover:bg-green-300 transition-all duration-300`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="border p-1 text-[0.8rem]"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Table className="w-full table-fixed" wrapperClassName="overflow-visible">
            <TableBody>
              <TableRow className="bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-900 text-white hover:from-blue-950 hover:via-indigo-900 hover:to-purple-900">
                {visibleColumns.map((column) => {
                  const hasTotal = Object.prototype.hasOwnProperty.call(
                    totalByColumnId,
                    column.id
                  );
                  const isLabel = column.id === labelColumnId;

                  return (
                    <TableCell
                      key={column.id}
                      className={`border border-teal-300/40 p-2 ${
                        hasTotal
                          ? "max-w-[150px] whitespace-normal break-all text-right text-sm font-extrabold text-amber-300 tabular-nums"
                          : isLabel
                            ? "text-base font-extrabold tracking-wide text-cyan-200"
                            : "text-white"
                      }`}
                    >
                      {hasTotal
                        ? formatTotal(totalByColumnId[column.id])
                      : isLabel
                        ? "Grand Total"
                          : ""}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
