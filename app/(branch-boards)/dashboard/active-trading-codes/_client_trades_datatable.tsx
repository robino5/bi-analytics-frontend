import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RecordType {
  name: string;
  totalClient: number;
  totalTrade: number;
  totalTurnover: number;
}

interface Props {
  records: RecordType[];
  className?: string;
}

export default function ClientTradesDataTable({ records, className }: Props) {
  return (
    <Card
      className={cn(
        "overflow-auto bg-gradient-to-tl from-gray-50 to-slate-100",
        className
      )}
    >
      <CardHeader>
        <CardTitle>Channel Wise Clients & Trades (Today)</CardTitle>
        <CardDescription>
          short summary of todays clients and trades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Channel
              </th>
              <th scope="col" className="px-6 py-3">
                Total Client
              </th>
              <th scope="col" className="px-6 py-3">
                Trades
              </th>
              <th scope="col" className="px-6 py-3">
                Turnover
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
                <td className="px-6 py-2">
                  {numberToMillionsString(record.totalClient)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.totalTrade < 0,
                  })}
                >
                  {numberToMillionsString(record.totalTrade)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.totalTurnover < 0,
                  })}
                >
                  {numberToMillionsString(record.totalTurnover)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
