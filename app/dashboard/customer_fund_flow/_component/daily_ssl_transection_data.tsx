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
import { format } from "date-fns";

const DailySSLTransactionDataTable: React.FC<{ data: any[] }> = ({ data }) => {
  console.log("Daily SSL Transaction Data:", data);
  return (
    <Card className={`border-2 border-cyan-500 shadow-lg bg-[#033e4a]`}>
      <CardHeader className="relative z-10 bg-gradient-to-r from-teal-700 via-cyan-600 to-sky-700 p-3 rounded-t-md">
        <CardTitle className="text-lg font-semibold text-white tracking-wide">
          Daily SSL Transaction-(
          {data?.[0]?.transDate &&
            format(new Date(data[0].transDate), "dd-MM-yyyy")})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-md border border-cyan-400 mt-3 bg-gradient-to-br from-[#e0f7fa] via-[#d9f8fd] to-[#ccf3f7]">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-yellow-200 hover:bg-yellow-200">
                <TableHead className="font-semibold text-black">
                  Channel
                </TableHead>
                <TableHead className="text-center font-semibold text-black">
                  Number of Transactions
                </TableHead>
                <TableHead className="text-right font-semibold text-black">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.name}
                  className={`${
                    index % 2 === 0 ? "bg-yellow-100" : "bg-yellow-50"
                  } hover:bg-yellow-300 transition-all duration-300`}
                >
                  <TableCell className=" font-medium">{row.channel}</TableCell>
                  <TableCell className="text-center  font-medium">
                    {row.noOfTransactions}
                  </TableCell>
                  <TableCell className="text-right  font-medium">
                    {numberToMillionsString(row.amount)}
                  </TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow className="bg-yellow-100">
                  <TableCell
                    colSpan={3}
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

export default DailySSLTransactionDataTable;
