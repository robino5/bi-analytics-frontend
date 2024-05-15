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
    <Card className={cn("overflow-auto", className)}>
      <CardHeader>
        <CardTitle className="">Exposure Controlling & Management</CardTitle>
        <CardDescription>excluding negative equity clients</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto">Exposure</TableHead>
              <TableHead className="text-right">Investors</TableHead>
              <TableHead className="text-right">Loan Amount</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow
                key={record.exposure}
                className="odd:bg-muted even:bg-gradient"
              >
                <TableCell className="font-medium py-1">
                  {record.exposure}
                </TableCell>
                <TableCell className="py-1 text-right">
                  {numberToMillionsString(record.investors)}
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
