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
import { MarkedTradersZoneWise } from "./_marked_traders_modal";
import { MarkedTraderPayloadType } from "./_marked_traders_datatable";
import { IExposureSumamry } from "@/types/marginLoanUsage";

interface Props {
  records: IExposureSumamry[];
  branch?: string;
  className?: string;
}

const keywordMatcher = (text: string) => {
  if (text.includes("Green")) {
    return "green";
  }

  if (text.includes("Red")) {
    return "red";
  }

  if (text.includes("Yellow")) {
    return "yellow";
  }
};

export default function ExposureControllingDataTable({
  records,
  className,
  branch,
}: Props) {
  return (
    <Card className={cn("overflow-auto", className, "bg-[#033e4a]")}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">
          Exposure Controlling & Management
        </CardTitle>
        {/* <CardDescription className="text-white">
          excluding negative equity clients
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-3">
        <Table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700">
              <TableHead className="w-auto text-white font-bold">
                Exposure
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Investors
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Loan Amount
              </TableHead>
              <TableHead className="text-right text-white font-bold"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.exposure}
                className={cn(
                  keywordMatcher(record.exposure) === "green" && "bg-green-400 hover:bg-green-300",
                  keywordMatcher(record.exposure) === "yellow" &&
                    "bg-yellow-400 hover:bg-yellow-300",
                  keywordMatcher(record.exposure) === "red" && "bg-red-400 hover:bg-red-300"
                )}
              >
                <TableCell className="font-medium py-1">
                  {record.exposure}
                </TableCell>
                <TableCell className="py-1 text-right">
                  {record.investors}
                </TableCell>
                <TableCell className="py-1 text-right">
                  {numberToMillionsString(record.loanAmount)}
                </TableCell>
                <TableCell className="py-1 text-right">
                  <MarkedTradersZoneWise
                    name={
                      keywordMatcher(
                        record.exposure
                      ) as keyof MarkedTraderPayloadType
                    }
                    branch={branch}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
