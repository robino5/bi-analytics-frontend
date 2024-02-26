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
import BranchWiseTurnoverDataTable, {
  BranchWiseTurnoverDataType,
} from "./_branchwise_turnover_datatable";

import { branchWiseMarginData } from "./data/branchWiseMarginData";
import { branchWiseExposureData } from "./data/branchWiseExposureData";
import { branchWiseTurnoverData } from "./data/branchWiseTurnoverData";
import { branchwiseFundData } from "./data/branchwiseFundData";
import BranchWiseFundDataTable, {
  BranchWiseFundDataType,
} from "./_branchwise_fund_datatable";

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
        <Card className="col-span-1 max-h-[700px] overflow-y-auto lg:col-span-2 lg:row-span-2 bg-gradient-to-tl from-gray-50 to-slate-100">
          <CardHeader>
            <CardTitle>Branch Wise Turnover Status</CardTitle>
            <CardDescription>
              show data for branch wise turnover
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BranchWiseTurnoverDataTable
              records={branchWiseTurnoverStatusJson}
            />
          </CardContent>
        </Card>
        <Card className="col-span-1 max-h-[340px] overflow-y-auto bg-gradient-to-tl from-gray-50 to-slate-100 lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Branch Wise Margin Status</CardTitle>
            <CardDescription>shows the grid for margin status</CardDescription>
          </CardHeader>
          <CardContent>
            <BranchWiseMarginDataTable records={branchWiseMarginStatusJson} />
          </CardContent>
        </Card>
        <Card className="col-span-1 max-h-[340px] overflow-y-auto shadow-md bg-gradient-to-tl from-gray-50 to-slate-100 lg:col-span-2">
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

        <Card className="col-span-4 max-h-[380px] overflow-auto shadow-md bg-gradient-to-tl from-gray-50 to-slate-100">
          <CardHeader>
            <CardTitle>Branch Wise Fund Status(Till Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <BranchWiseFundDataTable records={branchWiseFundStatusJson} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
