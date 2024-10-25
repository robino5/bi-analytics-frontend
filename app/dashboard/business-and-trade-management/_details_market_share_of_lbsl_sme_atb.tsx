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

interface MarketShareSME {
  tradingDate: string;
  dseSmeTurnover: number;
  dseAtbTurnover: number;
  dseGsecTurnover: number;
  dseBlockTurnover: number;
  smePercent: number;
  atbPercent: number;
  cseSmeTurnover: number;
  cseAtbTurnover: number;
  cseGsecTurnover: number;
  cseBlockTurnover: number;
  cseSmePercent: number;
  cseAtbPercent: number;
}

interface Props {
  datalist: MarketShareSME;
}

export default function DetailsMarketShareSME({ datalist }: Props) {
  console.log(datalist);
  return (
    <Card className="col-span-3 overflow-auto">
      <CardHeader>
        <CardTitle className="">
          Details SME-ATB market share of LBSL(Date:{datalist.tradingDate})
        </CardTitle>
        <CardDescription>
          short summary of the details SME-ATB market share of LBSL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="min-w-[453px] border border-gray-300">
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-center text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold"
                colSpan={4}
              >
                Details market share of LBSL(SME-ATB)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-center text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold">
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
            <TableRow className="bg-pink-200 hover:bg-green-300 transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300 w-1/4">
                LBSL SME
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300 w-1/4">
                {numberToMillionsString(datalist.dseSmeTurnover)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300 w-1/4">
                LBSL SME
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300 w-1/4">
                {numberToMillionsString(datalist.cseSmeTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-yellow-200 hover:bg-green-300 transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL ATB
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.dseAtbTurnover)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL ATB
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseAtbTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-pink-200 hover:bg-green-300 transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL GSEC 
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.dseGsecTurnover)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL GSEC 
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseGsecTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-yellow-200 hover:bg-green-300 transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Block
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.dseBlockTurnover)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Block
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseBlockTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-pink-200 hover:bg-green-300 transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Share of DSE SME (%)
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.smePercent)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Share of DSE SME (%)
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseSmePercent)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-yellow-200 hover:bg-green-300 transition-all duration-300">
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Share of DSE  ATB (%)
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.atbPercent)}
              </TableCell>
              <TableCell className="text-left py-1 border border-gray-300">
                LBSL Share of DSE  ATB (%)
              </TableCell>
              <TableCell className="text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseAtbPercent)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
