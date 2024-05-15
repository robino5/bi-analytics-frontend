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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Particular</TableHead>
              <TableHead className="text-right">Daily</TableHead>
              <TableHead className="text-right">Weekly</TableHead>
              <TableHead className="text-right">Forthnightly</TableHead>
              <TableHead className="text-right">Monthly</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow
                key={account.name}
                className="odd:bg-muted even:bg-gradient"
              >
                <TableCell className="font-medium py-1">
                  {account.name}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(account.daily)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(account.weekly)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(account.forthnightly)}
                </TableCell>
                <TableCell className="text-right py-1">
                  {numberToMillionsString(account.monthly)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
