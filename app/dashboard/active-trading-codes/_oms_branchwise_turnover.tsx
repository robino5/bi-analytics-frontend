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
            <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
                <CardTitle className="text-white text-md text-lg">OMS Branch Wise Turnover As On - {data.detail.period}</CardTitle>
                {/* <CardDescription className="text-white">
              short summary of the board wise turnover
            </CardDescription> */}
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
                </Table>
            </CardContent>
        </Card>
    );
}