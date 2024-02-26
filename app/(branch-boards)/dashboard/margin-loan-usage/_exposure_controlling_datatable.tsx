import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PerticularTypes {
  exposure: string;
  investors: number;
  loanAmount: number;
}

interface Props {
  records: PerticularTypes[];
  className?: string;
}

export default function ExposureControllingDataTable({
  records,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "overflow-auto bg-gradient-to-tl from-gray-50 to-slate-100",
        className
      )}
    >
      <CardHeader>
        <CardTitle>
          Exposure Controlling & Management (exclude: Neg Equity Client)
        </CardTitle>
        <CardDescription>
          short summary of the exposure controlling & management with negative
          equity client
        </CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
