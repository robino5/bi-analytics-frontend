import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { IMarginLoanAllocation } from "@/types/marginLoanUsage";

interface Props {
  records: IMarginLoanAllocation[];
  className?: string;
}

export default function MarginLoanAllocationDataTable({
  records,
  className,
}: Props) {
  return (
    <Card className={cn("overflow-auto", className)}>
      <CardHeader>
        <CardTitle className="">Margin Loan Allocation & Usage</CardTitle>
        <CardDescription>
          short summary of the margin loan allocation & usage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Particular
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.perticular}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {record.perticular}
                </th>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.amount < 0,
                  })}
                >
                  {numberToMillionsString(record.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
