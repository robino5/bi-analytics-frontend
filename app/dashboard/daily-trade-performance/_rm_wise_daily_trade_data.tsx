import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RmWiseDailyTradeData } from "@/types/dailyTurnoverPerformance";
import { numberToMillionsString } from "@/lib/utils";

type TurnoverTableProps = {
    data: RmWiseDailyTradeData[];
};

export default function RmWiseDailyTradingData({ data }: TurnoverTableProps) {
    // Calculate total sum
    const totalClients = data.reduce((sum, row) => sum + row.totalClientToday, 0);
    const totalTurnover = data.reduce((sum, row) => sum + row.totalTurnoverToday, 0);

    return (
        <div className="w-full border border-gray-300 rounded-md overflow-hidden">
            <div className="max-h-[420px] w-full overflow-y-auto">
                <Table className="w-full">
                    <TableHeader className="sticky top-0 bg-table-header z-10">
                        <TableRow>
                            <TableHead className="text-black font-bold text-left">Branch</TableHead>
                            <TableHead className="text-black font-bold text-left">RM</TableHead>
                            <TableHead className="text-black font-bold text-right">Total Client</TableHead>
                            <TableHead className="text-black font-bold text-right">Total Turnover</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={index}
                                className={`${
                                    index % 2 === 0 ? "bg-table-odd-row" : "bg-table-even-row"
                                } hover:bg-table-even-row-hover transition-all duration-300`}>
                                <TableCell className="text-left py-1">{row.branch}</TableCell>
                                <TableCell className="text-left py-1">{row.rmName}</TableCell>
                                <TableCell className="text-right py-1">{row.totalClientToday}</TableCell>
                                <TableCell className="text-right py-1">{numberToMillionsString(row.totalTurnoverToday)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/* Table Footer for Totals */}
                    <TableFooter>
                        <TableRow className="bg-table-footer hover:bg-table-footer transition-all duration-300">
                            <TableCell className="text-left py-2" colSpan={2}>
                                Total
                            </TableCell>
                            <TableCell className="text-right py-2">{totalClients}</TableCell>
                            <TableCell className="text-right py-2">{numberToMillionsString(totalTurnover)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}
