import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { IActiveTradingToday } from "@/types/activeTradingCodes";

interface Props {
  records: IActiveTradingToday[];
  className?: string;
}

export default function ClientTradesDataTable({ records, className }: Props) {
  return (
    <Card className={cn("overflow-auto drop-shadow-md", className)}>
      <CardHeader>
        <CardTitle className="">
          Channel Wise Clients & Trades (Today)
        </CardTitle>
        <CardDescription>
          short summary of todays clients and trades
        </CardDescription>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase">
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
                key={record.channel}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {record.channel}
                </th>
                <td className="px-6 py-2">
                  {numberToMillionsString(record.totalClients)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": record.trades < 0,
                  })}
                >
                  {numberToMillionsString(record.trades)}
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
