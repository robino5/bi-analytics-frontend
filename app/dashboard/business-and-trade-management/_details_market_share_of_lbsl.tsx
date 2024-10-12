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
    <Card className="col-span-3 overflow-auto">
      <CardHeader>
        <CardTitle className="">
          Details market share of LBSL(Date:{datalist.tradingDate})
        </CardTitle>
        <CardDescription>
          short summary of the details market share of LBSL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="min-w-[453px] border border-gray-300">
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-center border border-gray-300"
                colSpan={4}
              >
                Details market share of LBSL
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                className="text-center py-1 border border-gray-300"
                colSpan={2}
              >
                DSE
              </TableCell>
              <TableCell
                className="text-center py-1 border border-gray-300"
                colSpan={2}
              >
                CSE
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-left py-1 border border-gray-300 w-1/4">
                LBSL Buy of DSE
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300 w-1/4">
                {numberToMillionsString(datalist.lbslBuyOfDse)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300 w-1/4">
                LBSL Buy of CSE
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300 w-1/4">
                {numberToMillionsString(datalist.lbslBuyOfCse)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Sell of DSE
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslSaleOfDse)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Sell of CSE
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslSaleOfCse)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Total of DSE
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslTotalOfDse)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Total of CSE
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslTotalOfCse)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-left py-1 border border-gray-300">
                DSE Market Turnover
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.dseMarketTurnover)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                CSE Market Turnover
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseMarketTurnover)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Share of DSE (%)
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslShareOfDse)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Share of CSE (%)
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.lbslShareOfCse)}
              </TableCell>
            </TableRow>
            <TableRow>
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
            <TableRow>
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
            <TableRow>
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
            <TableRow>
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
            <TableRow>
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
