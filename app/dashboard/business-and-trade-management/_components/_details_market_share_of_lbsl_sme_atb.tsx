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
    <Card className="col-span-3 overflow-auto bg-[#033e4a]">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Details SME-ATB market share of LBSL(Date:{datalist.tradingDate})
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of the details SME-ATB market share of LBSL
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-2">
        <Table className="min-w-[453px] border border-gray-300 rounded-md overflow-hidden">
          <TableHeader>
          <TableRow className="text-center bg-blue-500 hover:bg-blue-700 text-black font-bold">
              <TableHead
                className="text-center py-1 border border-gray-100 text-white text-lg"
                colSpan={2}
              >
                DSE
              </TableHead>
              <TableHead
                className="text-center py-1 border border-gray-100 text-white text-lg"
                colSpan={2}
              >
                CSE
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-table-odd-row transition-all duration-300">
              <TableCell className="dse_table_odd_row text-left py-1 border border-gray-300 w-1/4">
                LBSL SME
              </TableCell>
              <TableCell className="dse_table_odd_row text-right py-1 border border-gray-300 w-1/4">
                {numberToMillionsString(datalist.dseSmeTurnover)}
              </TableCell>
              <TableCell className="cse_table_odd_row text-left py-1 border border-gray-300 w-1/4">
                LBSL SME
              </TableCell>
              <TableCell className=" cse_table_odd_row text-right py-1 border border-gray-300 w-1/4">
                {numberToMillionsString(datalist.cseSmeTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-even-row transition-all duration-300">
              <TableCell className="dse_table_even_row text-left py-1 border border-gray-300">
                LBSL ATB
              </TableCell>
              <TableCell className="dse_table_even_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.dseAtbTurnover)}
              </TableCell>
              <TableCell className="cse_table_even_row vtext-left py-1 border border-gray-300">
                LBSL ATB
              </TableCell>
              <TableCell className="cse_table_even_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseAtbTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-odd-row transition-all duration-300">
              <TableCell className="dse_table_odd_row text-left py-1 border border-gray-300">
                LBSL GSEC 
              </TableCell>
              <TableCell className="dse_table_odd_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.dseGsecTurnover)}
              </TableCell>
              <TableCell className="cse_table_odd_row text-left py-1 border border-gray-300">
                LBSL GSEC 
              </TableCell>
              <TableCell className="cse_table_odd_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseGsecTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-even-row transition-all duration-300">
              <TableCell className="dse_table_even_row text-left py-1 border border-gray-300">
                LBSL Block
              </TableCell>
              <TableCell className="dse_table_even_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.dseBlockTurnover)}
              </TableCell>
              <TableCell className="cse_table_even_row text-left py-1 border border-gray-300">
                LBSL Block
              </TableCell>
              <TableCell className="cse_table_even_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseBlockTurnover)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-odd-row transition-all duration-300">
              <TableCell className="dse_table_odd_row text-left py-1 border border-gray-300">
                LBSL SME(%)
              </TableCell>
              <TableCell className="dse_table_odd_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.smePercent)}
              </TableCell>
              <TableCell className="cse_table_odd_row text-left py-1 border border-gray-300">
                LBSL SME(%)
              </TableCell>
              <TableCell className="cse_table_odd_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseSmePercent)}
              </TableCell>
            </TableRow>
            <TableRow className="bg-table-even-row transition-all duration-300">
              <TableCell className="dse_table_even_row text-left py-1 border border-gray-300">
                LBSL ATB(%)
              </TableCell>
              <TableCell className="dse_table_even_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.atbPercent)}
              </TableCell>
              <TableCell className="cse_table_even_row text-left py-1 border border-gray-300">
                LBSL ATB(%)
              </TableCell>
              <TableCell className="cse_table_even_row text-right py-1 border border-gray-300">
                {numberToMillionsString(datalist.cseAtbPercent)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
