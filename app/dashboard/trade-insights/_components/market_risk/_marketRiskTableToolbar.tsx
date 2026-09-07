"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableViewOptions } from "./_marketRiskTableOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Symbol..."
          value={
            (table.getColumn("symbol")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("symbol")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px] bg-white"
        />
        <Select
          value={(table.getColumn("riskLevel")?.getFilterValue() as string) ?? "all"}
          onValueChange={(value) =>
            table.getColumn("riskLevel")?.setFilterValue(value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="h-8 w-[170px] bg-white text-slate-900">
            <SelectValue placeholder="Filter Risk Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="Normal">Normal</SelectItem>
            <SelectItem value="OBSERVATION">Observation</SelectItem>
            <SelectItem value="HIGH RISK">High Risk</SelectItem>
          </SelectContent>
        </Select>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
