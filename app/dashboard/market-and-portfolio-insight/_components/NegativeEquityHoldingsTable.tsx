import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MarketNegativeEquityHoldingScrip } from "../types";

interface Props {
  records: MarketNegativeEquityHoldingScrip[];
}

const formatNumber = (value: number | string, maximumFractionDigits = 2) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue)
    ? new Intl.NumberFormat("en-BD", { maximumFractionDigits }).format(
        numericValue,
      )
    : value;
};

export default function NegativeEquityHoldingsTable({ records }: Props) {
  return (
  
        <Table wrapperClassName="max-h-[720px] overflow-auto">
          <TableHeader className="sticky top-0 z-10 bg-table-header">
            <TableRow className="hover:bg-table-header">
              <TableHead className="whitespace-nowrap font-bold text-black">
                Company Name
              </TableHead>
              <TableHead className="whitespace-nowrap text-right font-bold text-black">
                Free Quantity
              </TableHead>
              <TableHead className="whitespace-nowrap text-right font-bold text-black">
                Locked Quantity
              </TableHead>
              <TableHead className="whitespace-nowrap text-right font-bold text-black">
                Total Investors
              </TableHead>
              <TableHead className="whitespace-nowrap text-right font-bold text-black">
                Average Price
              </TableHead>
              <TableHead className="whitespace-nowrap text-right font-bold text-black">
                LTP
              </TableHead>
              <TableHead className="whitespace-nowrap text-right font-bold text-black">
                Market Value
              </TableHead>
              <TableHead className="whitespace-nowrap text-right font-bold text-black">
                Last Week Price
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length ? (
              records.map((record, index) => (
                <TableRow
                  key={`${record.companyName}-${index}`}
                  className={
                    index % 2 === 0
                      ? "bg-table-odd-row hover:bg-table-even-row-hover"
                      : "bg-table-even-row hover:bg-table-even-row-hover"
                  }
                >
                  <TableCell className="whitespace-nowrap font-medium">
                    {record.companyName}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(record.freeQty, 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(record.lockQty, 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(record.totalInvestor, 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(record.avgPrice, 2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(record.ltp)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(record.marketValue)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(record.lastWeekPrice)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-muted-foreground"
                >
                  No negative-equity holding data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
  
  );
}
