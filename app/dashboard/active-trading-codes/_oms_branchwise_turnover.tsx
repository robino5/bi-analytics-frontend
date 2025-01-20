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
    TableFooter,
} from "@/components/ui/table";
import { numberToMillionsString } from "@/lib/utils";
import { Download } from "lucide-react";
import Link from "next/link";

type BranchData = {
    data: {
        detail: {
            period: string;
            sumOfTotalClient: number;
            sumOfTurnover: number;
        };
        rows: {
            branch_Name: string;
            activeClients: number;
            turnover: number;
        }[];
    };
};

export default function OmsBranchwiseTurnover({ data }: BranchData) {
    return (
        <Card className="col-span-3 overflow-auto bg-[#0e5e6f] max-h-[600px]">
   <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg grid grid-cols-[4fr_1fr] items-center">
  <CardTitle className="text-white text-lg font-semibold py-2">
    Branch Wise Turnover (Internet) As On - {data.detail.period}
  </CardTitle>
  <div className="text-right">
    <Link href="http://192.168.10.7:8080/api/v1/dashboards/admin-oms-branchwise-turnover-csv/" className="inline-flex items-center">
      <Download className="h-5 w-5 text-white" />
    </Link>
  </div>
</CardHeader>

            <CardContent className="mt-2">
                <Table className="min-w-[453px] border border-gray-300 rounded-md overflow-hidden">
                    <TableHeader>
                        <TableRow className="bg-table-header hover:bg-table-header">
                            <TableHead className="text-black font-bold">Branch Name</TableHead>
                            <TableHead className="text-right text-black font-bold">Active Clients</TableHead>
                            <TableHead className="text-right text-black font-bold">Turnover</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.rows.map((data, index) => (
                            <TableRow
                                key={data.branch_Name}
                                className={`${index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                                    } hover:bg-table-even-row-hover transition-all duration-300`}
                            >
                                <TableCell className="font-medium py-1">{data.branch_Name}</TableCell>
                                <TableCell className="text-right py-1">{data.activeClients}</TableCell>
                                <TableCell className="text-right py-1">
                                    {numberToMillionsString(data.turnover)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="bg-table-footer hover:bg-table-footer transition-all duration-300">
                            <TableCell className="font-medium py-2">Total</TableCell>
                            <TableCell className="text-right py-2">
                                {data?.detail?.sumOfTotalClient}
                            </TableCell>
                            <TableCell className="text-right py-2">
                                {numberToMillionsString(data?.detail?.sumOfTurnover)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    );
}