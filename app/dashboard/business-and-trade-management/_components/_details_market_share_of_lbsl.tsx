import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { numberToMillionsString } from "@/lib/utils";
import { useState } from "react";

interface MarketShareLBSl {
  tradingDate: string;
  lbslBuyOfDse: number;
  lbslSaleOfDse: number;
  lbslTotalOfDse: number;
  dseMarketTurnover: number;
  lbslShareOfDse: number;
  lbslBuyOfCse: number;
  lbslSaleOfCse: number;
  lbslTotalOfCse: number;
  cseMarketTurnover: number;
  lbslShareOfCse: number;
  lbslTotalTurnover: number;
  exchTotalMarket: number;
  lbslMarketAll: number;
  foreign: number;
  netIncome: number;
}

interface Props {
  datalist: MarketShareLBSl;
}

export default function DetailsMarketShareLBSL({ datalist }: Props) {
  const [showSummary, setShowSummary] = useState(false);
  const summaryRows = [
    { label: "LBSL Total Turnover", value: datalist.lbslTotalTurnover },
    { label: "EXCH Total Market TO", value: datalist.exchTotalMarket },
    { label: "LBSL Market % (DSE+CSE)", value: datalist.lbslMarketAll },
    { label: "Foreign", value: datalist.foreign },
    { label: "Net Income Today", value: datalist.netIncome },
  ];
  return (
    <Card className="col-span-3 overflow-auto bg-[#033e4a]">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Details market share of LBSL(Date:{datalist.tradingDate})
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of the details market share of LBSL
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-2">
        <Table className="min-w-[453px] border border-gray-300 rounded-md overflow-hidden">
          <TableHeader>
            <TableRow className="text-center bg-blue-500 text-white text-lg hover:bg-blue-500">
              <TableHead className="text-left py-1 border border-gray-300"></TableHead>
              <TableHead className="text-right py-1 border border-gray-300 text-white">DSE</TableHead>
              <TableHead className="text-right py-1 border border-gray-300 text-white">CSE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* DSE & CSE Section */}
            {[
              { label: "LBSL Buy", dse: datalist.lbslBuyOfDse, cse: datalist.lbslBuyOfCse },
              { label: "LBSL Sell", dse: datalist.lbslSaleOfDse, cse: datalist.lbslSaleOfCse },
              { label: "LBSL Total", dse: datalist.lbslTotalOfDse, cse: datalist.lbslTotalOfCse },
              { label: "Market Turnover", dse: datalist.dseMarketTurnover, cse: datalist.cseMarketTurnover },
              { label: "LBSL Share (%)", dse: datalist.lbslShareOfDse, cse: datalist.lbslShareOfCse },
            ].map((row, index) => {
              // Alternating row gradient for the label column
              const labelGradient = index % 2 === 0
                ? "bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300"
                : "bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400";

              // DSE column gradient
              const dseGradient = index % 2 === 0
                ? "bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300"
                : "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400";

              // CSE column gradient
              const cseGradient = index % 2 === 0
                ? "bg-gradient-to-r from-green-100 via-green-200 to-green-300"
                : "bg-gradient-to-r from-green-200 via-green-300 to-green-400";

              return (
                <TableRow
                  key={row.label}
                  className="text-center transition-all duration-300"
                >
                  <TableCell
                    className={`text-left py-1 border border-gray-300 font-semibold ${labelGradient}`}
                  >
                    {row.label}
                  </TableCell>

                  <TableCell
                    className={`text-right py-1 border border-gray-300 font-medium ${dseGradient}`}
                  >
                    {row.label.includes("%")
                      ? row?.dse?.toFixed(2)
                      : numberToMillionsString(row.dse, 2)}
                  </TableCell>

                  <TableCell
                    className={`text-right py-1 border border-gray-300 font-medium ${cseGradient}`}
                  >
                    {row.label.includes("%")
                      ? row?.cse?.toFixed(2)
                      : numberToMillionsString(row.cse, 2)}
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Collapsible Summary Header */}
            <TableRow
              className="text-center cursor-pointer font-bold text-black bg-gradient-to-r from-violet-100 via-violet-200 to-violet-300 transition-all duration-300 hover:scale-[1.01]"
              onClick={() => setShowSummary(!showSummary)}
            >
              <TableCell colSpan={3} className="py-2 border border-gray-300">
                {showSummary ? "Hide Summary ▲" : "Show Summary ▼"}
              </TableCell>
            </TableRow>

            {/* Collapsible Summary Container */}
            {showSummary && (
              <TableRow>
                <TableCell colSpan={3} className="p-0">
                  <Table className="w-full">
                    <TableBody>
                      {summaryRows.map((row, index) => {
                        const gradient =
                          index % 2 === 0
                            ? "bg-gradient-to-r from-fuchsia-50 via-fuchsia-100 to-fuchsia-200"
                            : "bg-gradient-to-r from-fuchsia-200 via-fuchsia-300 to-fuchsia-400";

                        return (
                          <TableRow
                            key={row.label}
                            className={`text-left font-semibold transition-all duration-300 ${gradient}`}
                          >
                            <TableCell colSpan={1} className="py-1 border border-gray-300">
                              {row.label}
                            </TableCell>
                            <TableCell colSpan={2} className="text-right py-1 border border-gray-300 font-medium">
                              {row.label.includes("%")
                                ? row.value.toFixed(2)
                                : numberToMillionsString(row.value, 2)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
