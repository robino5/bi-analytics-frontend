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

interface TodayTransactionDataProps {
  title: string;
  data: any[];
}

const TodayTransactionData: React.FC<TodayTransactionDataProps> = ({
  title,
  data,
}) => {
  return (
    <Card className={`border-2 border-cyan-500 shadow-lg bg-[#033e4a] max-h-[471px] overflow-y-auto`}>
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
                  SL.
                </TableHead>
                <TableHead className="w-1/2 font-semibold text-black">
                  Branch
                </TableHead>
                <TableHead className="text-right font-semibold text-black">
                  Deposit
                </TableHead>
                <TableHead className="text-right font-semibold text-black">
                  Withdrawal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-yellow-100" : "bg-yellow-50"
                  } hover:bg-yellow-300 transition-all duration-300`}
                >
                  <TableCell className=" font-medium">{index + 1}</TableCell>
                  <TableCell className=" font-medium">
                    {row.branchName}
                  </TableCell>
                  <TableCell className="text-right  font-medium">
                    {numberToMillionsString(row.totalDeposit)}
                  </TableCell>
                  <TableCell className="text-right  font-medium">
                    {numberToMillionsString(row.totalWithdrawal)}
                  </TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
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

export default TodayTransactionData;
