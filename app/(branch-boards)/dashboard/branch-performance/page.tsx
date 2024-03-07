import PageHeader from "@/components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BranchWiseMarginDataTable, {
  MarginTableDataType,
} from "./_branchwise_margin_datatable";
import BranchWiseExposureDataTable, {
  BranchWiseExposureTableDataType,
} from "./_branchwise_exposure_datatable";
import { BranchWiseTurnoverDataType } from "./_branchwise_turnover_datatable";

import { branchWiseMarginData } from "./data/branchWiseMarginData";
import { branchWiseExposureData } from "./data/branchWiseExposureData";
import { branchWiseTurnoverData } from "./data/branchWiseTurnoverData";
import { branchwiseFundData } from "./data/branchwiseFundData";
import { BranchWiseFundDataType } from "./_branchwise_fund_datatable";
import { DataTableCard } from "./data-table";
import { branchWiseFundColumns, branchWiseTurnoverColumns } from "./columns";

async function fetchBranchWiseMarginStatus(): Promise<MarginTableDataType[]> {
  return branchWiseMarginData;
}

async function fetchBranchWiseExposureStatus(): Promise<
  BranchWiseExposureTableDataType[]
> {
  return branchWiseExposureData;
}
async function fetchBranchWiseTurnoverStatus(): Promise<
  BranchWiseTurnoverDataType[]
> {
  return branchWiseTurnoverData;
}

async function fetchBranchWiseFundStatus(): Promise<BranchWiseFundDataType[]> {
  return branchwiseFundData;
}

export default async function BranchPerformance() {
  const branchWiseTurnoverStatusJson = await fetchBranchWiseTurnoverStatus();
  const branchWiseMarginStatusJson = await fetchBranchWiseMarginStatus();
  const branchWiseExposureStatusJson = await fetchBranchWiseExposureStatus();
  const branchWiseFundStatusJson = await fetchBranchWiseFundStatus();

  return (
    <div className="mx-4">
      <PageHeader name="Branch Performance" />
      <div className="grid grid-cols-1 gap-4 mt-2 lg:grid-cols-4">
        {/* Branch Wise Turnover Status */}
        <DataTableCard
          title="Branch Wise Turnover Status"
          subtitle="show data for branch wise turnover"
          className="col-span1 max-h[700px] overflow-y-auto lg:col-span-2 lg:row-span-2"
          columns={branchWiseTurnoverColumns}
          data={branchWiseTurnoverStatusJson}
        />

        {/* Branch Wise Margin Status */}
        <Card className="col-span-1 max-h-[340px] overflow-y-auto bg-gradient-to-tr from-gray-50 to-slate-200 lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Branch Wise Margin Status</CardTitle>
            <CardDescription>shows the grid for margin status</CardDescription>
          </CardHeader>
          <CardContent>
            <BranchWiseMarginDataTable records={branchWiseMarginStatusJson} />
          </CardContent>
        </Card>

        {/* Branch Wise Exposure Status */}
        <Card className="col-span-1 max-h-[340px] overflow-y-auto shadow-md bg-gradient-to-tr from-gray-50 to-slate-200 lg:col-span-2">
          <CardHeader>
            <CardTitle>Branch Wise Exposure Status</CardTitle>
            <CardDescription>
              shows the grid for exposure status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BranchWiseExposureDataTable
              records={branchWiseExposureStatusJson}
            />
          </CardContent>
        </Card>

        {/* Branch Wise Fund Status */}
        <DataTableCard
          className="col-span-4 mb-2"
          title="Branch Wise Fund Status(Till Today)"
          subtitle="summary of fund status branch wise"
          columns={branchWiseFundColumns}
          data={branchWiseFundStatusJson}
        />
      </div>
    </div>
  );
}
