"use client";

import { cn, numberToMillionsString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type PortfolioMangementStatusDataType = {
  name: string;
  amount: number;
};

export type NewAccountOrTurnoverPerformanceDataType = {
  name: string;
  daily: number;
  weekly: number;
  forthnightly: number;
  monthly: number;
};

export type DailyNetFundFlowDataType = {
  branchCode?: number | null;
  branchName?: string | null;
  tradingDate: string;
  amount: number;
};
export type ClientTurnoverBiAxial = {
  branchCode?: number | null;
  branchName?: string | null;
  date: string;
  client: number;
  turnover: number;
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

export const portfolioMangementStatusColumns: ColumnDef<PortfolioMangementStatusDataType>[] =
  [
    {
      accessorKey: "name",
      header: "Particular Type",
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        return cellNumberFormatter(row, "amount");
      },
    },
  ];

export const newAccountFundCollectionColumns: ColumnDef<NewAccountOrTurnoverPerformanceDataType>[] =
  [
    {
      accessorKey: "name",
      header: "Particular Type",
    },
    {
      accessorKey: "daily",
      header: () => <div className="text-right">Daily</div>,
      cell: ({ row }) => {
        return cellNumberFormatter(row, "daily");
      },
    },
    {
      accessorKey: "weekly",
      header: () => <div className="text-right">Weekly</div>,
      cell: ({ row }) => {
        return cellNumberFormatter(row, "weekly");
      },
    },
    {
      accessorKey: "forthnightly",
      header: () => <div className="text-right">Forthnightly</div>,
      cell: ({ row }) => {
        return cellNumberFormatter(row, "forthnightly");
      },
    },
    {
      accessorKey: "monthly",
      header: () => <div className="text-right">Monthly</div>,
      cell: ({ row }) => {
        return cellNumberFormatter(row, "monthly");
      },
    },
  ];
