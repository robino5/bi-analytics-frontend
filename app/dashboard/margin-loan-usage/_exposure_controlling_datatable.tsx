import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

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
        <table className="w-full text-sm text-left ">
          <thead className="text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Exposure
              </th>
              <th scope="col" className="px-6 py-3">
                Investors
              </th>
              <th scope="col" className="px-6 py-3">
                Loan Amount
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.exposure}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {record.exposure}
                </th>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.investors < 0,
                  })}
                >
                  {numberToMillionsString(record.investors)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.loanAmount < 0,
                  })}
                >
                  {numberToMillionsString(record.loanAmount)}
                </td>
                <td className="px-6 py-2">
                  <div className="cursor-pointer flex justify-center items-center h-[28px] w-[28px] rounded-full">
                    <MarkedTradersZoneWise
                      name={
                        keywordMatcher(
                          record.exposure
                        ) as keyof MarkedTraderPayloadType
                      }
                      branch={branch}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
