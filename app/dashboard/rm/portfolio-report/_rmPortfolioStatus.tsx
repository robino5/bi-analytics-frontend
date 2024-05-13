import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { IPortfolioManagement } from "@/types/rmPortfolio";

interface Props {
  records: IPortfolioManagement[];
}

export default function PortfolioManagementStatusDataTable({ records }: Props) {
  return (
    <Card className="col-span-2 overflow-y-auto max-h-[385px]">
      <CardHeader>
        <CardTitle className="">Portfolio Management Status</CardTitle>
        <CardDescription>short summary of the portfolio</CardDescription>
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
                key={record.particular}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {record.particular}
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
