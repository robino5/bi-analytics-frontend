import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import {
  ExposureControllingDataType,
  MarginLoanAllocationDataType,
  NetTradeRmWiseDataType,
  exposureControllingColumns,
  marginLoanAllocationColumns,
  netTradeRmWiseColumns,
} from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { DataTable as NetTradeTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Margin Loan Usage - LBSL",
  description: "analytics for margin loan usage",
};

async function fetchMarginLoanAllocationData(): Promise<
  MarginLoanAllocationDataType[]
> {
  return [
    {
      name: "1. Total Allocated Fund",
      amount: 21199999,
    },
    {
      name: "2. Loan Used Fund by Margin Client",
      amount: 23499999,
    },
    {
      name: "3. Number of Margin Loan User",
      amount: -23499999,
    },
    {
      name: "4. Loan Used Fund by Cash Client",
      amount: 2937373,
    },
    {
      name: "5. Number of Cash Loan User",
      amount: -3232311,
    },
    {
      name: "6. Remaining/Overused Fund",
      amount: 3232311,
    },
    {
      name: "7. Used Fund by Negative Equity Client",
      amount: 3232311,
    },
  ];
}

async function fetchExposureControllingData(): Promise<
  ExposureControllingDataType[]
> {
  return [
    {
      exposure: "1. Green (100% and above)",
      investors: 755,
      loanAmount: 1188831.0,
    },
    {
      exposure: "2. Yellow (50% to Below 100%)",
      investors: 242,
      loanAmount: 188831.0,
    },
    {
      exposure: "3. Red (Less than 50%)",
      investors: 153,
      loanAmount: 12188831.0,
    },
  ];
}

async function fetchNetTradeRMWise(): Promise<NetTradeRmWiseDataType[]> {
  return [
    {
      branch: "Uttara",
      code: "H5758",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Sultan Mahmud",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
    {
      branch: "Chawkbazar",
      code: "290114",
      openingBalance: 0,
      endingBalance: 0,
      netTrade: 0,
      rmName: "Md. Nooruddin Sikder",
    },
  ];
}

export default async function MarginLoanUsage() {
  const marginLoanAllocationJson = await fetchMarginLoanAllocationData();
  const exposureControllingJson = await fetchExposureControllingData();
  const netTradeRmWiseJson = await fetchNetTradeRMWise();

  return (
    <div className="mx-4">
      <PageHeader name="Margin Loan Usage" />
      <div className="grid grid-cols-1 gap-3 my-2 lg:grid-cols-6">
        <CardBoard
          className="lg:col-span-3"
          title="Margin Loan Allocation & Uses"
          children={
            <DataTable
              data={marginLoanAllocationJson}
              columns={marginLoanAllocationColumns}
            />
          }
        />
        <CardBoard
          className="lg:col-span-3"
          title="Exposure Controlling & Management (exclude: Neg Equity Client)"
          children={
            <DataTable
              data={exposureControllingJson}
              columns={exposureControllingColumns}
            />
          }
        />
        <Card className="col-span-1 lg:col-span-6 w-full mb-2 bg-gradient-to-br from-gray-50 to-slate-100 shadow-xl">
          <CardHeader>
            <CardTitle>RM Wise Net Trade</CardTitle>
            <CardDescription>Net Trade for Regional Managers</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <NetTradeTable
                data={netTradeRmWiseJson}
                columns={netTradeRmWiseColumns}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
