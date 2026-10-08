"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./_marketRiskTablePagination";
import { DataTableToolbar } from "./_marketRiskTableToolbar";

const marketRiskColumnHighlights: Record<string, string> = {
  lbsHoldingPercent:
    "bg-amber-100 border-x-2 border-amber-400 font-bold text-amber-950 hover:bg-amber-200",
  singleScripBar:
    "bg-sky-100 border-x-2 border-sky-400 font-bold text-sky-950 hover:bg-sky-200",
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ sectorName: false });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "lbsHoldingPercent", desc: true },
  ]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection,
      columnFilters,
      sorting,
    },
    defaultColumn: {
      enableSorting: false,
    },
    enableRowSelection: true,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="min-w-0 max-w-full space-y-4">
      <DataTableToolbar table={table} />
      <div className="w-0 min-w-full max-w-full overflow-x-auto rounded-md border">
        <Table
          className="min-w-[1300px]"
          wrapperClassName="w-max min-w-full overflow-visible"
        >
          <TableHeader className="text-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                   className="bg-table-header hover:bg-table-header"
              >
                {headerGroup.headers.map((header) => {
                  const highlightClass =
                    marketRiskColumnHighlights[header.column.id] ?? "";

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`h-10 border p-1 font-bold text-white ${highlightClass}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${
                    index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                  } hover:bg-green-300 transition-all duration-300`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={`border p-1 text-[0.8rem] ${marketRiskColumnHighlights[cell.column.id] ?? ""}`}
                      key={cell.id}
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
