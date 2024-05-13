import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { numberToMillionsString } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface NewAccountProps {
  name: string;
  daily: number;
  weekly: number;
  forthnightly: number;
  monthly: number;
}

interface Props {
  accounts: NewAccountProps[];
}

export default function NewAccountOpeningDataTable({ accounts }: Props) {
  return (
    <Card className="col-span-3 overflow-auto">
      <CardHeader>
        <CardTitle className="">
          New Account Opening & Fund Collection
        </CardTitle>
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
            {accounts.map((account) => (
              <tr
                key={account.name}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {account.name}
                </th>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": account.daily < 0,
                  })}
                >
                  {numberToMillionsString(account.daily)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": account.weekly < 0,
                  })}
                >
                  {numberToMillionsString(account.weekly)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": account.forthnightly < 0,
                  })}
                >
                  {numberToMillionsString(account.forthnightly)}
                </td>
                <td
                  className={cn("px-6 py-2", {
                    "text-red-500": account.monthly < 0,
                  })}
                >
                  {numberToMillionsString(account.monthly)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
