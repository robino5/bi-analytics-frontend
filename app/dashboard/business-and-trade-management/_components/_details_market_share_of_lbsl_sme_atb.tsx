import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
  const rows = [
    { label: "LBSL SME", dse: datalist.dseSmeTurnover, cse: datalist.cseSmeTurnover },
    { label: "LBSL ATB", dse: datalist.dseAtbTurnover, cse: datalist.cseAtbTurnover },
    { label: "LBSL GSEC", dse: datalist.dseGsecTurnover, cse: datalist.cseGsecTurnover },
    { label: "LBSL Block", dse: datalist.dseBlockTurnover, cse: datalist.cseBlockTurnover },
    { label: "LBSL SME(%)", dse: datalist.smePercent, cse: datalist.cseSmePercent },
    { label: "LBSL ATB(%)", dse: datalist.atbPercent, cse: datalist.cseAtbPercent },
  ];

  return (
    <Card className="col-span-3 overflow-auto bg-[#033e4a]">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Details SME-ATB market share of LBSL (Date: {datalist.tradingDate})
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-2">
        <Table className="min-w-[453px] border border-gray-300 rounded-md overflow-hidden">
          <TableHeader>
            <TableRow className="text-center bg-blue-500 text-white text-lg font-bold">
              <TableHead className="text-left py-1 border border-gray-100"></TableHead>
              <TableHead className="text-right py-1 border border-gray-100 text-white">DSE</TableHead>
              <TableHead className="text-right py-1 border border-gray-100 text-white">CSE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => {
              // Label column gradient (gray)
              const labelGradient = index % 2 === 0
                ? "bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300"
                : "bg-gradient-to-r from-purple-200 via-purple-300 to-purple-400";

              // DSE column gradient (blue)
              const dseGradient = index % 2 === 0
                ? "bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300"
                : "bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400";

              // CSE column gradient (green)
              const cseGradient = index % 2 === 0
                ? "bg-gradient-to-r from-green-100 via-green-200 to-green-300"
                : "bg-gradient-to-r from-green-200 via-green-300 to-green-400";

              return (
                <TableRow key={row.label} className="text-center transition-all duration-300">
                  <TableCell className={`text-left py-1 border border-gray-300 font-semibold ${labelGradient}`}>
                    {row.label}
                  </TableCell>
                  <TableCell className={`text-right py-1 border border-gray-300 font-medium ${dseGradient}`}>
                    {numberToMillionsString(row.dse)}
                  </TableCell>
                  <TableCell className={`text-right py-1 border border-gray-300 font-medium ${cseGradient}`}>
                    {numberToMillionsString(row.cse)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
