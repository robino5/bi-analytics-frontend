"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { DataTableColumnHeader } from "./_topRMTurnoverTableHeader";
import { AdminRealtimeTopRmTurnover } from "../../types";
import { DataTableColumnHeaderRank } from "./_topRMTurnoverTableHeaderRank";

const cellNumberFormatter = (row: any, accessorKey: string) => {
  const amount = parseFloat(row.getValue(accessorKey));
  return numberToMillionsString(amount);
};

export const adminRealTimeTopTurnoverColumns: ColumnDef<AdminRealtimeTopRmTurnover>[] = [
  {
    accessorKey: "rankNo",
    header: ({ column }) => (
      <DataTableColumnHeaderRank className="text-red-500 hover:text-red-500" column={column} title="Rank" />
    ),
    cell: ({ row }) => {
      const isHigher = row.original.totalTurnOverToday > row.original.maxTurnOver;
      return <div
        className={cn("text-center font-bold ml-4", {
          "text-green-600 text-lg": isHigher,
          "text-red-500": !isHigher,
        })}>
        {row.getValue("rankNo")}
      </div>
    }
  },
  {
    accessorKey: "rmName",
    header: () => <span className="text-black">RM</span>,
    cell: ({ row }) => {
      const isHigher = row.original.totalTurnOverToday > row.original.maxTurnOver;
      return <div className={cn("text-center font-bold ml-4", {
        "text-green-600 text-lg": isHigher,
      })}>
        {row.getValue("rmName")}
      </div>
    }
  },
  {
    accessorKey: "branchName",
    header: () => <span className="text-black">Branch</span>,
    cell: ({ row }) => {
      const isHigher = row.original.totalTurnOverToday > row.original.maxTurnOver;
      return (
        <div className={cn({ "text-green-600 text-lg font-bold": isHigher })}>
          {row.getValue("branchName")}
        </div>
      );
    },
  },
  {
    accessorKey: "totalTurnOverToday",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={"Today TO"}
      />
    ),
    cell: ({ row }) => {
      const isHigher = row.original.totalTurnOverToday > row.original.maxTurnOver;
      return (
        <div
          className={cn("text-right ml-4", {
            "text-green-600 text-lg font-bold ": isHigher,
            "text-red-600": row.getValue("totalTurnOverToday") as number < 0,
          })}
        >
          {cellNumberFormatter(row, "totalTurnOverToday")}
        </div>
      );
    },
  },
  {
    accessorKey: "totalYearlyComm",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Commission as on"} />
    ),
    cell: ({ row }) => {
      const isHigher = row.original.totalTurnOverToday > row.original.maxTurnOver;
      return <div
        className={cn("text-right ml-4", {
          "text-green-600 text-lg font-bold": isHigher,
          "text-red-600": row.getValue("totalYearlyComm") as number < 0,
        })}>
        {cellNumberFormatter(row, "totalYearlyComm")}
      </div >;
    },
  },
  {
    accessorKey: "maxTurnOver",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Highest TO" />
    ),
    cell: ({ row }) => {
      const isHigher = row.original.totalTurnOverToday > row.original.maxTurnOver;
      return <div
        className={cn("text-right ml-4", {
          "text-green-600 text-lg font-bold": isHigher,
          "text-red-600": row.getValue("maxTurnOver") as number < 0,
        })}>
        {cellNumberFormatter(row, "maxTurnOver")}</div >;
    },
  },
  {
    accessorKey: "tradingDate",
    header: () => <span className="text-black">Highest TO Date</span>,
    cell: ({ row }) => {
      const isHigher = row.original.totalTurnOverToday > row.original.maxTurnOver;
      const date = parseISO(row.original.tradingDate); // parse ISO string
      return (
        <div className={cn({ "text-green-600 text-lg font-bold": isHigher })}>
          {format(date, "dd-MM-yy")}
        </div>
      );
    },
  },

];
