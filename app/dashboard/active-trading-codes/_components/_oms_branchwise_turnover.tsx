
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
            sumOfTotalClientToday: number,
            sumOfTurnoverToday: number,
            sumOfTotalClientMonth: number,
            sumOfTurnoverMonth: number
        };
        rows: {
            branch_Name: string;
            activeClientsToday: number;
            turnoverToday: number
            activeClientsMonth: number;
            turnoverMonth: number;
        }[];
    };
};

export default function OmsBranchwiseTurnover({ data }: BranchData) {
    return (
        <Table className="min-w-[453px] border border-gray-300 rounded-md overflow-hidden">
            <TableHeader>
                <TableRow className="bg-table-header hover:bg-table-header">
                    <TableHead className="text-black font-bold">Branch Name</TableHead>
                    <TableHead className="text-right text-black font-bold">Active Clients Today</TableHead>
                    <TableHead className="text-right text-black font-bold">Turnover Today</TableHead>
                    <TableHead className="text-center text-black font-bold">Active Clients<br />{data.detail.period}</TableHead>
                    <TableHead className="text-center text-black font-bold">Turnover<br />{data.detail.period}</TableHead>
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
                        <TableCell className="text-right py-1">{data.activeClientsToday}</TableCell>
                        <TableCell className="text-right py-1">
                            {numberToMillionsString(data.turnoverToday)}
                        </TableCell>
                        <TableCell className="text-right py-1">{data.activeClientsMonth}</TableCell>
                        <TableCell className="text-right py-1">
                            {numberToMillionsString(data.turnoverMonth)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow className="bg-table-footer hover:bg-table-footer transition-all duration-300">
                    <TableCell className="font-medium py-2">Total</TableCell>
                    <TableCell className="text-right py-2">
                        {data?.detail?.sumOfTotalClientToday}
                    </TableCell>
                    <TableCell className="text-right py-2">
                        {numberToMillionsString(data?.detail?.sumOfTurnoverToday)}
                    </TableCell>
                    <TableCell className="text-right py-2">
                        {data?.detail?.sumOfTotalClientMonth}
                    </TableCell>
                    <TableCell className="text-right py-2">
                        {numberToMillionsString(data?.detail?.sumOfTurnoverMonth)}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}