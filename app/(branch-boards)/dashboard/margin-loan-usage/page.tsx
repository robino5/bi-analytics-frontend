import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import {
  ExposureControllingDataType,
  MarginLoanAllocationDataType,
  exposureControllingColumns,
  marginLoanAllocationColumns,
} from "./columns";
import { DataTable } from "@/components/ui/data-table";

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

export default async function MarginLoanUsage() {
  const marginLoanAllocationJson = await fetchMarginLoanAllocationData();
  const exposureControllingJson = await fetchExposureControllingData();

  return (
    <div className="mx-4">
      <PageHeader name="Margin Loan Usage" />
      <div className="grid grid-cols-6 gap-2 mt-2 lg:grid-cols-3">
        <CardBoard
          className="col-span-4"
          title="Margin Loan Allocation & Uses"
          children={
            <DataTable
              data={marginLoanAllocationJson}
              columns={marginLoanAllocationColumns}
            />
          }
        />
        <CardBoard
          className="col-span-2"
          title="Exposure Controlling & Management (exclude: Neg Equity Client)"
          children={
            <DataTable
              data={exposureControllingJson}
              columns={exposureControllingColumns}
            />
          }
        />
        <CardBoard
          className="col-span-6 w-full"
          title="RM Wise Net Trade"
          children={<></>}
        />
      </div>
    </div>
  );
}
