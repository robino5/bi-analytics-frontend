"use client";

import { numberToMillionsString, successResponse } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { IMarkedClient } from "@/types/marginLoanUsage";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { IResponse } from "@/types/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MarkedTradersDataType {
  code: number;
  investorName: string;
  ledgerBalance: number;
  rmName: string;
}

interface Props {
  kind: keyof MarkedTraderPayloadType;
  branch?: string;
}

export type MarkedTraderPayloadType = {
  red: MarkedTradersDataType[];
  yellow: MarkedTradersDataType[];
  green: MarkedTradersDataType[];
};

type SortableField =
  | "exposure"
  | "marginableExposure"
  | "equity"
  | "marginableEquity"
  | "ledgerBalance"
  | "stockValue";

type SortState = {
  field: SortableField;
  direction: "asc" | "desc";
};

type MarkedTraderRecord = IMarkedClient & {
  branchName?: string;
  marginableExposure?: number;
  marginableEquity?: number;
  marginableLoanRatio?: string;
  stockValue?: number;
  lastTradingDt?: string;
  accType?: string;
};

async function fetchMarkedTraders(
  kind: keyof MarkedTraderPayloadType,
  session: Session | null,
  branch?: string
): Promise<MarkedTraderRecord[]> {
  let url;
  if (branch) {
    url = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/zonewise-investors/?investor_type=${kind}&branch=${branch}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/zonewise-investors/?investor_type=${kind}`;
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.user.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const result = (await response.json()) as IResponse<MarkedTraderRecord[]>;
  if (successResponse(result.status)) {
    return result.data;
  }
  throw Error(`Marked data fetching error`);
}

export default function MarkedTraderDataTable({ kind, branch }: Props) {
  const { data: session } = useSession();

  const [records, setRecords] = useState<MarkedTraderRecord[]>([]);
  const [sort, setSort] = useState<SortState | null>(null);

  const sortedRecords = useMemo(() => {
    if (!sort) {
      return records;
    }

    return [...records].sort((first, second) => {
      const firstValue = first[sort.field];
      const secondValue = second[sort.field];

      if (firstValue == null) return secondValue == null ? 0 : 1;
      if (secondValue == null) return -1;

      const comparison =
        typeof firstValue === "number" && typeof secondValue === "number"
          ? firstValue - secondValue
          : String(firstValue).localeCompare(String(secondValue), undefined, {
              numeric: true,
              sensitivity: "base",
            });

      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [records, sort]);

  const renderSortableHeader = (
    label: string,
    field: SortableField,
    className: string,
    alignment: "left" | "right" | "center" = "center"
  ) => {
    const isSorted = sort?.field === field;

    return (
      <TableHead
        aria-sort={
          isSorted
            ? sort.direction === "asc"
              ? "ascending"
              : "descending"
            : "none"
        }
        className={`${className} px-1 text-[12px] leading-tight`}
      >
        <button
          type="button"
          className={`inline-flex w-full items-center gap-1 whitespace-normal text-[12px] leading-tight ${
            alignment === "right"
              ? "justify-end"
              : alignment === "left"
                ? "justify-start"
                : "justify-center"
          }`}
          onClick={() =>
            setSort((current) => ({
              field,
              direction:
                current?.field === field && current.direction === "asc"
                  ? "desc"
                  : "asc",
            }))
          }
          aria-label={`Sort by ${label} ${
            isSorted && sort.direction === "asc" ? "descending" : "ascending"
          }`}
        >
          <span className="whitespace-normal">{label}</span>
          {isSorted ? (
            sort.direction === "asc" ? (
              <ArrowUpIcon aria-hidden="true" />
            ) : (
              <ArrowDownIcon aria-hidden="true" />
            )
          ) : (
            <CaretSortIcon aria-hidden="true" />
          )}
        </button>
      </TableHead>
    );
  };

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetchMarkedTraders(kind, session, branch);
      setRecords(response);
    };
    fetchClients();
  }, [branch, kind, session]);
  return (
    <Table className="w-full table-fixed border-collapse border border-gray-300 text-[12px] [&_th]:border-r [&_th]:border-gray-300 [&_td]:border-r [&_td]:border-gray-300 [&_th:last-child]:border-r-0 [&_td:last-child]:border-r-0">
      <TableHeader>
        <TableRow className="text-center bg-table-header hover:bg-table-header text-black font-bold">
          <TableHead className="w-[5%] px-1 text-left text-[12px] font-bold text-black">
            Code
          </TableHead>
          <TableHead className="w-[9%] px-1 text-left text-[12px] font-bold text-black">
            Investor Name
          </TableHead>
          <TableHead className="w-[7%] px-1 text-left text-[12px] font-bold text-black">
            Branch
          </TableHead>
          <TableHead className="w-[6%] px-1 text-center text-[12px] font-bold text-black">
            Account Type
          </TableHead>
          {renderSortableHeader(
            "Exposure",
            "exposure",
            "w-[7%] text-right text-black font-bold",
            "right"
          )}
          {renderSortableHeader(
            "Marginable Exposure",
            "marginableExposure",
            "w-[8%] text-right text-black font-bold",
            "right"
          )}
          {renderSortableHeader(
            "Equity",
            "equity",
            "w-[7%] text-right text-black font-bold",
            "right"
          )}
          {renderSortableHeader(
            "Marginable Equity",
            "marginableEquity",
            "w-[7%] text-right text-black font-bold",
            "right"
          )}
          {renderSortableHeader(
            "Ledger Balance",
            "ledgerBalance",
            "w-[8%] text-right text-black font-bold",
            "right"
          )}
          <TableHead className="w-[7%] px-1 text-center text-[12px] font-bold text-black">
            Loan Ratio
          </TableHead>
          <TableHead className="w-[8%] px-1 text-center text-[12px] font-bold text-black">
            Marginable Loan Ratio
          </TableHead>
          {renderSortableHeader(
            "Stock Value",
            "stockValue",
            "w-[6%] text-right text-black font-bold",
            "right"
          )}
          <TableHead className="w-[7%] px-1 text-center text-[12px] font-bold text-black">
            Last Trading Date
          </TableHead>
          <TableHead className="w-[8%] px-1 text-left text-[12px] font-bold text-black">
            RM
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedRecords.map((record, index) => (
            <TableRow
              key={record.investorCode}
              className={`${
                index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
              } hover:bg-table-even-row-hover transition-all duration-300`}
            >
              <TableCell className="break-words px-1 py-1 text-[12px] font-medium">
                {record.investorCode}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-left text-[12px]">
                {record.investorName}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-left text-[12px]">
                {record.branchName ?? "-"}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-center text-[12px]">
                {record.accType ?? "-"}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-right text-[12px]">
                {record.exposure.toFixed(2)}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-right text-[12px]">
                {record.marginableExposure?.toFixed(2) ?? "-"}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-right text-[12px]">
                {numberToMillionsString(record.equity)}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-right text-[12px]">
                {record.marginableEquity == null
                  ? "-"
                  : numberToMillionsString(record.marginableEquity)}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-right text-[12px]">
                {numberToMillionsString(record.ledgerBalance)}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-center text-[12px]">
                {record.loanRatio}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-center text-[12px]">
                {record.marginableLoanRatio ?? "-"}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-right text-[12px]">
                {record.stockValue == null
                  ? "-"
                  : record.stockValue}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-center text-[12px]">
                {record.lastTradingDt
                  ? format(parseISO(record.lastTradingDt), "dd-MMM-yyyy")
                  : "-"}
              </TableCell>
              <TableCell className="break-words px-1 py-1 text-left text-[12px]">
                {record.rmName}
              </TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
