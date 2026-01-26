import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numberToMillionsString } from "@/lib/utils";

interface ModeWiseDepositeProps {
  title: string;
  data: {
    cashDeposit: number;
    chequeDeposit: number;
    scbDeposit: number;
    payOrder: number;
    cashDividend: number;
    ipoMode: number;
  };
  color: string;
}

const ModeWiseDeposite: React.FC<ModeWiseDepositeProps> = ({
  title,
  data,
  color,
}) => {
  // Convert object to array of {name, value} and filter > 0
  const rows = Object.entries(data)
    .map(([key, value]) => ({ name: key, value }))
    .filter((item) => item.value > 0 && item.name !== "totalDeposit");

  const totalAmount = rows.reduce((sum, row) => sum + row.value, 0);

  // Optional: format the key nicely (e.g., "cashDeposit" → "Cash Deposit")
  const formatName = (key: string) =>
    key
      .replace(/Deposit/gi, "") // remove 'Deposit' (case-insensitive)
      .replace(/([A-Z])/g, " $1") // add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // capitalize first letter
      .trim(); // remove extra spaces

  return (
    <Card className={`border-2 border-cyan-500 shadow-lg bg-[#033e4a]`}>
      <CardHeader className="relative z-10 bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-700 p-3 rounded-t-md">
        <CardTitle className="text-sm sm:text-lg font-semibold text-white tracking-wide">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border border-cyan-400 mt-3 bg-gradient-to-br from-[#e0f7fa] via-[#d9f8fd] to-[#ccf3f7]">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-yellow-200 hover:bg-yellow-200">
                <TableHead className="w-1/2 font-semibold text-black">
                  Type
                </TableHead>
                <TableHead className="text-right font-semibold text-black">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.name}
                  className={`${
                    index % 2 === 0 ? "bg-yellow-100" : "bg-yellow-50"
                  } hover:bg-yellow-300 transition-all duration-300`}
                >
                  <TableCell className=" font-medium">
                    {formatName(row.name)}
                  </TableCell>
                  <TableCell className="text-right  font-medium">
                    {numberToMillionsString(row.value)}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length > 0 && (
                <TableRow className="bg-yellow-200 border-t-2 border-yellow-600 hover:bg-yellow-200">
                  <TableCell className="font-bold text-black">Total</TableCell>
                  <TableCell className="text-right font-bold text-black">
                    {numberToMillionsString(totalAmount)}
                  </TableCell>
                </TableRow>
              )}
              {rows.length === 0 && (
                <TableRow className="bg-yellow-100">
                  <TableCell
                    colSpan={2}
                    className="text-center text-gray-600 py-4"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModeWiseDeposite;
