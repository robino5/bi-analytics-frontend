"use client";

import * as React from "react";
import {
  ColumnDef,
  VisibilityState,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import { cn, numberToMillionsString } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface DataTableProps<TData, TValue> {
  title: string;
  subtitle: string;
  columns: ColumnDef<TData, TValue>[];
  className?: string;
  url?: string;
}

export function SalableStockDataTableCard<TData, TValue>({
  title,
  subtitle,
  columns,
  className,
  url,
}: DataTableProps<TData, TValue>) {
  const { data: session } = useSession();
  const [data, setData] = React.useState<TData[]>([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [companyName, setCompanyName] = React.useState<string>("");
  const [gsecFlag, setGsecFlag] = React.useState<any>();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    gsecFlag: false,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { pageIndex, pageSize } = pagination;
      const query = new URLSearchParams({
        page: (pageIndex + 1).toString(),
        page_size: pageSize.toString(),
      });

      if (companyName) {
        query.append("company", companyName);
      }
      if (gsecFlag) {
        query.append("gsec_flag", gsecFlag);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_V1_APIURL}${url}?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      setData(result.data.results);
      setTotalRows(result.data.count);
      setLoading(false);
    };

    fetchData();
  }, [pagination, sorting, companyName, gsecFlag]);

  const generateFilterQuery = (data: { id: string; value: any }[]) => {
    const gsecFlagItem = data.find(item => item.id === "gsecFlag");
    const companyName = data.find(item => item.id === "companyName");
    if (gsecFlagItem) {
      Array.isArray(gsecFlagItem.value) && gsecFlagItem.value.length > 0
        ? setGsecFlag(gsecFlagItem.value[0])
        : setGsecFlag(undefined);
    } else {
      setGsecFlag(undefined); 
    }
    if (companyName) {
      data.forEach((item) => {
        if (item.id === "companyName") {
          setCompanyName(item.value);
        }
      });
    } else {
      setCompanyName(''); 
    }
    
  };
  React.useEffect(() => {
    generateFilterQuery(columnFilters);
  }, [columnFilters]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    manualPagination: true,
    pageCount: Math.ceil(totalRows / pagination.pageSize),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className={cn("w-full shadow-md", className, "bg-[#0e5e6f]")}>
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">{title}</CardTitle>
        {/* <CardDescription className="text-white">{subtitle}</CardDescription> */}
      </CardHeader>
      <CardContent className="mt-2">
        <div className="space-y-4">
          <DataTableToolbar
            table={table}
          />
          <div className="rounded-md border overflow-hidden">
            <div className="max-h-[800px] overflow-y-auto">
              <Table>
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
                          className="text-white font-bold border"
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
                <TableBody className="border border-gray-200">
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center"
                      >
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row, index) => (
                      <TableRow
                        key={row.id}
                        className={`${index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                          } hover:bg-green-300 transition-all duration-300`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="p-1 text-[0.8rem] border">
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
                        className="text-center"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter className="border border-gray-200">
                  <TableRow className="bg-table-footer hover:bg-table-footer transition-all duration-300">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">
                      {numberToMillionsString(
                        data.reduce((total, item) => total + (item as any).stockAvailable, 0)
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  );
}
