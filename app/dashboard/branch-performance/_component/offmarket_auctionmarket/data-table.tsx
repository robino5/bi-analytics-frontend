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
  TableFooter,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { cn } from "@/lib/utils";
import { numberToMillionsString } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  title: string;
  subtitle: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  setYear?: (year: number) => void;
  year?: number;
}

export function DataTableCard<TData, TValue>({
  title,
  subtitle,
  columns,
  data,
  className,
  setYear,
  year,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 20, });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // determine numeric keys to total (common patterns: Fund, Income, Turnover)
  const accessorKeys: string[] = columns
    .map((c: any) => (c as any).accessorKey)
    .filter((k) => typeof k === "string") as string[];

  const totalKeys = accessorKeys.filter((k) => /fund|income|turnover/i.test(k));

  const totals: Record<string, number> = React.useMemo(() => {
    const t: Record<string, number> = {};
    totalKeys.forEach((key) => {
      t[key] = data.reduce((sum, item) => sum + (Number((item as any)[key]) || 0), 0);
    });
    return t;
  }, [data, totalKeys]);

    const tableCellColorEffect = (Rowindex :number,cellindex: number) => {
    if (cellindex == 2) {
      return Rowindex % 2 === 0 ? "bg-blue-200" : "bg-blue-100";
    } else if (cellindex == 3) {
      return Rowindex % 2 === 0 ? "bg-green-200" : "bg-green-100"
    }
  }

  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#033e4a]")}>
        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
          <div className="w-full flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-md text-lg">{title}</CardTitle>
              {/* <CardDescription className="text-white">{subtitle}</CardDescription> */}
            </div>
            <div className="flex items-center gap-2">
              <select
                value={year ?? ""}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (setYear) setYear(v);
                }}
                className="rounded border px-2 py-1 text-sm"
              >
                <option value="">Select</option>
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
              </select>
            </div>
          </div>
        </CardHeader>
      <CardContent className="mt-3">
        <div className="space-y-4">
          <DataTableToolbar table={table} />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="bg-blue-500 hover:bg-blue-700"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          className="border-r text-white font-bold"
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
              <TableBody className="border border-gray-200">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={`${index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                        } hover:bg-green-300 transition-all duration-300`}
                    >
                      {row.getVisibleCells().map((cell,cellindex) => (
                        <TableCell
                          className={`${tableCellColorEffect(index,cellindex)} py-1 px-4 text-start text-[0.8rem] border"`}
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
              <TableFooter className="border border-gray-200">
                <TableRow className="bg-table-footer hover:bg-table-footer transition-all duration-300">
                  {/* first column label */}
                  <TableCell className="font-bold">Total</TableCell>
                  {/* render totals aligned with visible columns */}
                  {table
                    .getHeaderGroups()[0]
                    .headers.slice(1)
                    .map((header) => {
                      const key = (header.column.columnDef as any).accessorKey as string | undefined;
                      if (key && totals[key] !== undefined) {
                        return (
                          <TableCell key={header.id} className="text-right">
                            {numberToMillionsString(totals[key])}
                          </TableCell>
                        );
                      }

                      return <TableCell key={header.id} />;
                    })}
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  );
}
