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
  name: string;
  daily: number;
  weekly: number;
  forthnightly: number;
  monthly: number;
}

interface Props {
  records: PerticularTypes[];
}

export default function TurnoverPerformanceDataTable({ records }: Props) {
  return (
    <Card className="col-span-2 row-start-2 overflow-auto bg-gradient-to-tl from-gray-50 to-slate-200">
      <CardHeader>
        <CardTitle>Turnover Performance</CardTitle>
        <CardDescription>short summary of the portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Particular
              </th>
              <th scope="col" className="px-6 py-3">
                Daily
              </th>
              <th scope="col" className="px-6 py-3">
                Weekly
              </th>
              <th scope="col" className="px-6 py-3">
                Forthnightly
              </th>
              <th scope="col" className="px-6 py-3">
                Monthly
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.name}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {record.name}
                </th>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.daily < 0,
                  })}
                >
                  {numberToMillionsString(record.daily)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.weekly < 0,
                  })}
                >
                  {numberToMillionsString(record.weekly)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.forthnightly < 0,
                  })}
                >
                  {numberToMillionsString(record.forthnightly)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.monthly < 0,
                  })}
                >
                  {numberToMillionsString(record.monthly)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
