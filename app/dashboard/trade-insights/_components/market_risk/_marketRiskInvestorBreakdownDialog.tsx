"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tradeInsightAPI } from "../../api";

interface MarketRiskInvestorBreakdownDialogProps {
  symbol: string | null;
  onClose: () => void;
}

export function MarketRiskInvestorBreakdownDialog({
  symbol,
  onClose,
}: MarketRiskInvestorBreakdownDialogProps) {
  const {
    data: investorBreakdownResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminMarketRiskInvestorDrilldown", symbol],
    queryFn: () => {
      if (!symbol) {
        throw new Error("A symbol is required to load investor breakdown.");
      }
      return tradeInsightAPI.getAdminMarketRiskInvestorDrilldown(symbol);
    },
    enabled: symbol !== null,
  });

  const investors = investorBreakdownResponse?.data;
  const investorsSortedByHolding = investors
    ? [...investors].sort(
        (first, second) => second.holdingPercentage - first.holdingPercentage
      )
    : [];

  return (
    <Dialog
      open={symbol !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-teal-700 bg-gradient-to-br from-[#033e4a] via-[#064b59] to-[#123b58] text-white">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-baseline gap-x-2">
            Investor wise Script Holding(%)-
            {symbol && (
              <span className="">
                {symbol}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-white/80">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading investor breakdown...
          </div>
        ) : isError ? (
          <p className="py-8 text-center text-red-300" role="alert">
            Unable to load investor breakdown
            {error instanceof Error ? `: ${error.message}` : "."}
          </p>
        ) : investors?.length ? (
          <div className="overflow-x-auto rounded-lg border border-white/20 shadow-lg shadow-black/20">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-transparent">
                  {[
                    // "Symbol",
                    "Investor Code",
                    "Investor Name",
                    "Holding Qty",
                    "Holding (%)",
                  ].map((title, index) => (
                    <TableHead
                      key={title}
                      className={`whitespace-nowrap bg-teal-600 font-bold text-white ${
                        index >= 3 ? "text-right" : ""
                      }`}
                    >
                      {index === 2 ? (
                        <div className="flex flex-col items-start gap-1">
                          <span>{title}</span>
                          <span className="flex items-center gap-1.5 text-sm font-bold text-red-400">
                            <span className="relative flex h-2 w-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-75" />
                              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
                            </span>
                            LIVE
                          </span>
                        </div>
                      ) : (
                        title
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {investorsSortedByHolding.map((investor, index) => (
                  <TableRow
                    key={`${investor.investorCode}-${index}`}
                    className={
                      index % 2 === 0
                        ? "border-white/10 bg-teal-950/50 text-cyan-50 hover:bg-cyan-800/70"
                        : "border-white/10 bg-teal-800/50 text-emerald-50 hover:bg-emerald-800/70"
                    }
                  >
                    {/* <TableCell className="font-semibold text-white">
                      {investor.symbol}
                    </TableCell> */}
                    <TableCell className="font-medium text-white">
                      {investor.investorCode}
                    </TableCell>
                    <TableCell className="text-white">
                      {investor.investorName}
                    </TableCell>
                    <TableCell className="text-right font-semibold tabular-nums text-white">
                      {investor.holdingQty.toLocaleString("en-US")}
                    </TableCell>
                    <TableCell className="text-right font-semibold tabular-nums text-white">
                      {investor.holdingPercentage.toFixed(3)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="py-8 text-center text-white/80">
            No investor breakdown found for this symbol.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
