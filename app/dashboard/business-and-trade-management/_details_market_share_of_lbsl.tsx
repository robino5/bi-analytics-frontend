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
  return (
    <Card className="col-span-3 overflow-auto bg-[#0e5e6f]">
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
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
          <TableRow className="text-center bg-table-header hover:bg-table-header text-black font-bold">
              <TableHead
                className="text-center py-1 border border-gray-300 text-black"
                colSpan={2}
              >
                DSE
              </TableHead>
              <TableHead
                className="text-center py-1 border border-gray-300 text-black"
                colSpan={2}
              >
                CSE
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-center text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold">
         
            </TableRow>
            <TableRow className="bg-table-odd-row  transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300 w-1/4">
                LBSL Buy
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300 w-1/4">
                {numberToMillionsString(datalist.lbslBuyOfDse)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300 w-1/4">
                LBSL Buy
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300 w-1/4">
                {numberToMillionsString(datalist.lbslBuyOfCse)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-even-row transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Sell
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslSaleOfDse)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Sell
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslSaleOfCse)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-odd-row  transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Total
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslTotalOfDse)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Total
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslTotalOfCse)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-even-row transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300">
                Market Turnover
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.dseMarketTurnover)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                Market Turnover
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseMarketTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-odd-row  transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Share(%)
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslShareOfDse)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Share(%)
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslShareOfCse)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-even-row transition-all duration-300">
              <TableCell
                className="text-center py-1 border border-gray-300"
                colSpan={2}
              >
                LBSL Total Turnover
              </TableCell>
              <TableCell
                className="text-right py-1 border border-gray-300"
                colSpan={2}
              >
                {numberToMillionsString(datalist.lbslTotalTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-odd-row  transition-all duration-300">
              <TableCell
                className="text-center py-1 border border-gray-300"
                colSpan={2}
              >
                EXCH Total Market TO
              </TableCell>
              <TableCell
                className="text-right py-1 border border-gray-300"
                colSpan={2}
              >
                {numberToMillionsString(datalist.exchTotalMarket)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-even-row transition-all duration-300">
              <TableCell
                className="text-center py-1 border border-gray-300"
                colSpan={2}
              >
                LBSL Market % (DSE+CSE)
              </TableCell>
              <TableCell
                className="text-right py-1 border border-gray-300"
                colSpan={2}
              >
                {numberToMillionsString(datalist.lbslMarketAll)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-odd-row  transition-all duration-300">
              <TableCell
                className="text-center py-1 border border-gray-300"
                colSpan={2}
              >
                Foreign
              </TableCell>
              <TableCell
                className="text-right py-1 border border-gray-300"
                colSpan={2}
              >
                {numberToMillionsString(datalist.foreign)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-even-row transition-all duration-300">
              <TableCell
                className="text-center py-1 border border-gray-300"
                colSpan={2}
              >
                Net Income Today
              </TableCell>
              <TableCell
                className="text-right py-1 border border-gray-300"
                colSpan={2}
              >
                {numberToMillionsString(datalist.netIncome)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
