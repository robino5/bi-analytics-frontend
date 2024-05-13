import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RMFundCollectionData {
  name: string;
  daily: number;
  weekly: number;
  forthnightly: number;
  monthly: number;
}

interface Props {
  records: RMFundCollectionData[];
}

export default function RMFundCollectionTable({ records }: Props) {
  return (
    <Card className="col-span-4 overflow-auto">
      <CardHeader>
        <CardTitle className="">Fund Collection Status</CardTitle>
        <CardDescription>
          short summary of RM Fund Collection Status
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
