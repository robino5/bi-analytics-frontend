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

interface TurnoverPerformanceData {
  name: string;
  daily: number;
  weekly: number;
  forthnightly: number;
  monthly: number;
  quarterly: number;
}

interface Props {
  records: TurnoverPerformanceData[];
}

export default function RMTurnoverPerformance({ records }: Props) {

  const vallueformat = (value: any, lebel: string) => {
    if (lebel == "3.Achieved Turnover (times of target)") {
      return value;
    } else if (lebel == "4.Times of CTC (Cost to the Company)") {
      return value.toFixed(1)
    }
    else {
      return numberToMillionsString(value,1)
    }
  }
  return (
    <Card className="col-span-3 overflow-auto rounded-md shadow-md bg-[#033e4a]">
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg">Turnover Performance</CardTitle>
        {/* <CardDescription className="text-white">
          short summary of RM Turnover Performance
        </CardDescription> */}
      </CardHeader>
      <CardContent className="mt-3">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-500 hover:bg-blue-700">
              <TableHead className="w-[300px] text-white font-bold">
                Particular
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Daily
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Weekly
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Forthnightly
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Monthly
              </TableHead>
              <TableHead className="text-right text-white font-bold">
                Quarterly
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record, index) => (
              <TableRow
                key={record.name}
                className={index % 2 === 0 ? "bg-opacity-90" : "bg-opacity-70"}
              >
                <TableCell
                  className={`font-medium py-1 ${index % 2 === 0 ? "bg-purple-200" : "bg-purple-100"
                    }`}
                >
                  {record.name}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${index % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                    }`}
                >
                  {vallueformat(record.daily, record.name)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${index % 2 === 0 ? "bg-green-200" : "bg-green-100"
                    }`}
                >
                  {vallueformat(record.weekly, record.name)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${index % 2 === 0 ? "bg-orange-200" : "bg-orange-100"
                    }`}
                >
                  {vallueformat(record.forthnightly, record.name)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${index % 2 === 0 ? "bg-yellow-200" : "bg-yellow-100"
                    }`}
                >
                  {vallueformat(record.monthly, record.name)}
                </TableCell>
                <TableCell
                  className={`text-right py-1 ${index % 2 === 0 ? "bg-lime-200" : "bg-lime-100"
                    }`}
                >
                  {vallueformat(record.quarterly, record.name)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
