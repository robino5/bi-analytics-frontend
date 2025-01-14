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
} from "@/components/ui/table";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface NewAccountProps {
  name: string;
  daily: number;
  weekly: number;
  forthnightly: number;
  monthly: number;
}

interface Props {
  accounts: NewAccountProps[];
}

export default function NewAccountOpeningDataTable({ accounts }: Props) {
  return (
    <Card className="col-span-3 overflow-auto bg-[#0e5e6f]">
      <CardHeader  className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          New Account Opening & Fund Collection
        </CardTitle>
        {/* <CardDescription className="text-white">
          short summary of the portfolio
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-3">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-500 hover:bg-blue-700">
              <TableHead className="w-[200px] text-white font-bold">
                Particular
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Daily
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Weekly
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Forthnightly
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Monthly
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account, index) => (
              <TableRow
                key={account.name}
                className={index % 2 === 0 ? "bg-opacity-90" : "bg-opacity-70"}
              >
                <TableCell
                  className={`font-medium py-1 ${
                    index % 2 === 0 ? "bg-purple-200" : "bg-purple-100"
                  }`}
                >
                  {account.name}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                  }`}
                >
                  {numberToMillionsString(account.daily)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-green-200" : "bg-green-100"
                  }`}
                >
                  {numberToMillionsString(account.weekly)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-orange-200" : "bg-orange-100"
                  }`}
                >
                  {numberToMillionsString(account.forthnightly)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${
                    index % 2 === 0 ? "bg-yellow-200" : "bg-yellow-100"
                  }`}
                >
                  {numberToMillionsString(account.monthly)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
